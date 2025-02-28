import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  ReactionCacheJSON,
  ReactionDiscordJSON,
  ReactionStorageJSON,
} from "src/structures/interfaces/Reaction.js";

export interface MessageReactionManagerType {
  _addReaction(userId: Snowflake, emoji: Snowflake | string, data: any): void;
  _removeReaction(userId: Snowflake, emoji: Snowflake | string): void;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ):
    | MessageReactionManagerCacheJSON
    | MessageReactionManagerStorageJSON
    | MessageReactionManagerDiscordJSON;
}

export interface MessageReactionManagerStorageJSON {
  [key: string]: ReactionStorageJSON;
}

export interface MessageReactionManagerCacheJSON {
  [key: string]: ReactionCacheJSON;
}

export type MessageReactionManagerDiscordJSON = Array<ReactionDiscordJSON>;
