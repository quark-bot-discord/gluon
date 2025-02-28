import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { UserRaw } from "./User.js";

export interface StickerType {
  readonly id: Snowflake;
  readonly name: string;
  readonly format: keyof typeof StickerFormatTypes;
  readonly formatType: StickerFormatTypes;
  readonly previewImageURL: string | null;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): StickerCacheJSON | StickerStorageJSON | StickerDiscordJSON;
}

export interface StickerCacheJSON {
  id: Snowflake;
  name: string;
  format_type: StickerFormatTypes;
}

export interface StickerStorageJSON {
  id: Snowflake;
  name: string;
  format_type: StickerFormatTypes;
}

export interface StickerDiscordJSON {
  id: Snowflake;
  name: string;
  format_type: StickerFormatTypes;
}

export interface StickerRaw {
  id: Snowflake;
  pack_id?: Snowflake;
  name: string;
  description: string | null;
  tags: string;
  type: StickerTypes;
  format_type: StickerFormatTypes;
  available?: boolean;
  guild_id?: Snowflake;
  user?: UserRaw;
  sort_value?: number;
}

export interface StickerItemRaw {
  id: Snowflake;
  name: string;
  format_type: StickerFormatTypes;
}

export enum StickerTypes {
  STANDARD = 1,
  GUILD = 2,
}

export enum StickerFormatTypes {
  PNG = 1,
  APNG = 2,
  LOTTIE = 3,
  GIF = 4,
}
