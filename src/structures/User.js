const { CDN_BASE_URL } = require("../constants");
const getTimestamp = require("../util/getTimestampFromSnowflake");

/**
 * Represents a Discord user.
 * @see {@link https://discord.com/developers/docs/resources/user}
 */
class User {

    /**
     * Creates a structure for a user.
     * @param {Client} client The client instance.
     * @param {Object} data The raw user data.
     * @param {Boolean?} nocache Whether the user should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/user#user-object}
     */
    constructor(client, data, { nocache = false, ignoreNoCache = false, noDbStore = false } = {}) {

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
         * The global name of the user.
         * @type {String}
         */
        this.global_name = data.global_name;

        if (data.discriminator && data.discriminator != 0)
            /**
             * The discriminator of the user.
             * @type {Number?}
             */
            this.discriminator = data.discriminator;

        /**
         * The UNIX (seconds) timestamp when this user was last cached.
         * @type {Number}
         */
        this.cached = (new Date().getTime() / 1000) | 0;

        if (nocache == false && (this.client.cacheUsers == true && ignoreNoCache == false)) {
            this.client.users.cache.set(data.id, this);
            // if (noDbStore != true)
                // this.client.users.store(this);
        }

    }

    overrideAvatarURL(url) {

        this.overrideAvatar = url;

    }

    /**
     * The hash of the users's avatar, as it was received from Discord.
     * @readonly
     * @type {String?}
     */
    get originalAvatarHash() {

        return this.avatar ? 
            // eslint-disable-next-line quotes
            `${this.avatarIsAnimated ? "a_" : ''}${this.formattedAvatarHash}` :
            null;

    }

    /**
     * The hash of the users's avatar as a string.
     * @readonly
     * @type {String}
     */
    get formattedAvatarHash() {

        if (!this.avatar)
            return null;

        let formattedHash = this.avatar.toString(16);

        while (formattedHash.length != 32)
            // eslint-disable-next-line quotes
            formattedHash = '0' + formattedHash;

        return formattedHash;

    }

    /**
     * The avatar URL of the user.
     * @readonly
     * @type {String}
     */
    get displayAvatarURL() {

        if (this.overrideAvatar)
            return this.overrideAvatar;

        return this.avatar ?
            // eslint-disable-next-line quotes
            `${CDN_BASE_URL}/avatars/${this.id}/${this.originalAvatarHash}.${this.avatarIsAnimated ? "gif" : "png"}` :
            `${CDN_BASE_URL}/embed/avatars/${(this.id >> 22n) % 6n}.png`;

    }

    /**
     * The username of the user.
     * @readonly
     * @type {String}
     */
    get tag() {

        return this.discriminator ? 
            `${this.username}#${this.discriminator}` :
            this.username;

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

        return (this._attributes & (0b1 << 0)) == (0b1 << 0);

    }

    /**
     * Whether the user has an animated avatar or not.
     * @readonly
     * @type {Boolean}
     */
    get avatarIsAnimated() {

        return (this._attributes & (0b1 << 1)) == (0b1 << 1);

    }

}

module.exports = User;