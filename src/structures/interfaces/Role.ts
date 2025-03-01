import { PermissionsBitfield, Snowflake } from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import { TO_JSON_TYPES_ENUM } from "src/constants.js";

export interface RoleType {
  readonly id: Snowflake;
  readonly hoist: boolean;
  readonly managed: boolean;
  readonly mentionable: boolean;
  readonly _originalIconHash: string | null;
  readonly displayIconURL: string | null;
  readonly guild: GuildType | null;
  readonly guildId: Snowflake;
  readonly name: string;
  readonly color: number;
  readonly position: number;
  readonly permissions: PermissionsBitfield;
  readonly tags?: RoleRawTags;
  readonly mention: string;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): RoleStorageJSON | RoleCacheJSON | RoleDiscordJSON;
}

export interface RoleStorageJSON {
  id: Snowflake;
  name: string;
  color: number;
  position: number;
  permissions: PermissionsBitfield;
  icon: string | null;
  _attributes: number;
  tags?: RoleRawTags;
}

export interface RoleCacheJSON {
  id: Snowflake;
  name: string;
  color: number;
  position: number;
  permissions: PermissionsBitfield;
  icon: string | null;
  _attributes: number;
  tags?: RoleRawTags;
}

export interface RoleDiscordJSON {
  id: Snowflake;
  name: string;
  color: number;
  position: number;
  permissions: PermissionsBitfield;
  icon: string | null;
  tags?: RoleRawTags;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
}

export interface RoleRaw {
  id: Snowflake;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string | null;
  unicode_emoji?: string | null;
  position: number;
  permissions: PermissionsBitfield;
  managed: boolean;
  mentionable: boolean;
  tags?: RoleRawTags;
  flags: number;
}

export interface RoleRawTags {
  bot_id?: Snowflake;
  integration_id?: Snowflake;
  premium_subscriber?: null;
  subscription_listing_id?: Snowflake;
  available_for_purchase?: null;
  guild_connections?: null;
}
