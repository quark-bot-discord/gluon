export default MessageComponents;
/**
 * Structure for message components.
 */
declare class MessageComponents {
    actionRows: any[];
    /**
     * Adds an action row to the message.
     * @param {ActionRow} actionRow Action row to add to the message.
     * @returns {MessageComponents}
     */
    addActionRow(actionRow: ActionRow): MessageComponents;
    /**
     * Returns the correct Discord format for message components.
     * @returns {Object}
     */
    toJSON(format: any): any;
}
//# sourceMappingURL=messageComponents.d.ts.map