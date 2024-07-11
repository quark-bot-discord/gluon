const { CDN_BASE_URL } = require("../constants");

/**
 * Represents an emoji.
 * @see {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure}
 */
class Emoji {
  /**
   * Creates the structure for an emoji.
   * @param {Client} client The client instance.
   * @param {Object} data The raw emoji data from Discord.
   * @param {String} guild_id The id of the guild that the emoji belongs to.
   * @param {Boolean?} nocache Whether this emoji should be cached or not.
   */
  constructor(client, data, guild_id, nocache = false) {
    this.client = client;

    this.id = data.id ? BigInt(data.id) : null;

    this.name = data.name;

    this._attributes = data._attributes ?? 0;

    if (data.require_colons !== undefined && data.require_colons == true)
      this._attributes |= 0b1 << 0;

    if (data.managed !== undefined && data.managed == true)
      this._attributes |= 0b1 << 1;

    if (data.animated !== undefined && data.animated == true)
      this._attributes |= 0b1 << 2;

    if (data.available !== undefined && data.available == true)
      this._attributes |= 0b1 << 3;

    this.guild = this.client.guilds.cache.get(guild_id) || null;

    if (!this.guild) this.guild_id = BigInt(guild_id);

    if (nocache == false && this.client.cacheEmojis == true && this.id)
      this.client.guilds.cache.get(guild_id)?.emojis.cache.set(data.id, this);
  }

  get require_colons() {
    return (this._attributes & (0b1 << 0)) == 0b1 << 0;
  }

  get managed() {
    return (this._attributes & (0b1 << 1)) == 0b1 << 1;
  }

  get animated() {
    return (this._attributes & (0b1 << 2)) == 0b1 << 2;
  }

  get available() {
    return (this._attributes & (0b1 << 3)) == 0b1 << 3;
  }

  get mention() {
    if (this.id)
      return `<${this.animated == true ? "a" : ""}:${this.name}:${this.id}>`;
    else return this.name;
  }

  get url() {
    return `${CDN_BASE_URL}/emojis/${this.id}.${
      this.animated == true ? "gif" : "png"
    }`;
  }
}

module.exports = Emoji;
