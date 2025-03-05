import { ComponentType, TextInputStyle } from "discord-api-types/v10";
import type { TextInputBuilder as TextInputBuilderType } from "typings/index.d.ts";
import { JsonTypes } from "../../../typings/enums.js";
/**
 * Helps to construct a text input interaction.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-structure}
 */
declare class TextInput implements TextInputBuilderType {
  custom_id: string | undefined;
  label: string | undefined;
  max_length: number | undefined;
  min_length: number | undefined;
  placeholder: string | undefined;
  required: boolean | undefined;
  style: TextInputStyle | undefined;
  type: ComponentType.TextInput;
  value: string | undefined;
  /**
   * Creates a text input.
   */
  constructor();
  /**
   * Sets the text on the input label.
   * @param {String} label The text to display as a label to the input.
   * @returns {TextInput}
   */
  setLabel(label: string): this;
  /**
   * Sets the style of the text input.
   * @param {Number} style The text input style.
   * @returns {TextInput}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-styles}
   */
  setStyle(style: TextInputStyle): this;
  /**
   * Set the custom id of the text input.
   * @param {String} id The custom id of the text input.
   * @returns {TextInput}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
   */
  setCustomID(id: string): this;
  /**
   * Set the default value of the text input.
   * @param {String} value The value to pre-fill the text input with.
   * @returns {TextInput}
   */
  setValue(value: string): this;
  /**
   * Set the placeholder text of the text input.
   * @param {String} placeholder Placeholder text for the text input.
   * @returns {TextInput}
   */
  setPlaceholder(placeholder: string): this;
  /**
   * Set the minimum response length the user may enter.
   * @param {Number} length Minimum user input length.
   * @returns {TextInput}
   */
  setMinLength(length: number): this;
  /**
   * Set the maximum response length the user may enter.
   * @param {Number} length Maximum user input length.
   * @returns {TextInput}
   */
  setMaxLength(length: number): this;
  /**
   * Returns the correct Discord format for a text input.
   * @returns {Object}
   */
  toJSON(
    format?: JsonTypes,
    {
      suppressValidation,
    }?: {
      suppressValidation?: boolean;
    },
  ): {
    type: ComponentType.TextInput;
    label: string;
    style: TextInputStyle;
    custom_id: string;
    value: string | undefined;
    placeholder: string | undefined;
    min_length: number | undefined;
    max_length: number | undefined;
  };
}
export default TextInput;
