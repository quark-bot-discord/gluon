const { COMPONENT_TYPES } = require("../constants");

/**
 * Helps to create a dropdown message component.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menus}
 */
class Dropdown {

    /**
     * Creates a dropdown component.
     */
    constructor() {

        this.type = COMPONENT_TYPES.SELECT_MENU;
        this.options = [];

    }

    /**
     * Sets the option type.
     * @param {Number} type The option type.
     * @returns {Dropdown}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types}
     */
    setType(type) {

        this.type = type;

        return this;

    }

    /**
     * Set the custom id of the dropdown.
     * @param {String} id The custom id of the dropdown.
     * @returns {Dropdown}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
     */
    setCustomID(id) {

        this.custom_id = id;

        return this;

    }

    /**
     * Adds an option to the dropdown.
     * @param {DropdownOption} option Adds an option to the dropdown.
     * @returns {Dropdown}
     */
    addOption(option) {

        this.options.push(option.toJSON());

        return this;

    }

    /**
     * Sets which channel types are selectable by the user.
     * @param {Array<Number>} channelTypes An array of channel types to offer as a choice.
     * @returns {CommandOption}
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
     */
    addChannelTypes(channelTypes) {

        this.channel_types = channelTypes;

        return this;

    }

    /**
     * Sets the placeholder text.
     * @param {String} placeholder Placeholder text if nothing is selected.
     * @returns {Dropdown}
     */
    setPlaceholder(placeholder) {

        this.placeholder = placeholder;

        return this;

    }

    /**
     * Sets the minimum value the user may enter.
     * @param {Number} value The minimum number value that the user may enter.
     * @returns {CommandOption}
     */
    setMinValue(value) {

        this.min_values = value;

        return this;

    }

    /**
     * Sets the maximum value the user may enter.
     * @param {Number} value The maximum number value that the user may enter.
     * @returns {Dropdown}
     */
    setMaxValue(value) {

        this.max_values = value;

        return this;

    }

    /**
     * Disables the dropdown from being clickable.
     * @param {Boolean} disabled Whether this dropdown should be displayed as disabled.
     * @returns {Dropdown}
     */
    setDisabled(isDisabled) {

        this.disabled = isDisabled;

        return this;

    }

    /**
     * Returns the correct Discord format for a dropdown.
     * @returns {Object}
     */
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