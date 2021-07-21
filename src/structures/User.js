const { CDN_BASE_URL } = require("../constants");
const getTimestamp = require("../util/getTimestampFromSnowflake");

/**
 * Represents a Discord user.
 * @see {@link https://discord.com/developers/docs/resources/user}
 */
class User {

    /**
     * Creates a structure for a user.
     * @constructor
     * @param {Client} client The client instance.
     * @param {Object} data The raw user data.
     * @param {Boolean?} nocache Whether the user should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/user#user-object}
     */
    constructor(client, data, nocache = false) {

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The id of the user.
         * @type {BigInt}
         */
        this.id = BigInt(data.id);

        /**
         * The avatar of the user.
         * @type {String?}
         */
        this.avatar = data.avatar;

        if (data.bot == true)
            /**
             * Whether the user is a bot or not.
             * @type {Boolean?}
             */
            this.bot = data.bot;

        /**
         * The username of the user.
         * @type {String}
         */
        this.username = data.username;

        /**
         * The discriminator of the user.
         * @type {String}
         */
        this.discriminator = data.discriminator;

        /**
         * The UNIX (seconds) timestamp when this user was last cached.
         * @type {Number}
         */
        this.cached = (new Date().getTime() / 1000) | 0;

        if (nocache == false && this.client.cacheUsers == true)
            this.client.users.cache.set(data.id, this);

    }
    
    /**
     * The avatar URL of the user.
     * @readonly
     * @type {String}
     */
    get displayAvatarURL() {

        return this.avatar ?
            `${CDN_BASE_URL}/avatars/${this.id}/${this.avatar}.${this.avatar.startsWith("a_") ? "gif" : "png"}` :
            `${CDN_BASE_URL}/embed/avatars/${this.discriminator % 5}.png`;

    }

    /**
     * The username#discriminator of the user.
     * @readonly
     * @type {String}
     */
    get tag() {

        return this.username + "#" + this.discriminator;

    }

    /**
     * The UNIX (seconds) timestamp of when this user created their Discord account.
     * @readonly
     * @type {Number}
     */
    get createdTimestamp() {

        return getTimestamp(this.id);

    }

}

module.exports = User;