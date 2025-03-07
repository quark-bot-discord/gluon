import BaseCacheManager from "./BaseCacheManager.js";
import type {
  GuildAuditLogManager as GuildAuditLogManagerType,
  Client as ClientType,
  Guild as GuildType,
  AuditLog as AuditLogType,
  StructureIdentifiers,
} from "#typings/index.d.ts";
import { AuditLogEvent, Snowflake } from "#typings/discord.js";
import { AuditLog } from "#src/structures.js";
declare class GuildAuditLogManager
  extends BaseCacheManager<AuditLogType>
  implements GuildAuditLogManagerType
{
  #private;
  static identifier: StructureIdentifiers;
  constructor(client: ClientType, guild: GuildType);
  fetch({
    limit,
    type,
    user_id,
    before,
    after,
  }?: {
    limit?: number;
    type?: AuditLogEvent;
    user_id?: Snowflake;
    before?: Snowflake;
    after?: Snowflake;
  }): Promise<AuditLog[] | null>;
  search({
    limit,
    type,
    user_id,
    before,
    after,
  }?: {
    limit?: number;
    type?: AuditLogEvent;
    user_id?: Snowflake;
    before?: Snowflake;
    after?: Snowflake;
  }): AuditLogType[];
  set(key: Snowflake, value: AuditLogType, expiry?: number): void;
}
export default GuildAuditLogManager;
