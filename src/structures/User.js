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

        this._attributes = 0;

        if (data.bot == true)
            this._attributes |= (0b1 << 0);

        if (data.avatar && data.avatar.startsWith("a_") == true)
            this._attributes |= (0b1 << 1);

        /**
         * The avatar of the user.
         * @type {BigInt?}
         */
        this.avatar = data.avatar ? BigInt("0x" + data.avatar.replace("a_", "")) : null;

        /**
         * The username of the user.
         * @type {String}
         */
        this.username = data.username;

        /**
         * The discriminator of the user.
         * @type {Number}
         */
        this.discriminator = parseInt(data.discriminator);

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
            // eslint-disable-next-line quotes
            `${CDN_BASE_URL}/avatars/${this.id}/${this.avatarIsAnimated ? "a_" : ''}${this.avatar.toString(16)}.${this.avatarIsAnimated ? "gif" : "png"}` :
            `${CDN_BASE_URL}/embed/avatars/${this.discriminator % 5}.png`;

    }

    get discriminatorString() {

        let discriminatorString = this.discriminator.toString();

        while (discriminatorString.length != 4)
            // eslint-disable-next-line quotes
            discriminatorString = '0' + discriminatorString;

        return discriminatorString;

    }

    /**
     * The username#discriminator of the user.
     * @readonly
     * @type {String}
     */
    get tag() {

        return this.username + "#" + this.discriminatorString;

    }

    /**
     * The UNIX (seconds) timestamp of when this user created their Discord account.
     * @readonly
     * @type {Number}
     */
    get createdTimestamp() {

        return getTimestamp(this.id);

    }

    /**
     * Whether the user is a bot or not.
     * @readonly
     * @type {Boolean}
     */
    get bot() {

        return (this._attributes & (0b1 << 0)) == 1;

    }

    /**
     * Whether the user has an animated avatar or not.
     * @readonly
     * @type {Boolean}
     */
    get avatarIsAnimated() {

        return (this._attributes & (0b1 << 1)) == 1;

    }

}

module.exports = User;