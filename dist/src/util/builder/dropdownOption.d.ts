/**
 * Helps to create a dropdown option.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
 */
declare class DropdownOption {
  default: any;
  description: any;
  emoji: any;
  label: any;
  value: any;
  /**
   * Sets the label.
   * @param {String} label Sets the label.
   * @returns {DropdownOption}
   */
  setLabel(label: any): this;
  /**
   * Sets the value.
   * @param {String} value Sets the value.
   * @returns {DropdownOption}
   */
  setValue(value: any): this;
  /**
   * Sets the description.
   * @param {String} description Sets the description.
   * @returns {DropdownOption}
   */
  setDescription(description: any): this;
  /**
   * Sets the emoji to be displayed on the dropdown option.
   * @param {String} emoji The emoji to display on the dropdown option. For a custom emoji, it should be in the format "<:bitcoin:844240546246950922>".
   * @returns {DropdownOption}
   */
  setEmoji(emoji: any): this;
  /**
   * Sets whether this is the default selected option.
   * @param {Boolean} isDefault Whether this option should be selected by default.
   * @returns {DropdownOption}
   */
  setDefault(isDefault: any): this;
  /**
   * Returns the correct Discord format for a dropdown option.
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
    label: any;
    value: any;
    description: any;
    emoji: any;
    default: any;
  };
}
export default DropdownOption;
