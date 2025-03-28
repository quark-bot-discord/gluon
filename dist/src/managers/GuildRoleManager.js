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
var _GuildRoleManager__client, _GuildRoleManager_guild;
import Role from "#structures/Role.js";
import BaseCacheManager from "./BaseCacheManager.js";
import getGuild from "#src/util/gluon/getGuild.js";
/**
 * Manages all roles belonging to a guild.
 */
class GuildRoleManager extends BaseCacheManager {
  /**
   * Creates a role manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this role manager belongs to.
   */
  constructor(client, guild) {
    super(client, { structureType: GuildRoleManager });
    _GuildRoleManager__client.set(this, void 0);
    _GuildRoleManager_guild.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild)
      throw new TypeError("GLUON: Guild must be a valid guild instance.");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _GuildRoleManager__client, client, "f");
    /**
     * The guild that this role manager belongs to.
     * @type {Guild}
     * @private
     */
    __classPrivateFieldSet(this, _GuildRoleManager_guild, guild, "f");
  }
  fetchFromRules(key) {
    return super.fetchFromRules(key);
  }
  fetchWithRules(key) {
    return super.fetchWithRules(key);
  }
  async fetch(roleId) {
    if (typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID must be a string.");
    const cachedRole = this.get(roleId);
    if (cachedRole) return cachedRole;
    const data = await __classPrivateFieldGet(
      this,
      _GuildRoleManager__client,
      "f",
    ).request.makeRequest("getRoles", [
      __classPrivateFieldGet(this, _GuildRoleManager_guild, "f").id,
    ]);
    let matchedRole;
    for (let i = 0; i < data.length; i++) {
      const role = new Role(
        __classPrivateFieldGet(this, _GuildRoleManager__client, "f"),
        data[i],
        {
          guildId: __classPrivateFieldGet(this, _GuildRoleManager_guild, "f")
            .id,
        },
      );
      if (role.id == roleId) matchedRole = role;
    }
    if (!matchedRole) {
      throw new Error(`GLUON: Role ${roleId} not found.`);
    }
    return matchedRole;
  }
  set(id, role) {
    if (!(role instanceof Role))
      throw new TypeError("GLUON: Role must be an instance of Role.");
    return super.set(id, role);
  }
  get(id) {
    return super.get(id);
  }
  static getRole(client, guildId, roleId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID is not a string.");
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error(`GLUON: Guild ${guildId} not found in cache.`);
    }
    return guild.roles.get(roleId);
  }
  static getCacheManager(client, guildId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    const guild = getGuild(client, guildId);
    if (!guild) {
      throw new Error(`GLUON: Guild ${guildId} not found in cache.`);
    }
    return guild.roles;
  }
  static async fetchRole(client, guildId, roleId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof roleId !== "undefined" && typeof roleId !== "string")
      throw new TypeError("GLUON: Role ID is not a string.");
    if (roleId) {
      const cachedRole = GuildRoleManager.getRole(client, guildId, roleId);
      if (cachedRole) return cachedRole;
    } else {
      const cachedRoles = GuildRoleManager.getCacheManager(
        client,
        guildId,
      ).toJSON();
      if (cachedRoles && cachedRoles.length !== 0)
        return cachedRoles.map((role) => new Role(client, role, { guildId }));
    }
    const data = await client.request.makeRequest("getRoles", [guildId]);
    if (!roleId) return data.map((role) => new Role(client, role, { guildId }));
    let matchedRole;
    for (let i = 0; i < data.length; i++) {
      const role = new Role(client, data[i], { guildId });
      if (role.id === roleId) matchedRole = role;
    }
    if (!matchedRole) {
      throw new Error(`GLUON: Role ${roleId} not found.`);
    }
    return matchedRole;
  }
}
(_GuildRoleManager__client = new WeakMap()),
  (_GuildRoleManager_guild = new WeakMap());
GuildRoleManager.identifier = "roles";
export default GuildRoleManager;
//# sourceMappingURL=GuildRoleManager.js.map
