import {
  COMPONENT_TYPES,
  LIMITS,
  TEXT_INPUT_STYLES,
  TO_JSON_TYPES_ENUM,
} from "../../constants.js";

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
    if (!label)
      throw new TypeError("GLUON: Text input label must be provided.");

    this.label =
      label && label.length > LIMITS.MAX_TEXT_INPUT_LABEL
        ? `${label.substring(0, LIMITS.MAX_TEXT_INPUT_LABEL - 3)}...`
        : label;

    return this;
  }

  /**
   * Sets the style of the text input.
   * @param {Number} style The text input style.
   * @returns {TextInput}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-styles}
   */
  setStyle(style) {
    if (!style)
      throw new TypeError("GLUON: Text input style must be provided.");

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
    if (!id)
      throw new TypeError("GLUON: Text input custom id must be provided.");

    if (id.length > LIMITS.MAX_TEXT_INPUT_CUSTOM_ID)
      throw new RangeError(
        `GLUON: Text input custom id must be less than ${LIMITS.MAX_TEXT_INPUT_CUSTOM_ID} characters.`,
      );

    this.custom_id = id;

    return this;
  }

  /**
   * Set the default value of the text input.
   * @param {String} value The value to pre-fill the text input with.
   * @returns {TextInput}
   */
  setValue(value) {
    if (!value)
      throw new TypeError("GLUON: Text input value must be provided.");

    this.value =
      value && value.length > LIMITS.MAX_TEXT_INPUT_VALUE
        ? `${value.substring(0, LIMITS.MAX_TEXT_INPUT_VALUE - 3)}...`
        : value;

    return this;
  }

  /**
   * Set the placeholder text of the text input.
   * @param {String} placeholder Placeholder text for the text input.
   * @returns {TextInput}
   */
  setPlaceholder(placeholder) {
    if (!placeholder)
      throw new TypeError("GLUON: Text input placeholder must be provided.");

    this.placeholder =
      placeholder && placeholder.length > LIMITS.MAX_TEXT_INPUT_PLACEHOLDER
        ? `${placeholder.substring(0, LIMITS.MAX_TEXT_INPUT_PLACEHOLDER - 3)}...`
        : placeholder;

    return this;
  }

  /**
   * Set the minimum response length the user may enter.
   * @param {Number} length Minimum user input length.
   * @returns {TextInput}
   */
  setMinLength(length) {
    if (typeof length != "number")
      throw new TypeError("GLUON: Text input min length must be a number.");

    this.min_length = length;

    return this;
  }

  /**
   * Set the maximum response length the user may enter.
   * @param {Number} length Maximum user input length.
   * @returns {TextInput}
   */
  setMaxLength(length) {
    if (typeof length != "number")
      throw new TypeError("GLUON: Text input max length must be a number.");

    this.max_length = length;

    return this;
  }

  /**
   * Returns the correct Discord format for a text input.
   * @returns {Object}
   */
  toJSON(
    format,
    { suppressValidation = false } = { suppressValidation: false },
  ) {
    if (suppressValidation !== true) {
      if (!this.type)
        throw new TypeError("GLUON: Text input type must be provided.");
      if (this.type !== COMPONENT_TYPES.TEXT_INPUT)
        throw new TypeError(
          `GLUON: Text input type must be ${COMPONENT_TYPES.TEXT_INPUT}.`,
        );
      if (!this.label)
        throw new TypeError("GLUON: Text input label must be provided.");
      if (!this.style)
        throw new TypeError("GLUON: Text input style must be provided.");
      if (!this.custom_id)
        throw new TypeError("GLUON: Text input custom id must be provided.");
      if (this.custom_id.length > LIMITS.MAX_TEXT_INPUT_CUSTOM_ID)
        throw new RangeError(
          `GLUON: Text input custom id must be less than ${LIMITS.MAX_TEXT_INPUT_CUSTOM_ID} characters.`,
        );
      if (this.label.length > LIMITS.MAX_TEXT_INPUT_LABEL)
        throw new RangeError(
          `GLUON: Text input label must be less than ${LIMITS.MAX_TEXT_INPUT_LABEL} characters.`,
        );
      if (this.min_length && typeof this.min_length !== "number")
        throw new TypeError("GLUON: Text input min length must be a number.");
      if (this.max_length && typeof this.max_length !== "number")
        throw new TypeError("GLUON: Text input max length must be a number.");
      if (
        this.min_length &&
        (this.min_length > LIMITS.MAX_MIN_TEXT_INPUT_LENGTH ||
          this.min_length < LIMITS.MIN_MIN_TEXT_INPUT_LENGTH)
      )
        throw new RangeError(
          `GLUON: Text input min length must be between ${LIMITS.MAX_MIN_TEXT_INPUT_LENGTH} and ${LIMITS.MIN_MIN_TEXT_INPUT_LENGTH}.`,
        );
      if (
        this.max_length &&
        (this.max_length > LIMITS.MAX_MAX_TEXT_INPUT_LENGTH ||
          this.max_length < LIMITS.MIN_MAX_TEXT_INPUT_LENGTH)
      )
        throw new RangeError(
          `GLUON: Text input max length must be between ${LIMITS.MAX_MAX_TEXT_INPUT_LENGTH} and ${LIMITS.MIN_MAX_TEXT_INPUT_LENGTH}.`,
        );
      if (this.value && this.value.length > LIMITS.MAX_TEXT_INPUT_VALUE)
        throw new RangeError(
          `GLUON: Text input value must be less than ${LIMITS.MAX_TEXT_INPUT_VALUE} characters.`,
        );
      if (
        this.placeholder &&
        this.placeholder.length > LIMITS.MAX_TEXT_INPUT_PLACEHOLDER
      )
        throw new RangeError(
          `GLUON: Text input placeholder must be less than ${LIMITS.MAX_TEXT_INPUT_PLACEHOLDER} characters.`,
        );
      if (this.style && !Object.values(TEXT_INPUT_STYLES).includes(this.style))
        throw new TypeError(
          `GLUON: Text input style must be one of ${Object.values(
            TEXT_INPUT_STYLES,
          ).join(", ")}.`,
        );
      if (
        typeof this.required !== "undefined" &&
        typeof this.required !== "boolean"
      )
        throw new TypeError("GLUON: Text input required must be a boolean.");
    }
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      default: {
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
  }
}

export default TextInput;
