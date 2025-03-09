var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _Member_instances,
  _Member__client,
  _Member__guild_id,
  _Member__id,
  _Member_nick,
  _Member_joined_at,
  _Member_communication_disabled_until,
  _Member_flags,
  _Member__attributes,
  _Member__avatar,
  _Member__roles,
  _Member_user,
  _Member__formattedAvatarHash_get;
import { PERMISSIONS, CDN_BASE_URL } from "../constants.js";
import User from "./User.js";
import checkPermission from "../util/discord/checkPermission.js";
import checkMemberPermissions from "../util/discord/checkMemberPermissions.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Role from "./Role.js";
import util from "util";
import encryptStructure from "../util/gluon/encryptStructure.js";
import decryptStructure from "../util/gluon/decryptStructure.js";
import structureHashName from "../util/general/structureHashName.js";
import { GuildMemberFlags } from "#typings/discord.js";
import { GluonDebugLevels, JsonTypes } from "#typings/enums.js";
import getGuild from "#src/util/gluon/getGuild.js";
/**
 * Represents a guild member.
 * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure}
 */
class Member {
  /**
   * Creates the structure for a guild member.
   * @param {Client} client The client instance.
   * @param {Object} data The raw member data from Discord.
   * @param {Object} options Additional options for the member.
   * @param {String} options.userId The id of the member.
   * @param {String} options.guildId The id of the guild that the member belongs to.
   * @param {User?} [options.user] A user object for this member.
   * @param {Boolean?} [options.nocache] Whether this member should be cached.
   */
  constructor(client, data, { userId, guildId, user, nocache = false }) {
    _Member_instances.add(this);
    _Member__client.set(this, void 0);
    _Member__guild_id.set(this, void 0);
    _Member__id.set(this, void 0);
    _Member_nick.set(this, void 0);
    _Member_joined_at.set(this, void 0);
    _Member_communication_disabled_until.set(this, void 0);
    _Member_flags.set(this, void 0);
    _Member__attributes.set(this, void 0);
    _Member__avatar.set(this, void 0);
    _Member__roles.set(this, void 0);
    _Member_user.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string");
    if (typeof user !== "undefined" && typeof user !== "object")
      throw new TypeError("GLUON: User must be an object");
    if (typeof nocache !== "boolean")
      throw new TypeError("GLUON: No cache must be a boolean");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _Member__client, client, "f");
    /**
     * The id of the guild that this member belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Member__guild_id, BigInt(guildId), "f");
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${guildId} cannot be found in cache`);
    }
    const existing = this.guild?.members.get(userId) || null;
    /**
     * The id of the member.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Member__id, BigInt(userId), "f");
    if ("user" in data && data.user)
      /**
       * The user object for this member.
       * @type {User?}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _Member_user,
        new User(
          __classPrivateFieldGet(this, _Member__client, "f"),
          data.user,
          { nocache },
        ),
        "f",
      );
    else if (existing?.user)
      __classPrivateFieldSet(this, _Member_user, existing.user, "f");
    else if (user) __classPrivateFieldSet(this, _Member_user, user, "f");
    else
      __classPrivateFieldSet(
        this,
        _Member_user,
        __classPrivateFieldGet(this, _Member__client, "f").users.get(userId) ||
          null,
        "f",
      );
    if (data.nick !== undefined)
      /**
       * The nickname of this member.
       * @type {String?}
       * @private
       */
      __classPrivateFieldSet(this, _Member_nick, data.nick, "f");
    else if (data.nick !== null && existing && existing.nick != undefined)
      __classPrivateFieldSet(this, _Member_nick, existing.nick, "f");
    if (data.joined_at)
      /**
       * The UNIX timestamp for when this member joined the guild.
       * @type {Number?}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _Member_joined_at,
        (new Date(data.joined_at).getTime() / 1000) | 0,
        "f",
      );
    else if (existing?.joinedAt)
      __classPrivateFieldSet(this, _Member_joined_at, existing.joinedAt, "f");
    /**
     * The UNIX timestamp for when this member's timeout expires, if applicable.
     * @type {Number?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Member_communication_disabled_until,
      data.communication_disabled_until
        ? (new Date(data.communication_disabled_until).getTime() / 1000) | 0
        : null,
      "f",
    );
    if (typeof data.flags == "number")
      /**
       * The flags for this user.
       * @type {Number}
       * @private
       * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags}
       */
      __classPrivateFieldSet(this, _Member_flags, data.flags, "f");
    else if (existing && typeof existing.flags == "number")
      __classPrivateFieldSet(this, _Member_flags, existing.flags, "f");
    else __classPrivateFieldSet(this, _Member_flags, 0, "f");
    /**
     * The attributes for this member.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Member__attributes,
      "_attributes" in data ? data._attributes : 0,
      "f",
    );
    if ("pending" in data && data.pending !== undefined && data.pending == true)
      __classPrivateFieldSet(
        this,
        _Member__attributes,
        __classPrivateFieldGet(this, _Member__attributes, "f") | (0b1 << 0),
        "f",
      );
    else if (
      "pending" in data &&
      data.pending === undefined &&
      existing &&
      existing.pending == true
    )
      __classPrivateFieldSet(
        this,
        _Member__attributes,
        __classPrivateFieldGet(this, _Member__attributes, "f") | (0b1 << 0),
        "f",
      );
    if (data.avatar && data.avatar.startsWith("a_") == true)
      __classPrivateFieldSet(
        this,
        _Member__attributes,
        __classPrivateFieldGet(this, _Member__attributes, "f") | (0b1 << 1),
        "f",
      );
    /**
     * The hash of the member's avatar.
     * @type {BigInt?}
     * @private
     */
    if (data.avatar !== undefined)
      __classPrivateFieldSet(
        this,
        _Member__avatar,
        data.avatar ? BigInt(`0x${data.avatar.replace("a_", "")}`) : null,
        "f",
      );
    else if (
      data.avatar === undefined &&
      existing &&
      existing._originalAvatarHash
    )
      __classPrivateFieldSet(
        this,
        _Member__avatar,
        existing._originalAvatarHash
          ? BigInt(`0x${existing._originalAvatarHash.replace("a_", "")}`)
          : null,
        "f",
      );
    /**
     * The roles for this member.
     * @type {Array<BigInt>?}
     * @private
     */
    if (
      data.roles &&
      this.guild &&
      Role.shouldCache(
        __classPrivateFieldGet(this, _Member__client, "f")._cacheOptions,
        this.guild._cacheOptions,
      )
    ) {
      __classPrivateFieldSet(this, _Member__roles, [], "f");
      for (let i = 0; i < data.roles.length; i++)
        if (data.roles[i] != guildId)
          __classPrivateFieldGet(this, _Member__roles, "f").push(
            BigInt(data.roles[i]),
          );
    }
    const memberIsClient =
      this.id === __classPrivateFieldGet(this, _Member__client, "f").user.id;
    const shouldCache = Member.shouldCache(
      __classPrivateFieldGet(this, _Member__client, "f")._cacheOptions,
      this.guild._cacheOptions,
    );
    if (memberIsClient || (nocache === false && shouldCache)) {
      this.guild.members.set(userId, this);
      __classPrivateFieldGet(this, _Member__client, "f")._emitDebug(
        GluonDebugLevels.Info,
        `CACHE MEMBER ${guildId} ${userId}`,
      );
    } else {
      __classPrivateFieldGet(this, _Member__client, "f")._emitDebug(
        GluonDebugLevels.Info,
        `NO CACHE MEMBER ${guildId} ${userId} (${memberIsClient} ${nocache} ${shouldCache})`,
      );
    }
  }
  /**
   * The id of the member.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _Member__id, "f"));
  }
  /**
   * The id of the guild that this member belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _Member__guild_id, "f"));
  }
  /**
   * The guild that this member belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return (
      __classPrivateFieldGet(this, _Member__client, "f").guilds.get(
        this.guildId,
      ) || null
    );
  }
  /**
   * The nickname of the member.
   * @type {String?}
   * @readonly
   * @public
   */
  get nick() {
    return __classPrivateFieldGet(this, _Member_nick, "f") ?? null;
  }
  /**
   * The UNIX timestamp for when this member joined the guild.
   * @type {Number?}
   * @readonly
   * @public
   */
  get joinedAt() {
    return __classPrivateFieldGet(this, _Member_joined_at, "f");
  }
  /**
   * The UNIX timestamp for when this member's timeout expires, if applicable.
   * @type {Number?}
   * @readonly
   * @public
   */
  get timeoutUntil() {
    return (
      __classPrivateFieldGet(this, _Member_communication_disabled_until, "f") ??
      null
    );
  }
  /**
   * The flags for this user.
   * @type {Number}
   * @readonly
   * @public
   */
  get flags() {
    return __classPrivateFieldGet(this, _Member_flags, "f");
  }
  /**
   * The member's roles.
   * @readonly
   * @type {Array<Role> | null}
   * @public
   */
  get roles() {
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${this.guildId} cannot be found in cache`);
    }
    if (
      Role.shouldCache(
        __classPrivateFieldGet(this, _Member__client, "f")._cacheOptions,
        this.guild._cacheOptions,
      ) === false
    )
      return null;
    const roles = [];
    const everyoneRole = this.guild.roles.get(this.guildId);
    if (everyoneRole) roles.push(everyoneRole);
    if (!__classPrivateFieldGet(this, _Member__roles, "f")) return roles;
    for (
      let i = 0;
      i < __classPrivateFieldGet(this, _Member__roles, "f").length;
      i++
    ) {
      const role = this.guild.roles.get(
        __classPrivateFieldGet(this, _Member__roles, "f")[i].toString(),
      );
      if (role) roles.push(role);
    }
    return roles;
  }
  /**
   * The position of the member's highest role.
   * @readonly
   * @type {Number}
   * @public
   */
  get highestRolePosition() {
    let highestPosition = 0;
    const roles = this.roles;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    for (let i = 0; i < roles.length; i++)
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      if (roles[i].position > highestPosition)
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        highestPosition = roles[i].position;
    return highestPosition;
  }
  /**
   * The overall calculated permissions for this member.
   * @readonly
   * @type {String?}
   * @public
   */
  get permissions() {
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${this.guildId} cannot be found in cache`);
    }
    if (this.id == this.guild.ownerId) return PERMISSIONS.ADMINISTRATOR;
    if (!this.roles) {
      return null;
    }
    return checkMemberPermissions(this.roles);
  }
  /**
   * Whether the member has joined the guild before.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get rejoined() {
    return (
      (__classPrivateFieldGet(this, _Member_flags, "f") &
        GuildMemberFlags.DidRejoin) ==
      GuildMemberFlags.DidRejoin
    );
  }
  /**
   * The user object for this member.
   * @type {User}
   * @readonly
   * @public
   */
  get user() {
    return __classPrivateFieldGet(this, _Member_user, "f") ?? undefined;
  }
  /**
   * The hash of the member's avatar, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalAvatarHash() {
    return __classPrivateFieldGet(this, _Member__avatar, "f")
      ? // eslint-disable-next-line quotes
        `${this.avatarIsAnimated ? "a_" : ""}${__classPrivateFieldGet(this, _Member_instances, "a", _Member__formattedAvatarHash_get)}`
      : null;
  }
  /**
   * The url of the member's avatar.
   * @readonly
   * @type {String}
   * @public
   */
  get displayAvatarURL() {
    if (!this.user) {
      throw new Error(
        `GLUON: User ${__classPrivateFieldGet(this, _Member__id, "f")} cannot be found in cache`,
      );
    }
    return (
      Member.getAvatarUrl(this.id, this.guildId, this._originalAvatarHash) ??
      this.user.displayAvatarURL
    );
  }
  /**
   * The url of the member's avatar without falling back to the user's avatar.
   * @readonly
   * @type {String}
   * @public
   */
  get displayAvatarURLNoFallback() {
    return Member.getAvatarUrl(this.id, this.guildId, this._originalAvatarHash);
  }
  /**
   * Whether the user has not yet passed the guild's membership screening requirements.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get pending() {
    return (
      (__classPrivateFieldGet(this, _Member__attributes, "f") & (0b1 << 0)) ==
      0b1 << 0
    );
  }
  /**
   * Whether the user has an animated avatar or not.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get avatarIsAnimated() {
    return (
      (__classPrivateFieldGet(this, _Member__attributes, "f") & (0b1 << 1)) ==
      0b1 << 1
    );
  }
  /**
   * The mention string for the member.
   * @type {String}
   * @readonly
   * @public
   */
  get mention() {
    return Member.getMention(this.id);
  }
  /**
   * The hash name for the member.
   * @type {String}
   * @readonly
   * @public
   */
  get hashName() {
    return Member.getHashName(this.guildId, this.id);
  }
  /**
   * Returns the mention string for the member.
   * @param {String} userId The id of the user to mention.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(userId) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");
    return `<@${userId}>`;
  }
  /**
   * Returns the avatar url for the member.
   * @param {String} id The id of the user.
   * @param {String} guild_id The id of the guild the user belongs to.
   * @param {String?} [hash] The avatar hash of the user.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getAvatarUrl(id, guildId, hash) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Member id must be a string.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild id must be a string.");
    if (hash && typeof hash !== "string")
      throw new TypeError("GLUON: Member avatar hash must be a string.");
    return hash
      ? `${CDN_BASE_URL}/guilds/${guildId}/users/${id}/avatars/${hash}.${hash.startsWith("a_") ? "gif" : "png"}`
      : null;
  }
  /**
   * Adds a role to the member.
   * @param {String} role_id The id of the role to add to the member.
   * @param {Object?} [options] The options for adding the role to the member.
   * @param {String?} [options.reason] The reason for adding the role to the member.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async addRole(role_id, { reason } = {}) {
    await Member.addRole(
      __classPrivateFieldGet(this, _Member__client, "f"),
      this.guildId,
      this.id,
      role_id,
      {
        reason,
      },
    );
  }
  /**
   * Removes a role from the member.
   * @param {String} role_id The id of the role to remove from the member.
   * @param {Object?} [options] The options for removing the role from the member.
   * @param {String?} [options.reason] The reason for removing the role from the member.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async removeRole(role_id, { reason } = {}) {
    await Member.removeRole(
      __classPrivateFieldGet(this, _Member__client, "f"),
      this.guildId,
      this.id,
      role_id,
      {
        reason,
      },
    );
  }
  /**
   * Adds a timeout to the member.
   * @param {Number} timeout_until The UNIX timestamp for when the member's timeout should end.
   * @param {Object?} [options] The options for timing out the member.
   * @param {String?} [options.reason] The reason for timing out the member.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async timeoutAdd(timeout_until, { reason } = {}) {
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${this.guildId} cannot be found in cache`);
    }
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.MODERATE_MEMBERS,
      )
    )
      throw new Error("MISSING PERMISSIONS: MODERATE_MEMBERS");
    if (typeof timeout_until !== "number")
      throw new TypeError("GLUON: Timeout until must be a UNIX timestamp.");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason must be a string.");
    const body = {};
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    // @ts-expect-error TS(2339): Property 'communication_disabled_until' does not e... Remove this comment to see the full error message
    body.communication_disabled_until = new Date(
      timeout_until * 1000,
    ).toISOString();
    await __classPrivateFieldGet(
      this,
      _Member__client,
      "f",
    ).request.makeRequest("patchGuildMember", [this.guildId, this.id], body);
  }
  /**
   * Removes a timeout from the member.
   * @param {Object?} [options] The options for untiming out the member.
   * @param {String?} [options.reason] The reason for removing the time out from the member.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async timeoutRemove({ reason } = {}) {
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${this.guildId} cannot be found in cache`);
    }
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.MODERATE_MEMBERS,
      )
    )
      throw new Error("MISSING PERMISSIONS: MODERATE_MEMBERS");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason must be a string.");
    const body = {};
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    // @ts-expect-error TS(2339): Property 'communication_disabled_until' does not e... Remove this comment to see the full error message
    body.communication_disabled_until = null;
    await __classPrivateFieldGet(
      this,
      _Member__client,
      "f",
    ).request.makeRequest("patchGuildMember", [this.guildId, this.id], body);
  }
  /**
   * Updates the member's roles.
   * @param {Array<String>} roles An array of role ids for the roles the member should be updated with.
   * @param {Object?} [options] The options for updating the member's roles.
   * @param {String?} [options.reason] The reason for updating the member's roles.
   * @returns {Promise<void>}
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async massUpdateRoles(roles, { reason } = {}) {
    if (!this.guild) {
      throw new Error(`GLUON: Guild ${this.guildId} cannot be found in cache`);
    }
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.MANAGE_ROLES,
      )
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_ROLES");
    if (
      !Array.isArray(roles) ||
      !roles.every((role) => typeof role === "string")
    )
      throw new TypeError("GLUON: Roles must be an array of role ids.");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason must be a string.");
    const body = {};
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    // @ts-expect-error TS(2339): Property 'roles' does not exist on type '{}'.
    body.roles = roles.map((role) => role.toString());
    await __classPrivateFieldGet(
      this,
      _Member__client,
      "f",
    ).request.makeRequest("patchGuildMember", [this.guildId, this.id], body);
  }
  /**
   * Determines whether the member should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions, guildCacheOptions) {
    if (!(gluonCacheOptions instanceof GluonCacheOptions))
      throw new TypeError(
        "GLUON: Gluon cache options must be a GluonCacheOptions.",
      );
    if (!(guildCacheOptions instanceof GuildCacheOptions))
      throw new TypeError(
        "GLUON: Guild cache options must be a GuildCacheOptions.",
      );
    if (gluonCacheOptions.cacheMembers === false) return false;
    if (guildCacheOptions.memberCaching === false) return false;
    return true;
  }
  /**
   * Returns the hash name for the message.
   * @param {String} guildId The id of the guild that the message belongs to.
   * @param {String} memberId The id of the member.
   * @returns {String}
   */
  static getHashName(guildId, memberId) {
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof memberId !== "string")
      throw new TypeError("GLUON: Member ID must be a string.");
    return structureHashName(guildId, memberId);
  }
  /**
   * Decrypts a member.
   * @param {Client} client The client instance.
   * @param {String} data The encrypted message data.
   * @param {String} guildId The id of the guild that the message belongs to.
   * @param {String} userId The id of the member.
   * @returns {Member}
   */
  static decrypt(client, data, guildId, userId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "string")
      throw new TypeError("GLUON: Data must be a string.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");
    return new Member(client, decryptStructure(data, userId, guildId), {
      userId: userId,
      guildId: guildId,
    });
  }
  /**
   * Adds a role to a member.
   * @param {Client} client The client instance.
   * @param {String} guildId The guild id the member belongs to.
   * @param {String} userId The id of the member who the action is occuring on.
   * @param {String} roleId The id of the role to add.
   * @param {Object} [options] The options for adding the role.
   * @param {String?} [options.reason] The reason for adding the role.
   * @returns {Promise<void>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  static async addRole(client, guildId, userId, roleId, { reason } = {}) {
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID is not a string.");
    if (typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID is not a string.");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason is not a string.");
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error(`GLUON: Guild ${guildId} cannot be found in cache`);
    }
    if (
      !checkPermission((await guild.me()).permissions, PERMISSIONS.MANAGE_ROLES)
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_ROLES");
    const body = {};
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    await client.request.makeRequest(
      "putAddGuildMemberRole",
      [guildId, userId, roleId],
      body,
    );
  }
  /**
   * Removes a role from a member.
   * @param {Client} client The client instance.
   * @param {String} guildId The guild id the member belongs to.
   * @param {String} userId The id of the member who the action is occuring on.
   * @param {String} roleId The id of the role to remove.
   * @param {Object} [options] The options for removing the role.
   * @param {String?} [options.reason] The reason for removing the role.
   * @returns {Promise<void>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  static async removeRole(client, guildId, userId, roleId, { reason } = {}) {
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID is not a string.");
    if (typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID is not a string.");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason is not a string.");
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error(`GLUON: Guild ${guildId} cannot be found in cache`);
    }
    if (
      !checkPermission((await guild.me()).permissions, PERMISSIONS.MANAGE_ROLES)
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_ROLES");
    const body = {};
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    await client.request.makeRequest(
      "deleteRemoveMemberRole",
      [guildId, userId, roleId],
      body,
    );
  }
  /**
   * Encrypts the member.
   * @returns {String}
   * @public
   * @method
   */
  encrypt() {
    return encryptStructure(this, this.id, this.guildId);
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<Member: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_Member__client = new WeakMap()),
  (_Member__guild_id = new WeakMap()),
  (_Member__id = new WeakMap()),
  (_Member_nick = new WeakMap()),
  (_Member_joined_at = new WeakMap()),
  (_Member_communication_disabled_until = new WeakMap()),
  (_Member_flags = new WeakMap()),
  (_Member__attributes = new WeakMap()),
  (_Member__avatar = new WeakMap()),
  (_Member__roles = new WeakMap()),
  (_Member_user = new WeakMap()),
  (_Member_instances = new WeakSet()),
  (_Member__formattedAvatarHash_get =
    function _Member__formattedAvatarHash_get() {
      if (!__classPrivateFieldGet(this, _Member__avatar, "f")) return null;
      let formattedHash = __classPrivateFieldGet(
        this,
        _Member__avatar,
        "f",
      ).toString(16);
      while (formattedHash.length != 32)
        // eslint-disable-next-line quotes
        formattedHash = `0${formattedHash}`;
      return formattedHash;
    }),
  util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          user: this.user?.toJSON(format),
          nick: this.nick,
          joined_at: this.joinedAt ? this.joinedAt * 1000 : undefined,
          avatar: this._originalAvatarHash,
          permissions: String(this.permissions),
          roles: Array.isArray(
            __classPrivateFieldGet(this, _Member__roles, "f"),
          )
            ? __classPrivateFieldGet(this, _Member__roles, "f")
                .filter((r) => String(r) !== this.guildId)
                .map((r) => String(r))
            : undefined,
          communication_disabled_until: this.timeoutUntil
            ? this.timeoutUntil * 1000
            : undefined,
          flags: this.flags,
          _attributes: __classPrivateFieldGet(this, _Member__attributes, "f"),
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          user: this.user?.toJSON(format),
          nick: this.nick,
          joined_at: this.joinedAt
            ? new Date(this.joinedAt * 1000).toISOString()
            : undefined,
          avatar: this._originalAvatarHash,
          permissions: String(this.permissions),
          roles: Array.isArray(
            __classPrivateFieldGet(this, _Member__roles, "f"),
          )
            ? __classPrivateFieldGet(this, _Member__roles, "f")
                .filter((r) => String(r) !== this.guildId)
                .map((r) => String(r))
            : undefined,
          communication_disabled_until: this.timeoutUntil
            ? this.timeoutUntil * 1000
            : undefined,
          flags: this.flags,
          pending: this.pending,
        };
      }
    }
  }
}
export default Member;
//# sourceMappingURL=Member.js.map
