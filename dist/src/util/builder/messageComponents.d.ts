/**
 * Structure for message components.
 */
declare class MessageComponents {
  actionRows: any;
  /**
   * Creates a group of message components for a message.
   */
  constructor();
  /**
   * Adds an action row to the message.
   * @param {ActionRow} actionRow Action row to add to the message.
   * @returns {MessageComponents}
   */
  addActionRow(actionRow: any): this;
  /**
   * Returns the correct Discord format for message components.
   * @returns {Object}
   */
  toJSON(format: any): any;
}
export default MessageComponents;
