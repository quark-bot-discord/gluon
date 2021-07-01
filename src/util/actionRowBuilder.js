const { COMPONENT_TYPES } = require("../constants");

class ActionRow {

    constructor() {

        this.type = COMPONENT_TYPES.ACTION_ROW;
        this.components = [];

    }

    addComponent(component) {

        this.components.push(component.toJSON());

        return this;

    }

    toJSON() {

        return {
            type: this.type,
            components: this.components
        };

    }

}

module.exports = ActionRow;