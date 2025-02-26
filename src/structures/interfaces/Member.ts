import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import ClientType from "src/interfaces/Client.js";
import {
  ISO8601Timestamp,
  PermissionsBitfield,
  Snowflake,
  UnixMillisecondsTimestamp,
  UnixTimestamp,
} from "src/interfaces/gluon.js";

export interface MemberType {
  readonly id: Snowflake;
  readonly guildId: Snowflake;
  readonly guild: any;
  readonly nick: string;
  readonly joinedAt?: UnixTimestamp;
  readonly timeoutUntil?: UnixTimestamp;
  readonly flags: number;
  readonly roles: any[];
  readonly highestRolePosition: number;
  readonly permissions: PermissionsBitfield;
  readonly rejoined: boolean;
  readonly user: any;
  readonly _originalAvatarHash: string;
  readonly displayAvatarURL: string;
  readonly displayAvatarURLNoFallback: string;
  readonly pending: boolean;
  readonly avatarIsAnimated: boolean;
  readonly mention: string;
  readonly hashName: string;
  getMention(userId: Snowflake): string;
  getAvatarUrl(id: Snowflake, guildId: Snowflake, hash?: string | null): string;
  addRole(role_id: Snowflake, { reason }: { reason?: string }): Promise<void>;
  removeRole(
    role_id: Snowflake,
    { reason }: { reason?: string },
  ): Promise<void>;
  timeoutAdd(
    timeout_until: UnixTimestamp,
    { reason }: { reason?: string },
  ): Promise<void>;
  timeoutRemove({ reason }: { reason?: string }): Promise<void>;
  massUpdateRoles(
    roles: string[],
    { reason }: { reason?: string },
  ): Promise<void>;
  shouldCache(gluonCacheOptions: any, guildCacheOptions: any): boolean;
  getHashName(guildId: Snowflake, memberId: Snowflake): string;
  decrypt(
    client: ClientType,
    data: string,
    guildId: Snowflake,
    userId: Snowflake,
  ): MemberType;
  addRole(
    client: ClientType,
    guildId: Snowflake,
    userId: Snowflake,
    roleId: Snowflake,
    { reason }: { reason?: string },
  ): Promise<void>;
  removeRole(
    client: ClientType,
    guildId: Snowflake,
    userId: Snowflake,
    roleId: Snowflake,
    { reason }: { reason?: string },
  ): Promise<void>;
  encrypt(): string;
  toString(): string;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ): MemberStorageJSON | MemberCacheJSON | MemberDiscordJSON;
}

export interface MemberStorageJSON {
  user: any;
  nick: string | null;
  joined_at?: UnixMillisecondsTimestamp;
  avatar: string | null;
  permissions: PermissionsBitfield;
  roles?: Snowflake[];
  communication_disabled_until?: UnixMillisecondsTimestamp;
  flags: number;
  _attributes: number;
}

export interface MemberCacheJSON {
  user: any;
  nick: string | null;
  joined_at?: UnixMillisecondsTimestamp;
  avatar: string | null;
  permissions: PermissionsBitfield;
  roles?: Snowflake[];
  communication_disabled_until?: UnixMillisecondsTimestamp;
  flags: number;
  _attributes: number;
}

export interface MemberDiscordJSON {
  user: any;
  nick: string | null;
  joined_at?: ISO8601Timestamp;
  avatar: string | null;
  permissions: PermissionsBitfield;
  roles?: Snowflake[];
  communication_disabled_until?: UnixMillisecondsTimestamp;
  flags: number;
  pending: boolean;
}

export interface MemberRaw {
  user?: any;
  nick?: string;
  avatar?: string;
  roles: Snowflake[];
  joined_at?: ISO8601Timestamp;
  premium_since?: ISO8601Timestamp | null;
  deaf: boolean;
  mute: boolean;
  flags: number;
  pending?: boolean;
  permissions?: PermissionsBitfield;
  communication_disabled_until?: ISO8601Timestamp | null;
  avatar_decoration_data?: UserAvatarDecorationData | null;
}

export interface UserAvatarDecorationData {
  asset: string;
  sku_id: string;
}
