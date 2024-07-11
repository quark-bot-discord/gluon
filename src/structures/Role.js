const getRoleIcon = require("../util/getRoleIcon");

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
     * The guild that this role belongs to.
     * @type {Guild?}
     */
    this.guild = this._client.guilds.cache.get(guild_id) || null;

    if (!this.guild)
      /**
       * The id of the guild that this role belongs to.
       * @type {BigInt?}
       */
      this.guild_id = BigInt(guild_id);

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
    if (data.icon) this.icon = data.icon;

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
   * The icon URL of the role.
   * @readonly
   * @type {String?}
   */
  get displayIconURL() {
    return getRoleIcon(this.hash, this.id);
  }
}

module.exports = Role;
