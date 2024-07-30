import getRoleIcon from "../util/image/getRoleIcon.js";

/**
 * Represents a role belonging to a guild.
 */
class Role {
  #_client;
  #_guild_id;
  #_id;
  #name;
  #color;
  #position;
  #_icon;
  #permissions;
  #_attributes;
  #tags;
  /**
   *
   * @param {Client} client The client instance.
   * @param {Object} data The raw role data from Discord.
   * @param {String} guild_id The id of the guild that the role belongs to.
   * @param {Boolean?} nocache Whether this role should be cached or not.
   * @see {@link https://discord.com/developers/docs/topics/permissions#role-object-role-structure}
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
     * The id of the role.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The name of the role.
     * @type {String}
     * @private
     */
    this.#name = data.name;

    /**
     * The color of the role.
     * @type {Number}
     * @private
     */
    this.#color = data.color;

    /**
     * The position of the role.
     * @type {Number}
     * @private
     */
    this.#position = data.position;

    /**
     * The role icon hash.
     * @type {String?}
     * @private
     */
    if (data.icon) this.#_icon = BigInt(`0x${data.icon}`);

    /**
     * The permissions for the role.
     * @type {BigInt}
     * @private
     */
    this.#permissions = BigInt(data.permissions);

    /**
     * The attributes of the role.
     * @type {Number}
     * @private
     */
    this.#_attributes = data._attributes ?? 0;

    if (data.hoist == true) this.#_attributes |= 0b1 << 0;

    if (data.managed == true) this.#_attributes |= 0b1 << 1;

    if (data.mentionable == true) this.#_attributes |= 0b1 << 2;

    if (data.tags) this.#tags = data.tags;

    if (nocache == false && this.#_client.cacheRoles == true)
      this.guild?.roles.set(data.id, this);
  }

  /**
   * The ID of the role.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * Whether the role is hoisted.
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get hoist() {
    return (this.#_attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * Whether the role is managed (by an application).
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get managed() {
    return (this.#_attributes & (0b1 << 1)) == 0b1 << 1;
  }

  /**
   * Whether the role is mentionable.
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get mentionable() {
    return (this.#_attributes & (0b1 << 2)) == 0b1 << 2;
  }

  /**
   * The hash of the role's avatar, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @private
   */
  get #_originalIconHash() {
    return this.#_icon
      ? // eslint-disable-next-line quotes
        `${this.#_formattedIconHash}`
      : null;
  }

  /**
   * The hash of the role icon as a string.
   * @readonly
   * @type {String}
   * @private
   */
  get #_formattedIconHash() {
    if (!this.#_icon) return null;

    let formattedHash = this.#_icon.toString(16);

    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = "0" + formattedHash;

    return formattedHash;
  }

  /**
   * The icon URL of the role.
   * @readonly
   * @type {String?}
   * @public
   */
  get displayIconURL() {
    return getRoleIcon(this.id, this.#_originalIconHash);
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
   * The ID of the guild that this role belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The name of the role.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return this.#name;
  }

  /**
   * The color of the role.
   * @type {Number}
   * @readonly
   * @public
   */
  get color() {
    return this.#color;
  }

  /**
   * The position of the role.
   * @type {Number}
   * @readonly
   * @public
   */
  get position() {
    return this.#position;
  }

  /**
   * The permissions for the role.
   * @type {String}
   * @readonly
   * @public
   */
  get permissions() {
    return String(this.#permissions);
  }

  /**
   * The attributes of the role.
   * @type {Object}
   * @readonly
   * @public
   */
  get tags() {
    return this.#tags;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Role: ${this.id}>`;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      position: this.position,
      permissions: this.permissions,
      icon: this.#_originalIconHash,
      _attributes: this.#_attributes,
      tags: this.tags,
    };
  }
}

export default Role;
