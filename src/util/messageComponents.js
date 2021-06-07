class MessageComponents {

    constructor() {

        this.actionRows = [];

    }

    addActionRow(actionRow) {

        this.actionRows.push(actionRow.toJSON());

        return this;

    }

    toJSON() {

        return this.actionRows;

    }

}

module.exports = MessageComponents;