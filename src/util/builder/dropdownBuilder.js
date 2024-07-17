const { COMPONENT_TYPES, LIMITS } = require("../../constants");

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
    if (typeof type != "number")
      throw new TypeError("GLUON: Dropdown type must be a number.");

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
    if (!id) throw new TypeError("GLUON: Dropdown custom id must be provided.");

    if (id.length > LIMITS.MAX_DROPDOWN_CUSTOM_ID)
      throw new RangeError(
        `GLUON: Dropdown custom id must be less than ${LIMITS.MAX_DROPDOWN_CUSTOM_ID} characters.`,
      );

    this.custom_id = id;

    return this;
  }

  /**
   * Adds an option to the dropdown.
   * @param {DropdownOption} option Adds an option to the dropdown.
   * @returns {Dropdown}
   */
  addOption(option) {
    if (!option)
      throw new TypeError("GLUON: Dropdown option must be provided.");

    if (this.options.length >= LIMITS.MAX_DROPDOWN_OPTIONS)
      throw new RangeError(
        `GLUON: Dropdown options must be less than ${LIMITS.MAX_DROPDOWN_OPTIONS}.`,
      );

    this.options.push(option);

    return this;
  }

  /**
   * Sets which channel types are selectable by the user.
   * @param {Array<Number>} channelTypes An array of channel types to offer as a choice.
   * @returns {CommandOption}
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
   */
  addChannelTypes(channelTypes) {
    if (!channelTypes)
      throw new TypeError("GLUON: Dropdown channel types must be provided.");

    if (!Array.isArray(channelTypes))
      throw new TypeError("GLUON: Dropdown channel types must be an array.");

    this.channel_types = channelTypes;

    return this;
  }

  /**
   * Sets the placeholder text.
   * @param {String} placeholder Placeholder text if nothing is selected.
   * @returns {Dropdown}
   */
  setPlaceholder(placeholder) {
    if (!placeholder)
      throw new TypeError("GLUON: Dropdown placeholder must be provided.");

    this.placeholder =
      placeholder && placeholder.length > LIMITS.MAX_DROPDOWN_PLACEHOLDER
        ? `${placeholder.substring(0, LIMITS.MAX_DROPDOWN_PLACEHOLDER - 3)}...`
        : placeholder;

    return this;
  }

  /**
   * Sets the minimum value the user may enter.
   * @param {Number} value The minimum number value that the user may enter.
   * @returns {CommandOption}
   */
  setMinValue(value) {
    if (typeof value != "number")
      throw new TypeError("GLUON: Dropdown min value must be a number.");

    this.min_values = value;

    return this;
  }

  /**
   * Sets the maximum value the user may enter.
   * @param {Number} value The maximum number value that the user may enter.
   * @returns {Dropdown}
   */
  setMaxValue(value) {
    if (typeof value != "number")
      throw new TypeError("GLUON: Dropdown max value must be a number.");

    this.max_values = value;

    return this;
  }

  /**
   * Disables the dropdown from being clickable.
   * @param {Boolean} disabled Whether this dropdown should be displayed as disabled.
   * @returns {Dropdown}
   */
  setDisabled(isDisabled) {
    if (typeof isDisabled != "boolean")
      throw new TypeError("GLUON: Dropdown disabled must be a boolean.");

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
      disabled: this.disabled,
    };
  }
}

module.exports = Dropdown;
