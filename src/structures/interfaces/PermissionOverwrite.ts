import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { PermissionsBitfield, Snowflake } from "src/interfaces/gluon.js";

export interface PermissionOverwriteType {
  readonly allow: string;
  readonly deny: string;
  readonly id: string;
  readonly type: PermissionOverwriteTypes;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ):
    | PermissionOverwriteStorageJSON
    | PermissionOverwriteCacheJSON
    | PermissionOverwriteDiscordJSON;
}

export interface PermissionOverwriteStorageJSON {
  id: Snowflake;
  type: PermissionOverwriteTypes;
  allow: PermissionsBitfield;
  deny: PermissionsBitfield;
}

export interface PermissionOverwriteCacheJSON {
  id: Snowflake;
  type: PermissionOverwriteTypes;
  allow: PermissionsBitfield;
  deny: PermissionsBitfield;
}

export interface PermissionOverwriteDiscordJSON {
  id: Snowflake;
  type: PermissionOverwriteTypes;
  allow: PermissionsBitfield;
  deny: PermissionsBitfield;
}

export interface PermissionOverwriteRaw {
  id: Snowflake;
  type: PermissionOverwriteTypes;
  allow: PermissionsBitfield;
  deny: PermissionsBitfield;
}

export enum PermissionOverwriteTypes {
  ROLE = 0,
  MEMBER = 1,
}
