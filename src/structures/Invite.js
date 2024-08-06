import { INVITE_BASE_URL, TO_JSON_TYPES_ENUM } from "../constants.js";
import User from "./User.js";

/**
 * Represents a guild invite.
 */
class Invite {
  #_client;
  #_guild_id;
  #_code;
  #_channel_id;
  #uses;
  #expires;
  #inviter;
  #max_uses;
  /**
   *
   * @param {Client} client The client instance.
   * @param {Object} data The raw invite data from Discord.
   * @param {String} guild_id The id of the guild that the invite belongs to.
   * @param {Boolean?} nocache Whether this invite should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-structure}
   */
  constructor(
    client,
    data,
    { guild_id, nocache = false } = { nocache: false },
  ) {
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The id of the guild that this role belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guild_id);

    /**
     * The code for the invite.
     * @type {String}
     * @private
     */
    this.#_code = data.code;

    /**
     * The id of the channel the invite is directed to.
     * @type {BigInt}
     * @private
     */
    if (data.channel?.id) this.#_channel_id = BigInt(data.channel.id);

    if (data.inviter)
      /**
       * The user who created the invite.
       * @type {User?}
       * @private
       */
      this.#inviter = new User(this.#_client, data.inviter, { nocache });

    if (typeof data.uses == "number")
      /**
       * The number of times the invite has been used.
       * @type {Number?}
       * @private
       */
      this.#uses = data.uses;

    if (data.expires_at)
      /**
       * The UNIX timestamp of when the invite expires.
       * @type {Number?}
       * @private
       */
      this.#expires = (new Date(data.expires_at).getTime() / 1000) | 0;
    else if (typeof data.expires == "number") this.#expires = data.expires;
    else if (
      typeof data.max_age == "number" &&
      data.max_age != 0 &&
      data.created_at
    )
      this.#expires =
        ((new Date(data.created_at).getTime() / 1000) | 0) + data.max_age;

    if (typeof data.max_uses == "number")
      /**
       * The maximum number of uses allowed for the invite.
       * @type {Number?}
       * @private
       */
      this.#max_uses = data.max_uses;

    if (
      nocache == false &&
      this.#_client.cacheInvites == true &&
      this.#_code &&
      ((this.#expires && this.#expires > Date.now() / 1000) || !this.#expires)
    )
      this.guild?.invites.set(data.code, this);
  }

  /**
   * The id of the channel the invite is directed to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId() {
    return String(this.#_channel_id);
  }

  /**
   * The channel the invite is directed to.
   * @type {(TextChannel | VoiceChannel)?}
   * @readonly
   * @public
   */
  get channel() {
    return this.guild.channels.get(this.channelId) || null;
  }

  /**
   * The code of the invite.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return this.code;
  }

  /**
   * The code of the invite.
   * @type {String}
   * @readonly
   * @public
   */
  get code() {
    return this.#_code;
  }

  /**
   * The id of the guild that this invite belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The guild that this role belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The number of times the invite has been used.
   * @type {Number?}
   * @readonly
   * @public
   */
  get uses() {
    return this.#uses;
  }

  /**
   * The UNIX timestamp of when the invite expires.
   * @type {Number?}
   * @readonly
   * @public
   */
  get expires() {
    return this.#expires;
  }

  /**
   * The user who created the invite.
   * @type {User?}
   * @readonly
   * @public
   */
  get inviter() {
    return this.#inviter;
  }

  /**
   * The URL of the invite.
   * @type {String}
   * @readonly
   * @public
   */
  get url() {
    return Invite.getUrl(this.code);
  }

  /**
   * The maximum number of uses allowed for the invite.
   * @type {Number?}
   * @readonly
   * @public
   */
  get maxUses() {
    return this.#max_uses;
  }

  /**
   * Returns the URL of the invite.
   * @param {String} code The code of the invite.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getUrl(code) {
    if (typeof code != "string")
      throw new TypeError("GLUON: Invalid invite code.");
    return `${INVITE_BASE_URL}/${code}`;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Invite: ${this.code}>`;
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        return {
          code: this.code,
          channel: this.channel.toJSON(format),
          inviter: this.inviter.toJSON(format),
          uses: this.uses,
          expires: this.expires * 1000,
          max_uses: this.maxUses,
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          code: this.code,
          channel: this.channel.toJSON(format),
          inviter: this.inviter.toJSON(format),
          uses: this.uses,
          expires_at: this.expires
            ? new Date(this.expires * 1000).toISOString()
            : undefined,
          max_uses: this.maxUses,
        };
      }
    }
  }
}

export default Invite;
