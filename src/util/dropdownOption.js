const resolveEmoji = require("./resolveEmoji");

/**
 * Helps to create a dropdown option.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
 */
class DropdownOption {
  /**
   * Creates a dropdown option.
   */
  constructor() {}

  /**
   * Sets the label.
   * @param {String} label Sets the label.
   * @returns {DropdownOption}
   */
  setLabel(label) {
    this.label = label;

    return this;
  }

  /**
   * Sets the value.
   * @param {String} value Sets the value.
   * @returns {DropdownOption}
   */
  setValue(value) {
    this.value = value;

    return this;
  }

  /**
   * Sets the description.
   * @param {String} description Sets the description.
   * @returns {DropdownOption}
   */
  setDescription(description) {
    this.description = description;

    return this;
  }

  /**
   * Sets the emoji to be displayed on the dropdown option.
   * @param {String} emoji The emoji to display on the dropdown option. For a custom emoji, it should be in the format "<:bitcoin:844240546246950922>".
   * @returns {DropdownOption}
   */
  setEmoji(emoji) {
    this.emoji = resolveEmoji(emoji);

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

module.exports = DropdownOption;
