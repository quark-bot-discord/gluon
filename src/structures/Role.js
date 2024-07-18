const getRoleIcon = require("../util/image/getRoleIcon");

/**
 * Represents a role belonging to a guild.
 */
class Role {
  /**
   *
   * @param {Client} client The client instance.
   * @param {Object} data The raw role data from Discord.
   * @param {String} guild_id The id of the guild that the role belongs to.
   * @param {Boolean?} nocache Whether this role should be cached or not.
   * @see {@link https://discord.com/developers/docs/topics/permissions#role-object-role-structure}
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
     * The id of the role.
     * @type {BigInt}
     */
    this.id = BigInt(data.id);

    /**
     * The name of the role.
     * @type {String}
     */
    this.name = data.name;

    /**
     * The colour of the role.
     * @type {Number}
     */
    this.color = data.color;

    /**
     * The position of the role.
     * @type {Number}
     */
    this.position = data.position;

    /**
     * The role icon hash.
     * @type {String?}
     */
    if (data.icon) this._icon = BigInt(`0x${data.icon}`);

    /**
     * The permissions for the role.
     * @type {BigInt}
     */
    this.permissions = BigInt(data.permissions);

    this._attributes = data._attributes ?? 0;

    if (data.hoist == true) this._attributes |= 0b1 << 0;

    if (data.managed == true) this._attributes |= 0b1 << 1;

    if (data.mentionable == true) this._attributes |= 0b1 << 2;

    if (data.tags) this.tags = data.tags;

    if (nocache == false && this._client.cacheRoles == true)
      this.guild?.roles.cache.set(data.id, this);
  }

  /**
   * Whether the role is hoisted.
   * @readonly
   * @returns {Boolean}
   */
  get hoist() {
    return (this._attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * Whether the role is managed (by an application).
   * @readonly
   * @returns {Boolean}
   */
  get managed() {
    return (this._attributes & (0b1 << 1)) == 0b1 << 1;
  }

  /**
   * Whether the role is mentionable.
   * @readonly
   * @returns {Boolean}
   */
  get mentionable() {
    return (this._attributes & (0b1 << 2)) == 0b1 << 2;
  }

  /**
   * The hash of the role's avatar, as it was received from Discord.
   * @readonly
   * @type {String?}
   */
  get _originalIconHash() {
    return this._icon
      ? // eslint-disable-next-line quotes
        `${this._formattedIconHash}`
      : null;
  }

  /**
   * The hash of the role icon as a string.
   * @readonly
   * @type {String}
   */
  get _formattedIconHash() {
    if (!this._icon) return null;

    let formattedHash = this._icon.toString(16);

    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = "0" + formattedHash;

    return formattedHash;
  }

  /**
   * The icon URL of the role.
   * @readonly
   * @type {String?}
   */
  get displayIconURL() {
    return getRoleIcon(this._originalIconHash, this.id);
  }

  /**
   * The guild that this role belongs to.
   * @type {Guild?}
   * @readonly
   */
  get guild() {
    return this._client.guilds.cache.get(this._guild_id.toString()) || null;
  }

  toJSON() {
    return {
      id: String(this.id),
      name: this.name,
      color: this.color,
      position: this.position,
      permissions: String(this.permissions),
      icon: this._originalIconHash,
      _attributes: this._attributes,
      tags: this.tags,
    };
  }
}

module.exports = Role;
