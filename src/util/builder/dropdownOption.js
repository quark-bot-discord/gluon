import { LIMITS } from "../../constants.js";
import resolveEmoji from "../discord/resolveEmoji.js";

/**
 * Helps to create a dropdown option.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
 */
class DropdownOption {
  /**
   * Sets the label.
   * @param {String} label Sets the label.
   * @returns {DropdownOption}
   */
  setLabel(label) {
    if (!label)
      throw new TypeError("GLUON: Dropdown option label must be provided.");

    this.label =
      label && label.length > LIMITS.MAX_DROPDOWN_OPTION_LABEL
        ? `${label.substring(0, LIMITS.MAX_DROPDOWN_OPTION_LABEL - 3)}...`
        : label;

    return this;
  }

  /**
   * Sets the value.
   * @param {String} value Sets the value.
   * @returns {DropdownOption}
   */
  setValue(value) {
    if (!value)
      throw new TypeError("GLUON: Dropdown option value must be provided.");

    if (value.length > LIMITS.MAX_DROPDOWN_OPTION_VALUE)
      throw new RangeError(
        `GLUON: Dropdown option value must be less than ${LIMITS.MAX_DROPDOWN_OPTION_VALUE} characters.`,
      );

    this.value = value;

    return this;
  }

  /**
   * Sets the description.
   * @param {String} description Sets the description.
   * @returns {DropdownOption}
   */
  setDescription(description) {
    if (!description)
      throw new TypeError(
        "GLUON: Dropdown option description must be provided.",
      );

    this.description =
      description && description.length > LIMITS.MAX_DROPDOWN_OPTION_DESCRIPTION
        ? `${description.substring(0, LIMITS.MAX_DROPDOWN_OPTION_DESCRIPTION - 3)}...`
        : description;

    return this;
  }

  /**
   * Sets the emoji to be displayed on the dropdown option.
   * @param {String} emoji The emoji to display on the dropdown option. For a custom emoji, it should be in the format "<:bitcoin:844240546246950922>".
   * @returns {DropdownOption}
   */
  setEmoji(emoji) {
    this.emoji = resolveEmoji(emoji);

    if (!this.emoji)
      throw new TypeError("GLUON: Dropdown option emoji must be provided.");

    return this;
  }

  /**
   * Sets whether this is the default selected option.
   * @param {Boolean} isDefault Whether this option should be selected by default.
   * @returns {DropdownOption}
   */
  setDefault(isDefault) {
    this.default = isDefault;

    return this;
  }

  /**
   * Returns the correct Discord format for a dropdown option.
   * @returns {Object}
   */
  toJSON() {
    return {
      label: this.label,
      value: this.value,
      description: this.description,
      emoji: this.emoji,
      default: this.default,
    };
  }
}

export default DropdownOption;
