import {
  JsonTypes,
  DropdownOptionBuilder as DropdownOptionBuilderType,
  ResolvedEmoji,
} from "typings/index.js";
import { LIMITS } from "../../constants.js";
import resolveEmoji from "../discord/resolveEmoji.js";

/**
 * Helps to create a dropdown option.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
 */
class DropdownOption implements DropdownOptionBuilderType {
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
  setLabel(label: string) {
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
  setValue(value: string) {
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
  setDescription(description: string) {
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
  setEmoji(emoji: string) {
    this.emoji = resolveEmoji(emoji) ?? undefined;

    if (!this.emoji)
      throw new TypeError("GLUON: Dropdown option emoji must be provided.");

    return this;
  }

  /**
   * Sets whether this is the default selected option.
   * @param {Boolean} isDefault Whether this option should be selected by default.
   * @returns {DropdownOption}
   */
  setDefault(isDefault: boolean) {
    this.default = isDefault;

    return this;
  }

  /**
   * Returns the correct Discord format for a dropdown option.
   * @returns {Object}
   */
  toJSON(
    format?: JsonTypes,
    { suppressValidation = false }: { suppressValidation: boolean } = {
      suppressValidation: false,
    },
  ) {
    if (suppressValidation !== true) {
      if (typeof this.label !== "string")
        throw new TypeError("GLUON: Dropdown option label must be a string.");
      if (this.label.length > LIMITS.MAX_DROPDOWN_OPTION_LABEL)
        throw new RangeError(
          `GLUON: Dropdown option label must be less than ${LIMITS.MAX_DROPDOWN_OPTION_LABEL} characters.`,
        );
      if (typeof this.value !== "string")
        throw new TypeError("GLUON: Dropdown option value must be a string.");
      if (this.value.length > LIMITS.MAX_DROPDOWN_OPTION_VALUE)
        throw new RangeError(
          `GLUON: Dropdown option value must be less than ${LIMITS.MAX_DROPDOWN_OPTION_VALUE} characters.`,
        );
      if (this.description && typeof this.description !== "string")
        throw new TypeError(
          "GLUON: Dropdown option description must be a string.",
        );
      if (
        this.description &&
        this.description.length > LIMITS.MAX_DROPDOWN_OPTION_DESCRIPTION
      )
        throw new RangeError(
          `GLUON: Dropdown option description must be less than ${LIMITS.MAX_DROPDOWN_OPTION_DESCRIPTION} characters.`,
        );
      if (this.emoji && typeof this.emoji !== "object")
        throw new TypeError("GLUON: Dropdown option emoji must be an object.");
      if (
        typeof this.default !== "undefined" &&
        typeof this.default !== "boolean"
      )
        throw new TypeError(
          "GLUON: Dropdown option default must be a boolean.",
        );
    }
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      default: {
        return {
          label: this.label as string, // only valid because of the validation above
          value: this.value as string, // only valid because of the validation above
          description: this.description,
          emoji: this.emoji,
          default: this.default,
        };
      }
    }
  }
}

export default DropdownOption;
