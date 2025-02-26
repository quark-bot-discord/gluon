import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { ChannelOverwriteObject } from "./Channel.js";

export interface CategoryChannelType {
  readonly nsfw: boolean;
  readonly mention: string;
  toString(): string;
  toJSON(format: TO_JSON_TYPES_ENUM): CategoryChannelCacheJSON;
}

export interface CategoryChannelCacheJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  type: number;
  nsfw: boolean;
  permission_overwrites: ChannelOverwriteObject[];
}

export interface CategoryChannelDiscordJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  type: number;
  nsfw: boolean;
  permission_overwrites: ChannelOverwriteObject[];
}

export interface CategoryChannelStorageJSON {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  type: number;
  _attributes: number;
  permission_overwrites: ChannelOverwriteObject[];
}

export interface CategoryChannelRaw {
  id: Snowflake;
  guild_id: Snowflake;
  name: string;
  type: number;
  nsfw: boolean;
  permission_overwrites: ChannelOverwriteObject[];
}
