const Channel = require("./Channel");

/**
 * Represents a thread within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
 */
class Thread extends Channel {
  /**
   * Creates the structure for a thread.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {String} guild_id The ID of the guild that this thread belongs to.
   * @param {Boolean?} nocache Whether this thread should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
   */
  constructor(client, data, guild_id, nocache = false) {
    super(client, data, guild_id);

    /**
     * The ID of the user who created this thread.
     * @type {BigInt}
     */
    this._owner_id = BigInt(data.owner_id);

    /**
     * The ID of the text channel that this thread belongs to.
     * @type {BigInt}
     */
    this._parent_id = BigInt(data.parent_id);

    if (nocache == false && data.archived != true)
      this.guild?.channels.cache.set(data.id, this);
  }

  /**
   * The member who created this thread.
   * @type {Member?}
   * @readonly
   */
  get owner() {
    return this.guild?.members.cache.get(String(this._owner_id)) || null;
  }

  /**
   * The text channel that this thread belongs to.
   * @type {TextChannel?}
   * @readonly
   */
  get parent() {
    return this.guild?.channels.cache.get(String(this._parent_id)) || null;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      owner_id: String(this._owner_id),
      parent_id: String(this._parent_id),
    };
  }
}

module.exports = Thread;
