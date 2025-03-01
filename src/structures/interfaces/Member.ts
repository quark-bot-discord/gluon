import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ISO8601Timestamp,
  PermissionsBitfield,
  Snowflake,
  UnixMillisecondsTimestamp,
  UnixTimestamp,
} from "src/interfaces/gluon.js";
import {
  UserCacheJSON,
  UserDiscordJSON,
  UserRaw,
  UserStorageJSON,
  UserType,
} from "./User.js";
import { GuildType } from "./Guild.js";
import { RoleType } from "./Role.js";

export interface MemberType {
  readonly id: Snowflake;
  readonly guildId: Snowflake;
  readonly guild: GuildType | null;
  readonly nick: string;
  readonly joinedAt?: UnixTimestamp;
  readonly timeoutUntil: UnixTimestamp | null;
  readonly flags: number;
  readonly roles: RoleType[] | null;
  readonly highestRolePosition: number;
  readonly permissions: PermissionsBitfield | null;
  readonly rejoined: boolean;
  readonly user: UserType;
  readonly _originalAvatarHash: string | null;
  readonly displayAvatarURL: string | null;
  readonly displayAvatarURLNoFallback: string | null;
  readonly pending: boolean;
  readonly avatarIsAnimated: boolean;
  readonly mention: string;
  readonly hashName: string;
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
  addRole(roleId: Snowflake, { reason }: { reason?: string }): Promise<void>;
  removeRole(roleId: Snowflake, { reason }: { reason?: string }): Promise<void>;
  encrypt(): string;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): MemberStorageJSON | MemberCacheJSON | MemberDiscordJSON;
}

export interface MemberStorageJSON {
  user: UserStorageJSON;
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
  user: UserCacheJSON;
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
  user: UserDiscordJSON;
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
  user?: UserRaw;
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
