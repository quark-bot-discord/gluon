import type {
  ResolvedEmoji,
  ButtonBuilder as ButtonBuilderType,
} from "typings/index.d.ts";
import { LIMITS } from "../../constants.js";
import resolveEmoji from "../discord/resolveEmoji.js";
import isValidUrl from "../general/isValidUrl.js";
import { ButtonStyle, ComponentType } from "#typings/discord.js";
import { JsonTypes } from "../../../typings/enums.js";

/**
 * Helps to construct a button for a message.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-structure}
 */
class Button implements ButtonBuilderType {
  custom_id: string | undefined;
  disabled: boolean | undefined;
  emoji: ResolvedEmoji | undefined;
  label: string | undefined;
  style: ButtonStyle = ButtonStyle.Primary;
  type: ComponentType.Button = ComponentType.Button;
  url: string | undefined;
  /**
   * Creates a button.
   */
  constructor() {
    this.type = ComponentType.Button;
  }

  /**
   * Sets the text on the button.
   * @param {String} label The text to display on the button.
   * @returns {Button}
   */
  setLabel(label: string) {
    if (!label) throw new TypeError("GLUON: Button label must be provided.");

    this.label =
      label && label.length > LIMITS.MAX_BUTTON_LABEL
        ? `${label.substring(0, LIMITS.MAX_BUTTON_LABEL - 3)}...`
        : label;

    return this;
  }

  /**
   * Sets the emoji to be displayed on the button.
   * @param {String} emoji The emoji to display on the button. For a custom emoji, it should be in the format "<:bitcoin:844240546246950922>".
   * @returns {Button}
   */
  setEmoji(emoji: string) {
    this.emoji = resolveEmoji(emoji) ?? undefined;

    if (!this.emoji)
      throw new TypeError("GLUON: Button emoji must be provided.");

    return this;
  }

  /**
   * Sets the style of the button.
   * @param {Number} style The button style.
   * @returns {Button}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-styles}
   */
  setStyle(style: ButtonStyle) {
    if (!style) throw new TypeError("GLUON: Button style must be provided.");

    this.style = style;

    return this;
  }

  /**
   * Set the custom id of the button.
   * @param {String} id The custom id of the button.
   * @returns {Button}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
   */
  setCustomID(id: string) {
    if (!id)
      throw new TypeError(
        "GLUON: Button custom id must be provided for non-link buttons.",
      );

    if (id.length > LIMITS.MAX_BUTTON_CUSTOM_ID)
      throw new RangeError(
        `GLUON: Button custom id must be under ${LIMITS.MAX_BUTTON_CUSTOM_ID} characters.`,
      );

    this.custom_id = id;

    return this;
  }

  /**
   * Sets the url of the button.
   * @param {String} url The url for a link button.
   * @returns {Button}
   */
  setURL(url: string) {
    this.url = url;

    return this;
  }

  /**
   * Disables the button from being clickable.
   * @param {Boolean} disabled Whether this button should be displayed as disabled.
   * @returns {Button}
   */
  setDisabled(disabled: boolean) {
    this.disabled = disabled;

    return this;
  }

  /**
   * Returns the correct Discord format for a button.
   * @returns {Object}
   */
  toJSON(
    format?: JsonTypes,
    { suppressValidation = false }: { suppressValidation: boolean } = {
      suppressValidation: false,
    },
  ) {
    if (suppressValidation !== true) {
      if (!this.label)
        throw new TypeError("GLUON: Button label must be provided.");
      if (typeof this.label !== "string")
        throw new TypeError("GLUON: Button label must be a string.");
      if (this.label.length > LIMITS.MAX_BUTTON_LABEL)
        throw new RangeError(
          `GLUON: Button label must be less than ${LIMITS.MAX_BUTTON_LABEL} characters.`,
        );
      if (typeof this.style !== "number")
        throw new TypeError("GLUON: Button style must be a number.");
      if (this.style === ButtonStyle.Link && !this.url)
        throw new TypeError(
          "GLUON: Button url must be provided for link buttons.",
        );
      if (this.style !== ButtonStyle.Link && !this.custom_id)
        throw new TypeError(
          "GLUON: Button custom id must be provided for non-link buttons.",
        );
      if (this.style === ButtonStyle.Link && this.custom_id)
        throw new TypeError(
          "GLUON: Button custom id must not be provided for link buttons.",
        );
      if (this.style !== ButtonStyle.Link && this.url)
        throw new TypeError(
          "GLUON: Button url must not be provided for non-link buttons.",
        );
      if (this.style === ButtonStyle.Link && this.emoji)
        throw new TypeError(
          "GLUON: Button emoji must not be provided for link buttons.",
        );
      if (this.type !== ComponentType.Button)
        throw new TypeError("GLUON: Button type must be set to 'BUTTON'.");
      if (this.emoji && typeof this.emoji !== "object")
        throw new TypeError("GLUON: Button emoji must be an object.");
      if (this.custom_id && typeof this.custom_id !== "string")
        throw new TypeError("GLUON: Button custom id must be a string.");
      if (this.custom_id && this.custom_id.length > LIMITS.MAX_BUTTON_CUSTOM_ID)
        throw new RangeError(
          `GLUON: Button custom id must be less than ${LIMITS.MAX_BUTTON_CUSTOM_ID} characters.`,
        );
      if (this.url && typeof this.url !== "string")
        throw new TypeError("GLUON: Button url must be a string.");
      if (this.url && !isValidUrl(this.url))
        throw new TypeError("GLUON: Button url must be a valid url.");
      if (
        typeof this.disabled !== "undefined" &&
        typeof this.disabled !== "boolean"
      )
        throw new TypeError("GLUON: Button disabled must be a boolean.");
    }
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      default: {
        return {
          type: this.type,
          label: this.label,
          emoji: this.emoji,
          style: this.style,
          custom_id: this.custom_id,
          url: this.url,
          disabled: this.disabled,
        };
      }
    }
  }
}

export default Button;
