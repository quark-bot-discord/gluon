class ActionRow {

    constructor() {

        this.type = 1;
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