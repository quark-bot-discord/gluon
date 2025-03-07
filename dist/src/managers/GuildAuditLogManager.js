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
var _GuildAuditLogManager__client, _GuildAuditLogManager_guild;
import BaseCacheManager from "./BaseCacheManager.js";
import { checkPermission } from "#src/util.js";
import { PERMISSIONS } from "#src/constants.js";
import { AuditLog } from "#src/structures.js";
class GuildAuditLogManager extends BaseCacheManager {
  constructor(client, guild) {
    super(client, { structureType: GuildAuditLogManager });
    _GuildAuditLogManager__client.set(this, void 0);
    _GuildAuditLogManager_guild.set(this, void 0);
    __classPrivateFieldSet(this, _GuildAuditLogManager__client, client, "f");
    __classPrivateFieldSet(this, _GuildAuditLogManager_guild, guild, "f");
  }
  async fetch({ limit, type, user_id, before, after } = {}) {
    if (
      !checkPermission(
        (
          await __classPrivateFieldGet(
            this,
            _GuildAuditLogManager_guild,
            "f",
          ).me()
        ).permissions,
        PERMISSIONS.VIEW_AUDIT_LOG,
      )
    )
      throw new Error("MISSING PERMISSIONS: VIEW_AUDIT_LOG");
    if (typeof limit !== "undefined" && typeof limit !== "number")
      throw new TypeError("GLUON: INVALID_TYPE: limit");
    if (typeof limit === "number" && (limit < 1 || limit > 100))
      throw new RangeError("GLUON: VALUE_OUT_OF_RANGE: limit");
    if (typeof type !== "undefined" && typeof type !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: type");
    if (typeof user_id !== "undefined" && typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");
    if (typeof before !== "undefined" && typeof before !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: before");
    if (typeof after !== "undefined" && typeof after !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: after");
    const body = {};
    // @ts-expect-error TS(2339): Property 'limit' does not exist on type '{}'.
    if (limit) body.limit = limit;
    // @ts-expect-error TS(2339): Property 'limit' does not exist on type '{}'.
    else body.limit = 1;
    // @ts-expect-error TS(2339): Property 'action_type' does not exist on type '{}'... Remove this comment to see the full error message
    if (type) body.action_type = type;
    // @ts-expect-error TS(2339): Property 'user_id' does not exist on type '{}'.
    if (user_id) body.user_id = user_id;
    // @ts-expect-error TS(2339): Property 'before' does not exist on type '{}'.
    if (before) body.before = before;
    // @ts-expect-error TS(2339): Property 'after' does not exist on type '{}'.
    if (after) body.after = after;
    const data = await __classPrivateFieldGet(
      this,
      _GuildAuditLogManager__client,
      "f",
    ).request.makeRequest(
      "getGuildAuditLog",
      [__classPrivateFieldGet(this, _GuildAuditLogManager_guild, "f").id],
      body,
    );
    if (
      type &&
      data &&
      data.audit_log_entries[0] &&
      data.audit_log_entries[0].action_type != type
    )
      return null;
    if (!data || data.audit_log_entries.length == 0) return null;
    return data.audit_log_entries.map(
      (e) =>
        new AuditLog(
          __classPrivateFieldGet(this, _GuildAuditLogManager__client, "f"),
          e,
          {
            users: data.users,
            guildId: __classPrivateFieldGet(
              this,
              _GuildAuditLogManager_guild,
              "f",
            ).id,
          },
        ),
    );
  }
  search({ limit, type, user_id, before, after } = {}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const logs = this.map(([_, log]) => log).sort((a, b) =>
      Number(BigInt(b.id) - BigInt(a.id)),
    );
    if (type) logs.filter((log) => log.actionType === type);
    if (user_id)
      logs.filter(
        (log) => log.targetId === user_id || log.executorId === user_id,
      );
    if (before) logs.filter((log) => BigInt(log.id) < BigInt(before));
    if (after) logs.filter((log) => BigInt(log.id) > BigInt(after));
    if (limit && limit > 0) logs.slice(0, limit - 1);
    return logs;
  }
  set(key, value, expiry = 5 * 60) {
    return super.set(key, value, expiry);
  }
}
(_GuildAuditLogManager__client = new WeakMap()),
  (_GuildAuditLogManager_guild = new WeakMap());
GuildAuditLogManager.identifier = "auditlogs";
export default GuildAuditLogManager;
//# sourceMappingURL=GuildAuditLogManager.js.map
