export default Button;
/**
 * Helps to construct a button for a message.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-structure}
 */
declare class Button {
    type: number;
    /**
     * Sets the text on the button.
     * @param {String} label The text to display on the button.
     * @returns {Button}
     */
    setLabel(label: string): Button;
    label: string;
    /**
     * Sets the emoji to be displayed on the button.
     * @param {String} emoji The emoji to display on the button. For a custom emoji, it should be in the format "<:bitcoin:844240546246950922>".
     * @returns {Button}
     */
    setEmoji(emoji: string): Button;
    emoji: any;
    /**
     * Sets the style of the button.
     * @param {Number} style The button style.
     * @returns {Button}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-styles}
     */
    setStyle(style: number): Button;
    style: number;
    /**
     * Set the custom id of the button.
     * @param {String} id The custom id of the button.
     * @returns {Button}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
     */
    setCustomID(id: string): Button;
    custom_id: string;
    /**
     * Sets the url of the button.
     * @param {String} url The url for a link button.
     * @returns {Button}
     */
    setURL(url: string): Button;
    url: string;
    /**
     * Disables the button from being clickable.
     * @param {Boolean} disabled Whether this button should be displayed as disabled.
     * @returns {Button}
     */
    setDisabled(disabled: boolean): Button;
    disabled: boolean;
    /**
     * Returns the correct Discord format for a button.
     * @returns {Object}
     */
    toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): any;
}
//# sourceMappingURL=buttonBuilder.d.ts.map