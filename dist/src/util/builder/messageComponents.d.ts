import type {
  MessageComponents as MessageComponentsType,
  ActionRowBuilder as ActionRowBuilderType,
} from "typings/index.d.ts";
import { JsonTypes } from "../../../typings/enums.js";
/**
 * Structure for message components.
 */
declare class MessageComponents implements MessageComponentsType {
  actionRows: ActionRowBuilderType[];
  /**
   * Creates a group of message components for a message.
   */
  constructor();
  /**
   * Adds an action row to the message.
   * @param {ActionRow} actionRow Action row to add to the message.
   * @returns {MessageComponents}
   */
  addActionRow(actionRow: ActionRowBuilderType): this;
  /**
   * Returns the correct Discord format for message components.
   * @returns {Object}
   */
  toJSON(
    format?: JsonTypes,
  ): (
    | import("typings/index.d.ts").ActionRowBuilderStorageJSON
    | import("typings/index.d.ts").ActionRowBuilderCacheJSON
    | import("typings/index.d.ts").ActionRowBuilderDiscordJSON
  )[];
}
export default MessageComponents;
