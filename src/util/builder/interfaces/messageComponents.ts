import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ActionRowBuilderCacheJSON,
  ActionRowBuilderDiscordJSON,
  ActionRowBuilderStorageJSON,
  ActionRowBuilderType,
} from "./actionRowBuilder.js";

export interface MessageComponentsType {
  actionRows: ActionRowBuilderType[];
  addActionRow(actionRow: ActionRowBuilderType): MessageComponentsType;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ):
    | MessageComponentsCacheJSON
    | MessageComponentsDiscordJSON
    | MessageComponentsStorageJSON;
}

export type MessageComponentsStorageJSON = ActionRowBuilderStorageJSON[];

export type MessageComponentsCacheJSON = ActionRowBuilderCacheJSON[];

export type MessageComponentsDiscordJSON = ActionRowBuilderDiscordJSON[];
