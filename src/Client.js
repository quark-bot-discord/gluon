/* i think one process should be able to handle multiple shards (ideally max_concurrency's worth) */
const { BASE_URL, VERSION, NAME, CHANNEL_TYPES } = require('./constants');

const EventsEmitter = require("events");

const Request = require("./rest/requestHandler");
const WS = require("./gateway/index");

const UserManager = require("./managers/UserManager");
const GuildManager = require('./managers/GuildManager');


class Client extends EventsEmitter {

    constructor({ cacheMessages = false, cacheUsers = false, cacheMembers = false, cacheChannels = false, cacheGuilds = false, cacheVoiceStates = false }) {

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

                if (this.cacheMessages == true) {

                    setInterval(() => {

                        const currentTime = Math.floor(new Date().getTime() / 1000);

                        this.guilds.cache.forEach(guild => {

                            this.emit("debug", `Sweeping messages for GUILD ${guild.id}...`);

                            const cacheCount = guild.calculateCacheCount();

                            this.emit("debug", `Calculated limit of ${cacheCount} per channel for GUILD ${guild.id}...`);

                            guild.channels.cache.forEach(channel => {

                                if (channel.type == CHANNEL_TYPES.GUILD_TEXT || channel.type == CHANNEL_TYPES.GUILD_NEWS || channel.type == CHANNEL_TYPES.GUILD_NEWS_THREAD || channel.type == CHANNEL_TYPES.GUILD_PUBLIC_THREAD || channel.type == CHANNEL_TYPES.GUILD_PRIVATE_THREAD) {

                                    this.emit("debug", `Sweeping messages for CHANNEL ${channel.id}...`);

                                    const nowCached = channel.messages.sweepMessages(cacheCount, currentTime);

                                    this.emit("debug", `New cache size of ${nowCached || 0} for CHANNEL ${guild.id}...`);

                                }

                            });

                        });

                    }, 1000 * 60 * 60 * 3); // every 3 hours 1000 * 60 * 60 * 3

                }

            })
            .catch(error => {
                
                this.error(error.stack.toString());

            });

    }

}

module.exports = Client;