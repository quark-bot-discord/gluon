/* i think one process should be able to handle multiple shards (ideally max_concurrency's worth) */
const { BASE_URL, VERSION, NAME, CHANNEL_TYPES } = require('./constants');

const EventsEmitter = require("events");

const Request = require("./rest/requestHandler");
const WS = require("./gateway/index");

const UserManager = require("./managers/UserManager");
const GuildManager = require('./managers/GuildManager');
const Message = require('./structures/Message');

const Redis = require("ioredis");
/* const { MongoClient } = require('mongodb'); */

class Client extends EventsEmitter {

    /*async*/ constructor({ cacheMessages = false, cacheUsers = false, cacheMembers = false, cacheChannels = false, cacheGuilds = false, cacheVoiceStates = false, cacheRoles = false } = {}/*, { dbURI, dbName, collectionName } = {}*/) {

        super();

        this.baseURL = BASE_URL;
        this.version = VERSION;
        this.name = NAME;

        this.user = null;

        this.users = new UserManager(this);
        this.guilds = new GuildManager(this);

        this.cacheMessages = cacheMessages;
        this.cacheUsers = cacheUsers;
        this.cacheMembers = cacheMembers;
        this.cacheChannels = cacheChannels;
        this.cacheGuilds = cacheGuilds;
        this.cacheVoiceStates = cacheVoiceStates;
        this.cacheRoles = cacheRoles;

        this.redis = new Redis();

        /*
        const dbClient = new MongoClient(dbURI);
        await dbClient.connect();
        const database = dbClient.db(dbName);
        this.db = database.collection(collectionName);
        */

    }

    error(error) {

        this.emit("error", `\`\`\`js\n${error.substring(0, 2000)}\`\`\``);

    }

    async postWebhook({ id, token }, content, { embeds, components, files } = {}) {

        const body = {};

        if (content)
            body.content = content;

        if (embeds)
            body.embeds = embeds.map(embed => embed.toJSON());
        if (components)
            body.components = components.toJSON();
        if (files)
            body.files = files;

        try {

            await this.request.makeRequest("postExecuteWebhook", [id, token], body);

        } catch (error) {

            throw error;

        }

    }

    async sendMessage(channel_id, guild_id, content, { embed, components, files } = {}) {

        const body = {};

        if (content)
            body.content = content;

        if (embed)
            body.embed = embed.toJSON();
        if (components)
            body.components = components.toJSON();
        if (files)
            body.files = files;

        try {

            const data = await this.request.makeRequest("postCreateMessage", [channel_id], body);
            return new Message(this, data, channel_id.toString(), guild_id.toString(), false);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    async editMessage(channel_id, guild_id, message_id, content, { embed, components } = {}) {

        const body = {};

        if (content)
            body.content = content;
        if (embed)
            body.embed = embed.toJSON();
        if (components)
            body.components = components.toJSON();

        if (this.referenced_message)
            body.message_reference = {
                message_id: message_id,
                channel_id: channel_id,
                guild_id: guild_id
            };

        try {

            const data = await this.request.makeRequest("patchEditMessage", [channel_id, message_id], body);
            return new Message(this, data, channel_id, guild_id);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    async followStatusChannel(channel_id) {

        const body = {};

        body.webhook_channel_id = channel_id;

        try {

            await this.request.makeRequest("postFollowNewsChannel", ["822906135048487023"], body);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }
    }

    setStatus(status) {

        for (let i = 0; i < this.shards.length; i++)
            this.shards[i].updatePresence(status.name, status.type, status.status, status.afk, status.since);

    }

    /**
     * Initiates the login sequence
     * @param {string} token The authorization token
     */
    login(token) {
        /* sets the token and starts logging the bot in to the gateway, shard by shard */
        this.token = token;

        this.request = new Request(this.baseURL, this.name, this.version, this.token);

        this.request.makeRequest("getGatewayBot")
            .then(gatewayInfo => {

                this.shards = [];

                let remainingSessionStarts = gatewayInfo.session_start_limit.remaining;

                for (let i = 0; i < gatewayInfo.shards && remainingSessionStarts != 0; i++, remainingSessionStarts--) {

                    setTimeout(() => {

                        for (let n = 0; n < gatewayInfo.session_start_limit.max_concurrency; n++) {

                            this.shards.push(new WS(this, `${gatewayInfo.url}?v=${VERSION}&encoding=etf&compress=zlib-stream`, [i, gatewayInfo.shards]));

                        }

                    }, 5000 * i);

                }

                if (this.cacheMessages == true || this.cacheMembers == true || this.cacheUsers == true) {

                    setInterval(() => {

                        if (this.cacheMessages == true || this.cacheMembers == true) {

                            const currentTime = Math.floor(new Date().getTime() / 1000);

                            this.guilds.cache.forEach(guild => {

                                if (this.cacheMessages == true) {

                                    this.emit("debug", `Sweeping messages for GUILD ${guild.id}...`);

                                    const cacheCount = guild.calculateMessageCacheCount();

                                    this.emit("debug", `Calculated limit of ${cacheCount} per channel for GUILD ${guild.id}...`);

                                    guild.channels.cache.forEach(channel => {

                                        if (channel.type == CHANNEL_TYPES.GUILD_TEXT || channel.type == CHANNEL_TYPES.GUILD_NEWS || channel.type == CHANNEL_TYPES.GUILD_NEWS_THREAD || channel.type == CHANNEL_TYPES.GUILD_PUBLIC_THREAD || channel.type == CHANNEL_TYPES.GUILD_PRIVATE_THREAD) {

                                            this.emit("debug", `Sweeping messages for CHANNEL ${channel.id}...`);

                                            const nowCached = channel.messages.sweepMessages(cacheCount, currentTime);

                                            this.emit("debug", `New cache size of ${nowCached || 0} for CHANNEL ${guild.id}...`);

                                        }

                                    });

                                }

                                if (this.cacheMembers == true) {

                                    this.emit("debug", `Sweeping members for GUILD ${guild.id}...`);

                                    const cacheCount = guild.calculateMemberCacheCount();

                                    this.emit("debug", `Calculated limit of ${cacheCount} for GUILD ${guild.id}...`);

                                    this.emit("debug", `Sweeping members for GUILD ${channel.id}...`);

                                    const nowCached = guild.members.sweepMembers(cacheCount);

                                    this.emit("debug", `New cache size of ${nowCached || 0} for GUILD ${guild.id}...`);

                                }

                            });

                        }

                        if (this.cacheUsers == true) {

                            this.emit("debug", `Sweeping users...`);

                            const nowCached = this.users.sweepUsers();

                            this.emit("debug", `New user cache size is ${nowCached || 0}...`);

                        }

                    }, 1000 * 60 * 60 * 3); // every 3 hours 1000 * 60 * 60 * 3

                }

            })
            .catch(error => {

                this.error(error.stack.toString());

            });

    }

}

module.exports = Client;