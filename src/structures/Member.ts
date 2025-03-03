import {
  PERMISSIONS,
  MEMBER_FLAGS,
  CDN_BASE_URL,
  GLUON_DEBUG_LEVELS,
} from "../constants.js";
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
import GuildManager from "../managers/GuildManager.js";
import ClientType from "src/interfaces/Client.js";
import { Snowflake, UnixTimestamp } from "src/interfaces/gluon.js";
import {
  Member as MemberType,
  MemberCacheJSON,
  MemberDiscordJSON,
  MemberStorageJSON,
  JsonTypes,
  User as UserType,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
} from "../../typings/index.d.js";
import {
  APIGuildMember,
  APIInteractionDataResolvedGuildMember,
} from "discord-api-types/v10";

/**
 * Represents a guild member.
 * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure}
 */
class Member implements MemberType {
  #_client;
  #_guild_id;
  #_id;
  #nick;
  #joined_at;
  #communication_disabled_until;
  #flags;
  #_attributes;
  #_avatar;
  #_roles;
  #user;
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
  constructor(
    client: ClientType,
    data:
      | APIGuildMember
      | APIInteractionDataResolvedGuildMember
      | MemberStorageJSON
      | MemberCacheJSON
      | MemberDiscordJSON,
    {
      userId,
      guildId,
      user,
      nocache = false,
    }: {
      userId: Snowflake;
      guildId: Snowflake;
      user?: UserType;
      nocache?: boolean;
    },
  ) {
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
    this.#_client = client;

    /**
     * The id of the guild that this member belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guildId);

    const existing = this.guild?.members.get(userId) || null;

    /**
     * The id of the member.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(userId);

    if ("user" in data && data.user)
      /**
       * The user object for this member.
       * @type {User?}
       * @private
       */
      this.#user = new User(this.#_client, data.user, { nocache });
    else if (existing?.user) this.#user = existing.user;
    else if (user) this.#user = user;
    else this.#user = this.#_client.users.get(userId) || null;

    if (data.nick !== undefined)
      /**
       * The nickname of this member.
       * @type {String?}
       * @private
       */
      this.#nick = data.nick;
    else if (data.nick !== null && existing && existing.nick != undefined)
      this.#nick = existing.nick;

    if (data.joined_at)
      /**
       * The UNIX timestamp for when this member joined the guild.
       * @type {Number?}
       * @private
       */
      this.#joined_at = (new Date(data.joined_at).getTime() / 1000) | 0;
    else if (existing?.joinedAt) this.#joined_at = existing.joinedAt;

    /**
     * The UNIX timestamp for when this member's timeout expires, if applicable.
     * @type {Number?}
     * @private
     */
    this.#communication_disabled_until = data.communication_disabled_until
      ? (new Date(data.communication_disabled_until).getTime() / 1000) | 0
      : null;

    if (typeof data.flags == "number")
      /**
       * The flags for this user.
       * @type {Number}
       * @private
       * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags}
       */
      this.#flags = data.flags;
    else if (existing && typeof existing.flags == "number")
      this.#flags = existing.flags;
    else this.#flags = 0;

    /**
     * The attributes for this member.
     * @type {Number}
     * @private
     */
    this.#_attributes = "_attributes" in data ? data._attributes : 0;

    if ("pending" in data && data.pending !== undefined && data.pending == true)
      this.#_attributes |= 0b1 << 0;
    else if (
      "pending" in data &&
      data.pending === undefined &&
      existing &&
      existing.pending == true
    )
      this.#_attributes |= 0b1 << 0;

    if (data.avatar && data.avatar.startsWith("a_") == true)
      this.#_attributes |= 0b1 << 1;

    /**
     * The hash of the member's avatar.
     * @type {BigInt?}
     * @private
     */
    if (data.avatar !== undefined)
      this.#_avatar = data.avatar
        ? BigInt(`0x${data.avatar.replace("a_", "")}`)
        : null;
    else if (data.avatar === undefined && existing && existing._avatar)
      this.#_avatar = existing._avatar;

    /**
     * The roles for this member.
     * @type {Array<BigInt>?}
     * @private
     */
    if (
      data.roles &&
      this.guild &&
      Role.shouldCache(this.#_client._cacheOptions, this.guild._cacheOptions)
    ) {
      this.#_roles = [];
      for (let i = 0; i < data.roles.length; i++)
        if (data.roles[i] != guildId) this.#_roles.push(BigInt(data.roles[i]));
    }

    const memberIsClient = this.id === this.#_client.user.id;

    const shouldCache = Member.shouldCache(
      this.#_client._cacheOptions,
      this.guild._cacheOptions,
    );

    if (memberIsClient || (nocache === false && shouldCache)) {
      this.guild.members.set(userId, this);
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE MEMBER ${guildId} ${userId}`,
      );
    } else {
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
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
    return String(this.#_id);
  }

  /**
   * The id of the guild that this member belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The guild that this member belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The nickname of the member.
   * @type {String?}
   * @readonly
   * @public
   */
  get nick() {
    return this.#nick;
  }

  /**
   * The UNIX timestamp for when this member joined the guild.
   * @type {Number?}
   * @readonly
   * @public
   */
  get joinedAt() {
    return this.#joined_at;
  }

  /**
   * The UNIX timestamp for when this member's timeout expires, if applicable.
   * @type {Number?}
   * @readonly
   * @public
   */
  get timeoutUntil() {
    return this.#communication_disabled_until ?? null;
  }

  /**
   * The flags for this user.
   * @type {Number}
   * @readonly
   * @public
   */
  get flags() {
    return this.#flags;
  }

  /**
   * The member's roles.
   * @readonly
   * @type {Array<Role> | null}
   * @public
   */
  get roles() {
    if (
      Role.shouldCache(
        this.#_client._cacheOptions,
        this.guild._cacheOptions,
      ) === false
    )
      return null;

    const roles = [];

    const everyoneRole = this.guild.roles.get(this.guildId);
    if (everyoneRole) roles.push(everyoneRole);

    if (!this.#_roles) return roles;

    for (let i = 0; i < this.#_roles.length; i++) {
      const role = this.guild.roles.get(this.#_roles[i].toString());
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
    return (this.#flags & MEMBER_FLAGS.DID_REJOIN) == MEMBER_FLAGS.DID_REJOIN;
  }

  /**
   * The user object for this member.
   * @type {User}
   * @readonly
   * @public
   */
  get user() {
    return this.#user;
  }

  /**
   * The hash of the member's avatar, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalAvatarHash() {
    return this.#_avatar
      ? // eslint-disable-next-line quotes
        `${this.avatarIsAnimated ? "a_" : ""}${this.#_formattedAvatarHash}`
      : null;
  }

  /**
   * The hash of the member's avatar as a string.
   * @readonly
   * @type {String}
   * @private
   */
  get #_formattedAvatarHash() {
    if (!this.#_avatar) return null;

    let formattedHash = this.#_avatar.toString(16);

    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = `0${formattedHash}`;

    return formattedHash;
  }

  /**
   * The url of the member's avatar.
   * @readonly
   * @type {String}
   * @public
   */
  get displayAvatarURL() {
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
    return (this.#_attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * Whether the user has an animated avatar or not.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get avatarIsAnimated() {
    return (this.#_attributes & (0b1 << 1)) == 0b1 << 1;
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
  static getMention(userId: Snowflake) {
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
  static getAvatarUrl(id: Snowflake, guildId: Snowflake, hash?: string | null) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Member id must be a string.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild id must be a string.");
    if (hash && typeof hash !== "string")
      throw new TypeError("GLUON: Member avatar hash must be a string.");
    return hash
      ? `${CDN_BASE_URL}/guilds/${guildId}/users/${id}/avatars/${hash}.${
          hash.startsWith("a_") ? "gif" : "png"
        }`
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
  async addRole(role_id: Snowflake, { reason }: { reason?: string } = {}) {
    await Member.addRole(this.#_client, this.guildId, this.id, role_id, {
      reason,
    });
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
  async removeRole(role_id: Snowflake, { reason }: { reason?: string } = {}) {
    await Member.removeRole(this.#_client, this.guildId, this.id, role_id, {
      reason,
    });
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
  async timeoutAdd(
    timeout_until: UnixTimestamp,
    { reason }: { reason?: string } = {},
  ) {
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

    await this.#_client.request.makeRequest(
      "patchGuildMember",
      [this.guildId, this.id],
      body,
    );
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
  async timeoutRemove({ reason }: { reason?: string } = {}) {
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

    await this.#_client.request.makeRequest(
      "patchGuildMember",
      [this.guildId, this.id],
      body,
    );
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
  async massUpdateRoles(
    roles: Snowflake[],
    { reason }: { reason?: string } = {},
  ) {
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

    await this.#_client.request.makeRequest(
      "patchGuildMember",
      [this.guildId, this.id],
      body,
    );
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
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ) {
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
  static getHashName(guildId: Snowflake, memberId: Snowflake) {
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
  static decrypt(
    client: ClientType,
    data: string,
    guildId: Snowflake,
    userId: Snowflake,
  ) {
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
  static async addRole(
    client: ClientType,
    guildId: Snowflake,
    userId: Snowflake,
    roleId: Snowflake,
    { reason }: { reason?: string } = {},
  ) {
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID is not a string.");
    if (typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID is not a string.");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason is not a string.");

    if (
      !checkPermission(
        (await GuildManager.getGuild(client, guildId).me()).permissions,
        PERMISSIONS.MANAGE_ROLES,
      )
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
  static async removeRole(
    client: ClientType,
    guildId: Snowflake,
    userId: Snowflake,
    roleId: Snowflake,
    { reason }: { reason?: string } = {},
  ) {
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID is not a string.");
    if (typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID is not a string.");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason is not a string.");

    if (
      !checkPermission(
        (await GuildManager.getGuild(client, guildId).me()).permissions,
        PERMISSIONS.MANAGE_ROLES,
      )
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
  [util.inspect.custom]() {
    return this.toString();
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format: JsonTypes) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          user: this.user.toJSON(format),
          nick: this.nick,
          joined_at: this.joinedAt ? this.joinedAt * 1000 : undefined,
          avatar: this._originalAvatarHash,
          permissions: String(this.permissions),
          roles: Array.isArray(this.#_roles)
            ? this.#_roles
                .filter((r) => String(r) !== this.guildId)
                .map((r) => String(r))
            : undefined,
          communication_disabled_until: this.timeoutUntil
            ? this.timeoutUntil * 1000
            : undefined,
          flags: this.flags,
          _attributes: this.#_attributes,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          user: this.user.toJSON(format),
          nick: this.nick,
          joined_at: this.joinedAt
            ? new Date(this.joinedAt * 1000).toISOString()
            : undefined,
          avatar: this._originalAvatarHash,
          permissions: String(this.permissions),
          roles: Array.isArray(this.#_roles)
            ? this.#_roles
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
