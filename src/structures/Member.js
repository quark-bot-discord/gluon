const { CDN_BASE_URL, PERMISSIONS, MEMBER_FLAGS } = require("../constants");
const User = require("./User");
const checkPermission = require("../util/discord/checkPermission");
const checkMemberPermissions = require("../util/discord/checkMemberPermissions");
const getMemberAvatar = require("../util/image/getMemberAvatar");

/**
 * Represents a guild member.
 * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure}
 */
class Member {
  /**
   * Creates the structure for a guild member.
   * @param {Client} client The client instance.
   * @param {Object} data The raw member data from Discord.
   * @param {String} user_id The id of the member.
   * @param {String} guild_id The id of the guild that the member belongs to.
   * @param {User?} user A user object for this member.
   * @param {Boolean?} nocache Whether this member should be cached.
   * @param {Boolean?} ignoreNoCache Whether the cache options should be overriden.
   */
  constructor(
    client,
    data,
    user_id,
    guild_id,
    user,
    { nocache = false, ignoreNoCache = false, noDbStore = false } = {},
  ) {
    /**
     * The client instance.
     * @type {Client}
     */
    this._client = client;

    /**
     * The id of the guild that this member belongs to.
     * @type {BigInt}
     */
    this._guild_id = BigInt(guild_id);

    const existing = this.guild?.members.cache.get(user_id) || null;

    /**
     * The id of the member.
     * @type {BigInt}
     */
    this.id = BigInt(user_id);

    if (data.user)
      /**
       * The user object for this member.
       * @type {User?}
       */
      this.user = new User(this._client, data.user, { nocache });
    else if (existing?.user) this.user = existing.user;
    else if (user) this.user = user;
    else this.user = this._client.users.cache.get(user_id) || null;

    if (data.nick !== undefined)
      /**
       * The nickname of this member.
       * @type {String?}
       */
      this.nick = data.nick;
    else if (data.nick !== null && existing && existing.nick != undefined)
      this.nick = existing.nick;

    if (data.joined_at)
      /**
       * The UNIX timestamp for when this member joined the guild.
       * @type {Number?}
       */
      this.joined_at = (new Date(data.joined_at).getTime() / 1000) | 0;
    else if (existing?.joined_at) this.joined_at = existing.joined_at;

    /**
     * The UNIX timestamp for when this member's timeout expires, if applicable.
     * @type {Number?}
     */
    this.timeout_until = data.communication_disabled_until
      ? (new Date(data.communication_disabled_until).getTime() / 1000) | 0
      : null;

    if (typeof data.flags == "number")
      /**
       * The flags for this user.
       * @type {Number}
       * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags}
       */
      this.flags = data.flags;
    else if (existing && typeof existing.flags == "number")
      this.flags = existing.flags;
    else this.flags = 0;

    this._attributes = data._attributes ?? 0;

    if (data.pending !== undefined && data.pending == true)
      this._attributes |= 0b1 << 0;
    else if (data.pending === undefined && existing && existing.pending == true)
      this._attributes |= 0b1 << 0;

    if (data.avatar && data.avatar.startsWith("a_") == true)
      this._attributes |= 0b1 << 1;

    if (data.avatar !== undefined)
      this._avatar = data.avatar
        ? BigInt(`0x${data.avatar.replace("a_", "")}`)
        : null;
    else if (data.avatar === undefined && existing && existing._avatar)
      this._avatar = existing._avatar;

    if (data.roles && this.guild && this._client.cacheRoles == true) {
      this._roles = [];
      for (let i = 0; i < data.roles.length; i++)
        if (data.roles[i] != guild_id) this._roles.push(BigInt(data.roles[i]));
    }

    if (
      this.id == this._client.user.id ||
      (nocache == false &&
        (this._client.cacheMembers == true ||
          this._client.cacheAllMembers == true) &&
        ignoreNoCache == false)
    ) {
      this._client.guilds.cache.get(guild_id)?.members.cache.set(user_id, this);
      // if (noDbStore != true)
      //     this.guild.members.store(this);
    }
  }

  /**
   * The guild that this member belongs to.
   * @type {Guild?}
   * @readonly
   */
  get guild() {
    return this._client.guilds.cache.get(String(this._guild_id)) || null;
  }

  /**
   * The member's roles.
   * @readonly
   * @type {Array<Role>}
   */
  get roles() {
    if (this._client.cacheRoles != true) return [];

    const roles = [];

    roles.push(this.guild.roles.cache.get(String(this._guild_id)));

    if (!this._roles) return roles;

    for (let i = 0; i < this._roles.length; i++) {
      const role = this.guild.roles.cache.get(this._roles[i].toString());
      if (role) roles.push(role);
    }

    return roles;
  }

  /**
   * The position of the member's highest role.
   * @readonly
   * @type {Number}
   */
  get highestRolePosition() {
    let highestPosition = 0;

    const roles = this.roles;

    for (let i = 0; i < roles.length; i++)
      if (roles[i].position > highestPosition)
        highestPosition = roles[i].position;

    return highestPosition;
  }

  /**
   * The overall calculated permissions for this member.
   * @readonly
   * @type {BigInt}
   */
  get permissions() {
    if (this.id == this.guild.owner_id) return PERMISSIONS.ADMINISTRATOR;

    return checkMemberPermissions(this.roles);
  }

