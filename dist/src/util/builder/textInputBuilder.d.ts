export default TextInput;
/**
 * Helps to construct a text input interaction.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-structure}
 */
declare class TextInput {
    type: number;
    /**
     * Sets the text on the input label.
     * @param {String} label The text to display as a label to the input.
     * @returns {TextInput}
     */
    setLabel(label: string): TextInput;
    label: string;
    /**
     * Sets the style of the text input.
     * @param {Number} style The text input style.
     * @returns {TextInput}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-styles}
     */
    setStyle(style: number): TextInput;
    style: number;
    /**
     * Set the custom id of the text input.
     * @param {String} id The custom id of the text input.
     * @returns {TextInput}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
     */
    setCustomID(id: string): TextInput;
    custom_id: string;
    /**
     * Set the default value of the text input.
     * @param {String} value The value to pre-fill the text input with.
     * @returns {TextInput}
     */
    setValue(value: string): TextInput;
    value: string;
    /**
     * Set the placeholder text of the text input.
     * @param {String} placeholder Placeholder text for the text input.
     * @returns {TextInput}
     */
    setPlaceholder(placeholder: string): TextInput;
    placeholder: string;
    /**
     * Set the minimum response length the user may enter.
     * @param {Number} length Minimum user input length.
     * @returns {TextInput}
     */
    setMinLength(length: number): TextInput;
    min_length: number;
    /**
     * Set the maximum response length the user may enter.
     * @param {Number} length Maximum user input length.
     * @returns {TextInput}
     */
    setMaxLength(length: number): TextInput;
    max_length: number;
    /**
     * Returns the correct Discord format for a text input.
     * @returns {Object}
     */
    toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): any;
}
//# sourceMappingURL=textInputBuilder.d.ts.map