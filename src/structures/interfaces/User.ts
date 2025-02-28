import { LOCALES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake, UnixTimestamp } from "src/interfaces/gluon.js";
import { UserAvatarDecorationData } from "./Member.js";

export interface UserType {
  readonly id: Snowflake;
  readonly username: string;
  readonly globalName: string | null;
  readonly discriminator: string | null;
  readonly _cached: UnixTimestamp;
  readonly mention: string;
  readonly _originalAvatarHash: string | null;
  readonly displayAvatarURL: string;
  readonly tag: string;
  readonly createdTimestamp: UnixTimestamp;
  readonly bot: boolean;
  readonly avatarIsAnimated: boolean;
  readonly hasAvatar: boolean;
  readonly toString: () => string;
  readonly overrideAvatarURL: (url: string) => void;
  readonly toJSON: (
    format?: TO_JSON_TYPES_ENUM,
  ) => UserStorageJSON | UserCacheJSON | UserDiscordJSON;
}

export interface UserStorageJSON {
  id: Snowflake;
  avatar: string | null;
  bot: boolean;
  username: string;
  global_name: string | null;
  discriminator?: number;
}

export interface UserCacheJSON {
  id: Snowflake;
  avatar: string | null;
  _cached: UnixTimestamp;
  bot: boolean;
  username: string;
  global_name: string | null;
  discriminator?: number;
}

export interface UserDiscordJSON {
  id: Snowflake;
  avatar: string | null;
  bot: boolean;
  username: string;
  global_name: string | null;
  discriminator: string | null;
}

export interface UserRaw {
  id: Snowflake;
  username: string;
  discriminator: string;
  global_name: string | null;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string | null;
  accent_color?: number | null;
  locale?: LOCALES;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
  avatar_decoration_data?: UserAvatarDecorationData | null;
}
