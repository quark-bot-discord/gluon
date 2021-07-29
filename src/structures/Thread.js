const ChannelMessageManager = require("../managers/ChannelMessageManager");
const Channel = require("./Channel");

/**
 * Represents a thread within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
 */
class Thread extends Channel {

    /**
     * Creates the structure for a thread.
     * @constructor
     * @param {Client} client The client instance.
     * @param {Object} data Raw channel data.
     * @param {String} guild_id The ID of the guild that this thread belongs to.
     * @param {Boolean?} nocache Whether this thread should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
     */
    constructor(client, data, guild_id, nocache = false) {

        super(client, data, guild_id);

        const existing = client.guilds.cache.get(guild_id)?.channels.cache.get(data.id) || null;

        /**
         * The message manager for this channel.
         * @type {ChannelMessageManager}
         */
        this.messages = existing ? existing.messages : new ChannelMessageManager(client, this);

        /**
         * The ID of the user who created this thread.
         * @type {BigInt}
         */
        this.owner_id = BigInt(data.owner_id);

        /**
         * The text channel that this thread belongs to.
         * @type {TextChannel?}
         */
        this.parent = this.guild?.channels.cache.get(data.parent_id) || null;

        if (!this.parent)
            /**
             * The ID of the text channel that this thread belongs to.
             * @type {BigInt?}
             */
            this.parent_id = BigInt(data.parent_id);

        /* probably shouldnt cache archived threads */
        if (nocache == false && data.archived != true)
            this.guild?.channels.cache.set(data.id, this);

    }

}

module.exports = Thread;