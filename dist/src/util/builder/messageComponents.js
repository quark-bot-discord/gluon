import { LIMITS, TO_JSON_TYPES_ENUM } from "../../constants.js";
/**
 * Structure for message components.
 */
class MessageComponents {
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
  addActionRow(actionRow) {
    if (this.actionRows.length >= LIMITS.MAX_ACTION_ROWS)
      throw new RangeError(
        `GLUON: Action rows must be less than ${LIMITS.MAX_ACTION_ROWS}.`,
      );
    if (!actionRow) throw new TypeError("GLUON: Action row must be provided.");
    this.actionRows.push(actionRow);
    return this;
  }
  /**
   * Returns the correct Discord format for message components.
   * @returns {Object}
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      default: {
        return this.actionRows.map((a) => a.toJSON(format));
      }
    }
  }
}
export default MessageComponents;
//# sourceMappingURL=messageComponents.js.map
