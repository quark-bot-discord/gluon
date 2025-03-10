import type {
  ResolvedEmoji,
  ButtonBuilder as ButtonBuilderType,
} from "typings/index.d.ts";
import { ButtonStyle, ComponentType } from "#typings/discord.js";
import { JsonTypes } from "../../../typings/enums.js";
/**
 * Helps to construct a button for a message.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-structure}
 */
declare class Button implements ButtonBuilderType {
  custom_id: string | undefined;
  disabled: boolean | undefined;
  emoji: ResolvedEmoji | undefined;
  label: string | undefined;
  style: ButtonStyle;
  type: ComponentType.Button;
  url: string | undefined;
  /**
   * Creates a button.
   */
  constructor();
  /**
   * Sets the text on the button.
   * @param {String} label The text to display on the button.
   * @returns {Button}
   */
  setLabel(label: string): this;
  /**
   * Sets the emoji to be displayed on the button.
   * @param {String} emoji The emoji to display on the button. For a custom emoji, it should be in the format "<:bitcoin:844240546246950922>".
   * @returns {Button}
   */
  setEmoji(emoji: string): this;
  /**
   * Sets the style of the button.
   * @param {Number} style The button style.
   * @returns {Button}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-styles}
   */
  setStyle(style: ButtonStyle): this;
  /**
   * Set the custom id of the button.
   * @param {String} id The custom id of the button.
   * @returns {Button}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
   */
  setCustomID(id: string): this;
  /**
   * Sets the url of the button.
   * @param {String} url The url for a link button.
   * @returns {Button}
   */
  setURL(url: string): this;
  /**
   * Disables the button from being clickable.
   * @param {Boolean} disabled Whether this button should be displayed as disabled.
   * @returns {Button}
   */
  setDisabled(disabled: boolean): this;
  /**
   * Returns the correct Discord format for a button.
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
    type: ComponentType.Button;
    label: string | undefined;
    emoji: ResolvedEmoji | undefined;
    style: ButtonStyle;
    custom_id: string | undefined;
    url: string | undefined;
    disabled: boolean | undefined;
  };
}
export default Button;
