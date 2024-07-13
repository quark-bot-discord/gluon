const User = require("./User");

/**
 * Represents a guild invite.
 */
class Invite {
  /**
   *
   * @param {Client} client The client instance.
   * @param {Object} data The raw invite data from Discord.
   * @param {String} guild_id The id of the guild that the invite belongs to.
   * @param {Boolean?} nocache Whether this invite should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-structure}
   */
  constructor(client, data, guild_id, nocache = false) {
    /**
     * The client instance.
     * @type {Client}
     */
    this._client = client;

    /**
     * The id of the guild that this role belongs to.
     * @type {BigInt}
     */
    this._guild_id = BigInt(guild_id);

    /**
     * The code for the invite.
     * @type {String}
     */
    this._code = data.code;

    /**
     * The id of the channel the invite is directed to.
     * @type {BigInt}
     */
    this._channel_id = BigInt(data.channel_id);

    if (data.inviter)
      /**
       * The user who created the invite.
       * @type {User?}
       */
      this.inviter = new User(this._client, data.inviter, { nocache });

    if (typeof data.uses == "number")
      /**
       * The number of times the invite has been used.
       * @type {Number?}
       */
      this.uses = data.uses;

    if (data.expires_at)
      /**
       * The UNIX timestamp of when the invite expires.
       * @type {Number?}
       */
      this.expires = (new Date(data.expires_at).getTime() / 1000) | 0;
    else if (typeof data.expires == "number") this.expires = data.expires;
    else if (
      typeof data.max_age == "number" &&
      data.max_age != 0 &&
      data.created_at
    )
      this.expires =
        ((new Date(data.created_at).getTime() / 1000) | 0) + data.max_age;

    if (typeof data.max_uses == "number")
      /**
       * The maximum number of uses allowed for the invite.
       * @type {Number?}
       */
      this.maxUses = data.max_uses;

    if (
      nocache == false &&
      this._client.cacheInvites == true &&
      this._code &&
      ((this.expires && this.expires > Date.now() / 1000) || !this.expires)
    )
      this.guild?.invites.cache.set(data.code, this);
    else
      this._client.emit(
        "debug",
        `NOT CACHING INVITE ${this._code} ${this.expires} ${
          (Date.now() / 1000) | 0
        }`,
      );
  }

  /**
   * The channel the invite is directed to.
   * @type {(TextChannel | VoiceChannel)?}
   */
  get channel() {
    return this._channel_id
      ? this.guild.channels.cache.get(String(this._channel_id))
      : null;
  }

  /**
   * The code of the invite.
   * @type {String}
   * @readonly
   */
  get id() {
    return this._code;
  }

  /**
   * The guild that this role belongs to.
   * @type {Guild?}
   * @readonly
   */
  get guild() {
    return this._client.guilds.cache.get(this._guild_id) || null;
  }

  toJSON() {
    return {
      code: this._code,
      channel: this.channel,
      inviter: this.inviter,
      uses: this.uses,
      expires: this.expires,
    };
  }
}

module.exports = Invite;
