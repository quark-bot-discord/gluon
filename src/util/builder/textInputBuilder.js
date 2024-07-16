const { COMPONENT_TYPES, TEXT_INPUT_STYLES } = require("../../constants");

/**
 * Helps to construct a text input interaction.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-structure}
 */
class TextInput {
  /**
   * Creates a text input.
   */
  constructor() {
    this.type = COMPONENT_TYPES.TEXT_INPUT;
  }

  /**
   * Sets the text on the input label.
   * @param {String} label The text to display as a label to the input.
   * @returns {TextInput}
   */
  setLabel(label) {
    this.label = label;

    return this;
  }

  /**
   * Sets the style of the text input.
   * @param {Number} style The text input style.
   * @returns {TextInput}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-styles}
   */
  setStyle(style) {
    this.style = style;

    return this;
  }

  /**
   * Set the custom id of the text input.
   * @param {String} id The custom id of the text input.
   * @returns {TextInput}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
   */
  setCustomID(id) {
    this.custom_id = id;

    return this;
  }

  /**
   * Set the default value of the text input.
   * @param {String} value The value to pre-fill the text input with.
   * @returns {TextInput}
   */
  setValue(value) {
    this.value = value;

    return this;
  }

  /**
   * Set the placeholder text of the text input.
   * @param {String} placeholder Placeholder text for the text input.
   * @returns {TextInput}
   */
  setPlaceholder(placeholder) {
    this.placeholder = placeholder;

    return this;
  }

  /**
   * Set the minimum response length the user may enter.
   * @param {Number} length Minimum user input length.
   * @returns {TextInput}
   */
  setMinLength(length) {
    this.min_length = length;

    return this;
  }

  /**
   * Set the maximum response length the user may enter.
   * @param {Number} length Maximum user input length.
   * @returns {TextInput}
   */
  setMaxLength(length) {
    this.max_length = length;

    return this;
  }

  /**
   * Returns the correct Discord format for a text input.
   * @returns {Object}
   */
  toJSON() {
    return {
      type: this.type,
      label: this.label,
      style: this.style,
      custom_id: this.custom_id,
      value: this.value,
      placeholder: this.placeholder,
      min_length: this.min_length,
      max_length: this.max_length,
    };
  }
}

module.exports = TextInput;
