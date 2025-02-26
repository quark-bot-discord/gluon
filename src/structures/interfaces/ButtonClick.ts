import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { MessageType } from "./Message.js";
import { Snowflake } from "src/interfaces/gluon.js";

export interface ButtonClickType extends InteractionType {
  readonly customId: string;
  readonly message: MessageType;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): ButtonClickStorageJSON | ButtonClickCacheJSON | ButtonClickDiscordJSON;
}

// export interface ButtonClickStorageJSON {
//   id: Snowflake;
//   guild_id: Snowflake;
//   application_id: Snowflake;
//   type: InteractionType;
//   data: InteractionData;
//   user: User;
// }

export type ButtonClickCacheJSON = InteractionStorageJSON;

export type ButtonClickDiscordJSON = InteractionStorageJSON;

export interface ButtonClickRaw {
  //   id: Snowflake;
  //   guild_id: Snowflake;
  //   application_id: Snowflake;
  //   type: InteractionType;
  //   data: InteractionData;
  //   user: User;
}
