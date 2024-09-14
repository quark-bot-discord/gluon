export default DropdownOption;
/**
 * Helps to create a dropdown option.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
 */
declare class DropdownOption {
    /**
     * Sets the label.
     * @param {String} label Sets the label.
     * @returns {DropdownOption}
     */
    setLabel(label: string): DropdownOption;
    label: string;
    /**
     * Sets the value.
     * @param {String} value Sets the value.
     * @returns {DropdownOption}
     */
    setValue(value: string): DropdownOption;
    value: string;
    /**
     * Sets the description.
     * @param {String} description Sets the description.
     * @returns {DropdownOption}
     */
    setDescription(description: string): DropdownOption;
    description: string;
    /**
     * Sets the emoji to be displayed on the dropdown option.
     * @param {String} emoji The emoji to display on the dropdown option. For a custom emoji, it should be in the format "<:bitcoin:844240546246950922>".
     * @returns {DropdownOption}
     */
    setEmoji(emoji: string): DropdownOption;
    emoji: any;
    /**
     * Sets whether this is the default selected option.
     * @param {Boolean} isDefault Whether this option should be selected by default.
     * @returns {DropdownOption}
     */
    setDefault(isDefault: boolean): DropdownOption;
    default: boolean;
    /**
     * Returns the correct Discord format for a dropdown option.
     * @returns {Object}
     */
    toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): any;
}
//# sourceMappingURL=dropdownOption.d.ts.map