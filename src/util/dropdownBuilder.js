const { COMPONENT_TYPES } = require("../constants");

class Dropdown {

    constructor() {

        this.type = COMPONENT_TYPES.SELECT_MENU;
        this.options = [];

    }

    setCustomID(id) {

        this.custom_id = id;

        return this;

    }

    addOption(option) {

        this.options.push(option.toJSON());

        return this;

    }

    setPlaceholder(placeholder) {

        this.placeholder = placeholder;

        return this;

    }

    setMinValue(value) {

        this.min_values = value;

        return this;

    }

    setMaxValue(value) {

        this.max_values = value;

        return this;

    }

    toJSON() {

        return {
            custom_id: this.custom_id,
            options: this.options,
            placeholder: this.placeholder,
            min_values: this.min_values,
            max_values: this.max_values
        };

    }

}

module.exports = Dropdown;