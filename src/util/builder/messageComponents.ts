import { LIMITS } from "../../constants.js";
import type {
  MessageComponents as MessageComponentsType,
  ActionRowBuilder as ActionRowBuilderType,
} from "typings/index.d.ts";
import { JsonTypes } from "../../../typings/enums.js";

/**
 * Structure for message components.
 */
class MessageComponents implements MessageComponentsType {
  actionRows: ActionRowBuilderType[];
  /**
   * Creates a group of message components for a message.
   */
  constructor() {
    this.actionRows = [];
  }

  /**
   * Adds an action row to the message.
   * @param {ActionRow} actionRow Action row to add to the message.
   * @returns {MessageComponents}
   */
  addActionRow(actionRow: ActionRowBuilderType) {
    if (this.actionRows.length >= LIMITS.MAX_ACTION_ROWS)
      throw new RangeError(
        `GLUON: Action rows must be less than ${LIMITS.MAX_ACTION_ROWS}.`,
      );

    this.actionRows.push(actionRow);

    return this;
  }

  /**
   * Returns the correct Discord format for message components.
   * @returns {Object}
   */
  toJSON(format?: JsonTypes) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      default: {
        return this.actionRows.map((a) => a.toJSON(format));
      }
    }
  }
}

export default MessageComponents;
