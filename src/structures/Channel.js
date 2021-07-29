/**
 * Represents a channel within Discord.
 * @see {@link https://discord.com/developers/docs/resources/channel}
 */
class Channel {
    
    /**
     * Creates the base structure for a channel.
     * @constructor
     * @param {Client} client The client instance.
     * @param {Object} data Raw channel data.
     * @param {String} guild_id The ID of the guild that this channel belongs to.
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure}
     */
    constructor(client, data, guild_id) {

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The id of the channel.
         * @type {BigInt}
         */
        this.id = BigInt(data.id);

        /**
         * The name of the channel.
         * @type {String}
         */
        this.name = data.name;

        /**
         * The guild that this channel belongs to.
         * @type {Guild?}
         */
        this.guild = this.client.guilds.cache.get(guild_id) || null;

        if (!this.guild)
            /**
             * The ID of the guild that this channel belongs to.
             * @type {BigInt?}
             */
            this.guild_id = BigInt(guild_id);

        /**
         * The type of channel.
         * @type {Number}
         */
        this.type = data.type;

    }

}

module.exports = Channel;