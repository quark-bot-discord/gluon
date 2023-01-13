const { COMPONENT_TYPES } = require("../constants");

class Dropdown {

    constructor() {

        this.type = COMPONENT_TYPES.SELECT_MENU;
        this.options = [];

    }

    setType(type) {

        this.type = type;

        return this;

    }

    setCustomID(id) {

        this.custom_id = id;

        return this;

    }

    addOption(option) {

        this.options.push(option.toJSON());

        return this;

    }

    addChannelTypes(channelTypes) {

        this.channel_types = channelTypes;

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

    setDisabled(isDisabled) {

        this.disabled = isDisabled;

        return this;

    }

    toJSON() {

        return {
            type: this.type,
            custom_id: this.custom_id,
            options: this.options,
            channel_types: this.channel_types,
            placeholder: this.placeholder,
            min_values: this.min_values,
            max_values: this.max_values,
            disabled: this.disabled
        };

    }

}

module.exports = Dropdown;