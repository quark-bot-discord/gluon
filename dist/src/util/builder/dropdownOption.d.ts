import {
  JsonTypes,
  DropdownOptionBuilder as DropdownOptionBuilderType,
  ResolvedEmoji,
} from "typings/index.js";
/**
 * Helps to create a dropdown option.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
 */
declare class DropdownOption implements DropdownOptionBuilderType {
  default: boolean | undefined;
  description: string | undefined;
  emoji: ResolvedEmoji | undefined;
  label: string | undefined;
  value: string | undefined;
  /**
   * Sets the label.
   * @param {String} label Sets the label.
   * @returns {DropdownOption}
   */
  setLabel(label: string): this;
  /**
   * Sets the value.
   * @param {String} value Sets the value.
   * @returns {DropdownOption}
   */
  setValue(value: string): this;
  /**
   * Sets the description.
   * @param {String} description Sets the description.
   * @returns {DropdownOption}
   */
  setDescription(description: string): this;
  /**
   * Sets the emoji to be displayed on the dropdown option.
   * @param {String} emoji The emoji to display on the dropdown option. For a custom emoji, it should be in the format "<:bitcoin:844240546246950922>".
   * @returns {DropdownOption}
   */
  setEmoji(emoji: string): this;
  /**
   * Sets whether this is the default selected option.
   * @param {Boolean} isDefault Whether this option should be selected by default.
   * @returns {DropdownOption}
   */
  setDefault(isDefault: boolean): this;
  /**
   * Returns the correct Discord format for a dropdown option.
   * @returns {Object}
   */
  toJSON(
    format?: JsonTypes,
    {
      suppressValidation,
    }?: {
      suppressValidation: boolean;
    },
  ): {
    label: string;
    value: string;
    description: string | undefined;
    emoji: ResolvedEmoji | undefined;
    default: boolean | undefined;
  };
}
export default DropdownOption;
