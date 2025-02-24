/**
 * Helps to create a dropdown message component.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menus}
 */
declare class Dropdown {
  channel_types: any;
  custom_id: any;
  default_values: any;
  disabled: any;
  max_values: any;
  min_values: any;
  options: any;
  placeholder: any;
  type: any;
  /**
   * Creates a dropdown component.
   */
  constructor();
  /**
   * Sets the option type.
   * @param {Number} type The option type.
   * @returns {Dropdown}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types}
   */
  setType(type: any): this;
  /**
   * Set the custom id of the dropdown.
   * @param {String} id The custom id of the dropdown.
   * @returns {Dropdown}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
   */
  setCustomID(id: any): this;
  /**
   * Adds an option to the dropdown.
   * @param {DropdownOption} option Adds an option to the dropdown.
   * @returns {Dropdown}
   */
  addOption(option: any): this;
  /**
   * Sets which channel types are selectable by the user.
   * @param {Array<Number>} channelTypes An array of channel types to offer as a choice.
   * @returns {Dropdown}
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
   */
  addChannelTypes(channelTypes: any): this;
  /**
   * Sets the placeholder text.
   * @param {String} placeholder Placeholder text if nothing is selected.
   * @returns {Dropdown}
   */
  setPlaceholder(placeholder: any): this;
  /**
   * Sets the minimum value the user may enter.
   * @param {Number} value The minimum number value that the user may enter.
   * @returns {Dropdown}
   */
  setMinValue(value: any): this;
  /**
   * Sets the maximum value the user may enter.
   * @param {Number} value The maximum number value that the user may enter.
   * @returns {Dropdown}
   */
  setMaxValue(value: any): this;
  /**
   * Disables the dropdown from being clickable.
   * @param {Boolean} disabled Whether this dropdown should be displayed as disabled.
   * @returns {Dropdown}
   */
  setDisabled(isDisabled: any): this;
  /**
   * Adds a default option to the dropdown.
   * @param {Object} option The default option to add to the dropdown.
   * @returns {Dropdown}
   */
  addDefaultOption(option: any): this;
  /**
   * Returns the correct Discord format for a dropdown.
   * @returns {Object}
   */
  toJSON(
    format: number,
    {
      suppressValidation,
    }?: {
      suppressValidation: boolean;
    },
  ): {
    type: any;
    custom_id: any;
    options: any;
    channel_types: any;
    default_values: any;
    placeholder: any;
    min_values: any;
    max_values: any;
    disabled: any;
  };
}
export default Dropdown;
