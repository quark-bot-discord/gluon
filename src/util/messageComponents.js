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

        this.actionRows.push(actionRow.toJSON());

        return this;

    }

    /**
     * Returns the correct Discord format for message components.
     * @returns {Object}
     */
    toJSON() {

        return this.actionRows;

    }

}

module.exports = MessageComponents;