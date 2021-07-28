/* i think one process should be able to handle multiple shards (ideally max_concurrency's worth) */
const { BASE_URL, VERSION, NAME, CHANNEL_TYPES } = require("./constants");

const EventsEmitter = require("events");

const Request = require("./rest/requestHandler");
const WS = require("./gateway/index");

const UserManager = require("./managers/UserManager");
const GuildManager = require("./managers/GuildManager");
const Message = require("./structures/Message");

const Redis = require("ioredis");

/**
 * A client user, which is able to handle multiple shards.
 */
class Client extends EventsEmitter {

    /**
     * Creates the client and sets the default options.
     * @constructor
     * @param {object?} options The options to pass to the client. 
     */
    constructor({ cacheMessages = false, cacheUsers = false, cacheMembers = false, cacheChannels = false, cacheGuilds = false, cacheVoiceStates = false, cacheRoles = false } = {}) {

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

    }

    /**
     * Emits an "error" even with the error provided.
     * @param {string} error The error to emit, as a string.
     */
    error(error) {

        this.emit("error", `\`\`\`js\n${error.substring(0, 4000)}\`\`\``);

    }

    /**
     * Posts a webhook with the provided webhook id and token.
     * @param {object} referenceData An object with the webhook id and token.
     * @param {string?} content The message to send with the webhook.
     * @param {object?} options Embeds, components and files to attach to the webhook.
     */
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

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Posts a message to the specified channel.
     * @param {bigint} channel_id The id of the channel to send the message to.
     * @param {bigint} guild_id The id of the guild which the channel belongs to.
     * @param {string?} content The message content.
     * @param {object?} options Embeds, components and files to attach to the message.
     * @returns {Promise<Message>}
     */
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

    /**
     * Edits a specified message.
     * @param {bigint} channel_id The id of the channel that the message belongs to.
     * @param {bigint} guild_id The id of the guild that the channel belongs to.
     * @param {bigint} message_id The id of the message to edit.
     * @param {string?} content The message content.
     * @param {object?} options Embeds, components and files to attach to the message.
     * @returns {Promise<Message>}
     */
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
                message_id: message_id.toString(),
                channel_id: channel_id.toString(),
                guild_id: guild_id.toString()
            };

        try {

            const data = await this.request.makeRequest("patchEditMessage", [channel_id, message_id], body);
            return new Message(this, data, channel_id, guild_id);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Adds a specified channel as a follower to Quark's status channel.
     * @param {bigint} channel_id The id of the channel to add as a follower.
     */
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

    /**
     * Fetches the webhooks for a specified channel.
     * @param {bigint} channel_id The id of the channel to fetch the webhooks from.
     * @returns {object[]}
     */
    async fetchChannelWebhooks(channel_id) {

        try {

            const data = await this.request.makeRequest("getChannelWebhooks", [channel_id]);
            return data;

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Deletes a webhook.
     * @param {bigint} webhook_id The id of the webhook to delete.
     */
    async deleteWebhook(webhook_id) {

        try {

            await this.request.makeRequest("deleteWebhook", [webhook_id]);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Bulk deletes channel messages.
     * @param {bigint} channel_id The id of the channel to purge messages in.
     * @param {string[]} messages An array of message ids to delete.
     */
    async purgeChannelMessages(channel_id, messages) {

        const body = {};

        body.messages = messages;

        try {

            await this.request.makeRequest("postBulkDeleteMessages", [channel_id], body);

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Fetches messages from a specified channel.
     * @param {bigint} guild_id The id of the guild that the channel belongs to.
     * @param {bigint} channel_id The id of the channel to fetch messages from.
     * @param {object} options The filter options to determine which messages should be returned.
     * @returns {Message[]}
     */
    async fetchChannelMessages(guild_id, channel_id, { around, before, after, limit }) {

        const body = {};

        if (around)
            body.around = around;

        if (before)
            body.before = before;

        if (after)
            body.after = after;

        if (limit)
            body.limit = limit;

        try {

            const data = await this.request.makeRequest("getChannelMessages", [channel_id], body);
            let messages = [];
            for (let i = 0; i < data.length; i++)
                messages.push(new Message(this, data[i], data[i].channel_id, guild_id));
            return messages;

        } catch (error) {

            this.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    /**
     * Sets the bot's status across all shards.
     * @param {object} status Status options.
     */
    setStatus({ name, type, status, afk, since } = {}) {

        for (let i = 0; i < this.shards.length; i++)
            this.shards[i].updatePresence(name, type, status, afk, since);

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

                for (let i = 0; i < gatewayInfo.shards && remainingSessionStarts != 0; i++, remainingSessionStarts--)
                    setTimeout(() => {

                        for (let n = 0; n < gatewayInfo.session_start_limit.max_concurrency; n++)
                            this.shards.push(new WS(this, `${gatewayInfo.url}?v=${VERSION}&encoding=etf&compress=zlib-stream`, [i, gatewayInfo.shards]));

                    }, 5000 * i);

                if (this.cacheMessages == true || this.cacheMembers == true || this.cacheUsers == true)
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

                                    this.emit("debug", `Sweeping members for GUILD ${guild.id}...`);

                                    const nowCached = guild.members.sweepMembers(cacheCount);

                                    this.emit("debug", `New cache size of ${nowCached || 0} for GUILD ${guild.id}...`);

                                }

                            });

                        }

                        if (this.cacheUsers == true) {

                            this.emit("debug", "Sweeping users...");

                            const nowCached = this.users.sweepUsers();

                            this.emit("debug", `New user cache size is ${nowCached || 0}...`);

                        }

                    }, 1000 * 60 * 60 * 3); // every 3 hours 1000 * 60 * 60 * 3

            })
            .catch(error => {

                this.error(error.stack.toString());

            });

    }

}

module.exports = Client;