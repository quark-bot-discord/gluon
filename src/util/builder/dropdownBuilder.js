import {
  CHANNEL_TYPES,
  COMPONENT_TYPES,
  LIMITS,
  SELECT_MENU_TYPES,
  TO_JSON_TYPES_ENUM,
} from "../../constants.js";
import DropdownOption from "./dropdownOption.js";

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
    this.default_values = [];
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

    if (
      value < LIMITS.MIN_MIN_DROPDOWN_VALUES ||
      value > LIMITS.MAX_MIN_DROPDOWN_VALUES
    )
      throw new RangeError(
        `GLUON: Dropdown min values must be between ${LIMITS.MIN_MAX_DROPDOWN_VALUES} and ${LIMITS.MAX_MAX_DROPDOWN_VALUES}.`,
      );

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

    if (
      value < LIMITS.MIN_MAX_DROPDOWN_VALUES ||
      value > LIMITS.MAX_MAX_DROPDOWN_VALUES
    )
      throw new RangeError(
        `GLUON: Dropdown max values must be between ${LIMITS.MIN_MAX_DROPDOWN_VALUES} and ${LIMITS.MAX_MAX_DROPDOWN_VALUES}.`,
      );

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
   * Adds a default option to the dropdown.
   * @param {Object} option The default option to add to the dropdown.
   * @returns {Dropdown}
   */
  addDefaultOption(option) {
    if (!option)
      throw new TypeError("GLUON: Dropdown option must be provided.");

    if (this.default_values.length >= LIMITS.MAX_DROPDOWN_OPTIONS)
      throw new RangeError(
        `GLUON: Default dropdown options must be less than ${LIMITS.MAX_DROPDOWN_OPTIONS}.`,
      );

    if (
      !this.default_values.every(
        (o) => o.id !== undefined && o.type !== undefined,
      )
    )
      throw new TypeError(
        "GLUON: Dropdown option must have an id and type fields.",
      );

    this.default_values.push(option);

    return this;
  }

  /**
   * Returns the correct Discord format for a dropdown.
   * @returns {Object}
   */
  toJSON(
    format,
    { suppressValidation = false } = { suppressValidation: false },
  ) {
    if (suppressValidation !== true) {
      if (!this.type || typeof this.type != "number")
        throw new TypeError("GLUON: Dropdown type must be a number.");
      if (this.type && !Object.values(SELECT_MENU_TYPES).includes(this.type))
        throw new TypeError(
          `GLUON: Select menu type must be one of ${Object.values(
            SELECT_MENU_TYPES,
          ).join(", ")}.`,
        );
      if (typeof this.custom_id != "string")
        throw new TypeError("GLUON: Dropdown custom id must be a string.");
      if (
        this.custom_id &&
        this.custom_id.length > LIMITS.MAX_DROPDOWN_CUSTOM_ID
      )
        throw new RangeError(
          `GLUON: Dropdown custom id must be less than ${LIMITS.MAX_DROPDOWN_CUSTOM_ID} characters.`,
        );
      if (this.type === SELECT_MENU_TYPES.TEXT && !this.options)
        throw new TypeError("GLUON: Dropdown options must be provided.");
      if (this.options && !Array.isArray(this.options))
        throw new TypeError("GLUON: Dropdown options must be an array.");
      if (this.options && this.options.length > LIMITS.MAX_DROPDOWN_OPTIONS)
        throw new RangeError(
          `GLUON: Dropdown options must be less than ${LIMITS.MAX_DROPDOWN_OPTIONS}.`,
        );
      if (
        this.options &&
        !this.options.every((o) => o instanceof DropdownOption)
      )
        throw new TypeError(
          "GLUON: Dropdown options must be an array of DropdownOption.",
        );
      if (this.type === SELECT_MENU_TYPES.CHANNEL && !this.channel_types)
        throw new TypeError("GLUON: Dropdown channel types must be provided.");
      if (this.channel_types && !Array.isArray(this.channel_types))
        throw new TypeError("GLUON: Dropdown channel types must be an array.");
      if (
        this.channel_types &&
        !this.channel_types.every((c) => typeof c === "number")
      )
        throw new TypeError(
          "GLUON: Dropdown channel types must be an array of numbers.",
        );
      if (
        this.channel_types &&
        !this.channel_types.every((c) =>
          Object.values(CHANNEL_TYPES).includes(c),
        )
      )
        throw new TypeError(
          `GLUON: Dropdown channel types must be one of ${Object.values(CHANNEL_TYPES).join(", ")}.`,
        );
      if (this.placeholder && typeof this.placeholder !== "string")
        throw new TypeError("GLUON: Dropdown placeholder must be a string.");
      if (
        this.placeholder &&
        this.placeholder.length > LIMITS.MAX_DROPDOWN_PLACEHOLDER
      )
        throw new RangeError(
          `GLUON: Dropdown placeholder must be less than ${LIMITS.MAX_DROPDOWN_PLACEHOLDER} characters.`,
        );
      if (
        this.default_values &&
        [
          SELECT_MENU_TYPES.USER,
          SELECT_MENU_TYPES.ROLE,
          SELECT_MENU_TYPES.MENTIONABLE,
          SELECT_MENU_TYPES.CHANNEL,
        ].includes(this.type)
      )
        throw new TypeError(
          "GLUON: Dropdown default values are not allowed for this type.",
        );
      if (this.default_values && !Array.isArray(this.default_values))
        throw new TypeError("GLUON: Dropdown default values must be an array.");
      if (
        this.default_values &&
        this.default_values.length > LIMITS.MAX_DROPDOWN_OPTIONS
      )
        throw new RangeError(
          `GLUON: Default dropdown options must be less than ${LIMITS.MAX_DROPDOWN_OPTIONS}.`,
        );
      if (
        typeof this.min_values !== "undefined" &&
        typeof this.min_values !== "number"
      )
        throw new TypeError("GLUON: Dropdown min values must be a number.");
      if (
        typeof this.min_values === "number" &&
        (this.min_values < LIMITS.MIN_MIN_DROPDOWN_VALUES ||
          this.min_values > LIMITS.MAX_MIN_DROPDOWN_VALUES)
      )
        throw new RangeError(
          `GLUON: Dropdown min values must be between ${LIMITS.MIN_MAX_DROPDOWN_VALUES} and ${LIMITS.MAX_MAX_DROPDOWN_VALUES}.`,
        );
      if (
        typeof this.max_values !== "undefined" &&
        typeof this.max_values !== "number"
      )
        throw new TypeError("GLUON: Dropdown max values must be a number.");
      if (
        typeof this.max_values === "number" &&
        (this.max_values < LIMITS.MIN_MAX_DROPDOWN_VALUES ||
          this.max_values > LIMITS.MAX_MAX_DROPDOWN_VALUES)
      )
        throw new RangeError(
          `GLUON: Dropdown max values must be between ${LIMITS.MIN_MAX_DROPDOWN_VALUES} and ${LIMITS.MAX_MAX_DROPDOWN_VALUES}.`,
        );
      if (
        typeof this.disabled !== "undefined" &&
        typeof this.disabled !== "boolean"
      )
        throw new TypeError("GLUON: Dropdown disabled must be a boolean.");
    }
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      default: {
        return {
          type: this.type,
          custom_id: this.custom_id,
          options: this.options?.map((o) => o.toJSON(format)),
          channel_types: this.channel_types,
          default_values: this.default_values,
          placeholder: this.placeholder,
          min_values: this.min_values,
          max_values: this.max_values,
          disabled: this.disabled,
        };
      }
    }
  }
}

export default Dropdown;
