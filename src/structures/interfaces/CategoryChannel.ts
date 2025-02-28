import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  PermissionOverwriteCacheJSON,
  PermissionOverwriteDiscordJSON,
  PermissionOverwriteRaw,
  PermissionOverwriteStorageJSON,
} from "./PermissionOverwrite.js";

export interface CategoryChannelType {
  readonly nsfw: boolean;
  readonly mention: string;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ):
    | CategoryChannelCacheJSON
    | CategoryChannelDiscordJSON
    | CategoryChannelStorageJSON;
}

export interface CategoryChannelCacheJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  type: number;
  nsfw: boolean;
  permission_overwrites: PermissionOverwriteCacheJSON[];
}

export interface CategoryChannelDiscordJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  type: number;
  nsfw: boolean;
  permission_overwrites: PermissionOverwriteDiscordJSON[];
}

export interface CategoryChannelStorageJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  type: number;
  _attributes: number;
  permission_overwrites: PermissionOverwriteStorageJSON[];
}

export interface CategoryChannelRaw {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  type: number;
  nsfw: boolean;
  permission_overwrites: PermissionOverwriteRaw[];
}
