import BaseCacheManager from "./BaseCacheManager.js";
import type {
  GuildAuditLogManager as GuildAuditLogManagerType,
  Client as ClientType,
  Guild as GuildType,
  AuditLog as AuditLogType,
  StructureIdentifiers,
  AuditLogCacheJSON,
  AuditLogStorageJSON,
  AuditLogDiscordJSON,
} from "#typings/index.d.ts";
import { APIAuditLog, AuditLogEvent, Snowflake } from "#typings/discord.js";
import { checkPermission } from "#src/util.js";
import { PERMISSIONS } from "#src/constants.js";
import { AuditLog } from "#src/structures.js";
import { GluonPermissionsError } from "#typings/errors.js";

class GuildAuditLogManager
  extends BaseCacheManager<
    AuditLogType,
    AuditLogCacheJSON | AuditLogStorageJSON | AuditLogDiscordJSON
  >
  implements GuildAuditLogManagerType
{
  #_client;
  #guild;
  static identifier = "auditlogs" as StructureIdentifiers;
  constructor(client: ClientType, guild: GuildType) {
    super(client, guild.id, { structureType: GuildAuditLogManager });
    this.#_client = client;
    this.#guild = guild;
  }

  async fetch({
    limit,
    type,
    user_id,
    before,
    after,
  }: {
    limit?: number;
    type?: AuditLogEvent;
    user_id?: Snowflake;
    before?: Snowflake;
    after?: Snowflake;
  } = {}) {
    if (
      !checkPermission(
        (await this.#guild.me()).permissions,
        PERMISSIONS.VIEW_AUDIT_LOG,
      )
    ) {
      throw new GluonPermissionsError("ViewAuditLog");
    }

    if (typeof limit !== "undefined" && typeof limit !== "number")
      throw new TypeError("GLUON: INVALID_TYPE: limit");

    if (typeof limit === "number" && (limit < 1 || limit > 100))
      throw new RangeError("GLUON: VALUE_OUT_OF_RANGE: limit");

    if (typeof type !== "undefined" && typeof type !== "number")
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

    const data = (await this.#_client.request.makeRequest(
      "getGuildAuditLog",
      [this.#guild.id],
      body,
    )) as APIAuditLog;

    if (
      type &&
      data &&
      data.audit_log_entries[0] &&
      data.audit_log_entries[0].action_type != type
    )
      return [];

    if (!data || data.audit_log_entries.length == 0) return [];

    return data.audit_log_entries.map(
      (e) =>
        new AuditLog(this.#_client, e, {
          users: data.users,
          guildId: this.#guild.id,
        }),
    );
  }

  async search({
    limit,
    type,
    user_id,
    before,
    after,
  }: {
    limit?: number;
    type?: AuditLogEvent;
    user_id?: Snowflake;
    before?: Snowflake;
    after?: Snowflake;
  } = {}) {
    const cachedAuditLogs: AuditLogStorageJSON[] = [];

    await this.forEach((log) => {
      cachedAuditLogs.push(log);
    });

    return cachedAuditLogs
      .map(
        (log) =>
          new AuditLog(this.#_client, log, {
            guildId: this.#guild.id,
            nocache: true,
          }),
      )
      .sort((a, b) => Number(BigInt(b.id) - BigInt(a.id)))
      .filter((log) => {
        if (typeof type === "number" && log.actionType !== type) return false;
        if (user_id && log.targetId !== user_id && log.executorId !== user_id)
          return false;
        if (before && BigInt(log.id) >= BigInt(before)) return false;
        if (after && BigInt(log.id) <= BigInt(after)) return false;
        return true;
      })
      .slice(0, limit);
  }
}

export default GuildAuditLogManager;