  /**
   * Whether the member has joined the guild before.
   * @readonly
   * @type {Boolean}
   */
  get rejoined() {
    return (this.flags & MEMBER_FLAGS.DID_REJOIN) == MEMBER_FLAGS.DID_REJOIN;
  }

  /**
   * The hash of the member's avatar, as it was received from Discord.
   * @readonly
   * @type {String?}
   */
  get _originalAvatarHash() {
    return this._avatar
      ? // eslint-disable-next-line quotes
        `${this.avatarIsAnimated ? "a_" : ""}${this._formattedAvatarHash}`
      : null;
  }

  /**
   * The hash of the member's avatar as a string.
   * @readonly
   * @type {String}
   */
  get _formattedAvatarHash() {
    if (!this._avatar) return null;

    let formattedHash = this._avatar.toString(16);

    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = "0" + formattedHash;

    return formattedHash;
  }

  /**
   * The url of the member's avatar.
   * @readonly
   * @type {String}
   */
  get displayAvatarURL() {
    return (
      getMemberAvatar(this.id, this._guild_id, this._originalAvatarHash) ??
      this.user.displayAvatarURL
    );
  }

  /**
   * Whether the user has not yet passed the guild's membership screening requirements.
   * @readonly
   * @type {Boolean}
   */
  get pending() {
    return (this._attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * Whether the user has an animated avatar or not.
   * @readonly
   * @type {Boolean}
   */
  get avatarIsAnimated() {
    return (this._attributes & (0b1 << 1)) == 0b1 << 1;
  }

  /**
   * Adds a role to the member.
   * @param {BigInt | String} role_id The id of the role to add to the member.
   * @param {Object?} options The options for adding the role to the member.
   * @param {String?} options.reason The reason for adding the role to the member.
   * @returns {Promise<void>}
   */
  async addRole(role_id, { reason } = {}) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.MANAGE_ROLES,
      )
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_ROLES");

    const body = {};

    if (reason) body["X-Audit-Log-Reason"] = reason;

    await this._client.request.makeRequest(
      "putAddGuildMemberRole",
      [this._guild_id, this.id, role_id],
      body,
    );
  }

  /**
   * Removes a role from the member.
   * @param {BigInt | String} role_id The id of the role to remove from the member.
   * @param {Object?} options The options for removing the role from the member.
   * @param {String?} options.reason The reason for removing the role from the member.
   * @returns {Promise<void>}
   */
  async removeRole(role_id, { reason } = {}) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.MANAGE_ROLES,
      )
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_ROLES");

    const body = {};

    if (reason) body["X-Audit-Log-Reason"] = reason;

    await this._client.request.makeRequest(
      "deleteRemoveMemberRole",
      [this._guild_id, this.id, role_id],
      body,
    );
  }

  /**
   * Adds a timeout to the member.
   * @param {Number} timeout_until The UNIX timestamp for when the member's timeout should end.
   * @param {Object?} options The options for timing out the member.
   * @param {String?} options.reason The reason for timing out the member.
   * @returns {Promise<void>}
   */
  async timeoutAdd(timeout_until, { reason } = {}) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.MODERATE_MEMBERS,
      )
    )
      throw new Error("MISSING PERMISSIONS: MODERATE_MEMBERS");

    const body = {};

    if (reason) body["X-Audit-Log-Reason"] = reason;

    body.communication_disabled_until = timeout_until;

    await this._client.request.makeRequest(
      "patchGuildMember",
      [this._guild_id, this.id],
      body,
    );
  }

  /**
   * Removes a timeout from the member.
   * @param {Object?} options The options for untiming out the member.
   * @param {String?} options.reason The reason for removing the time out from the member.
   * @returns {Promise<void>}
   */
  async timeoutRemove({ reason } = {}) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.MODERATE_MEMBERS,
      )
    )
      throw new Error("MISSING PERMISSIONS: MODERATE_MEMBERS");

    const body = {};

    if (reason) body["X-Audit-Log-Reason"] = reason;

    body.communication_disabled_until = null;

    await this._client.request.makeRequest(
      "patchGuildMember",
      [this._guild_id, this.id],
      body,
    );
  }

  /**
   * Updates the member's roles.
   * @param {Array<BigInt | String>} roles An array of role ids for the roles the member should be updated with.
   * @param {Object?} options The options for updating the member's roles.
   * @returns {Promise<void>}
   */
  async massUpdateRoles(roles, { reason } = {}) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.MANAGE_ROLES,
      )
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_ROLES");

    const body = {};

    if (reason) body["X-Audit-Log-Reason"] = reason;

    body.roles = roles.map((role) => role.toString());

    await this._client.request.makeRequest(
      "patchGuildMember",
      [this._guild_id, this.id],
      body,
    );
  }

  toJSON() {
    return {
      user: this.user,
      nick: this.nick,
      joined_at: this.joined_at ? this.joined_at * 1000 : undefined,
      avatar: this._originalAvatarHash,
      permissions: String(this.permissions),
      roles: Array.isArray(this._roles)
        ? this._roles.map((r) => String(r))
        : undefined,
      communication_disabled_until: this.timeout_until
        ? this.timeout_until * 1000
        : undefined,
      _attributes: this._attributes,
    };
  }
}

module.exports = Member;
