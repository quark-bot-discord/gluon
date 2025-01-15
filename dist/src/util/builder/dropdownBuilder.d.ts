export default Dropdown;
/**
 * Helps to create a dropdown message component.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menus}
 */
declare class Dropdown {
    type: number;
    options: any[];
    default_values: any[];
    /**
     * Sets the option type.
     * @param {Number} type The option type.
     * @returns {Dropdown}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types}
     */
    setType(type: number): Dropdown;
    /**
     * Set the custom id of the dropdown.
     * @param {String} id The custom id of the dropdown.
     * @returns {Dropdown}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
     */
    setCustomID(id: string): Dropdown;
    custom_id: string;
    /**
     * Adds an option to the dropdown.
     * @param {DropdownOption} option Adds an option to the dropdown.
     * @returns {Dropdown}
     */
    addOption(option: DropdownOption): Dropdown;
    /**
     * Sets which channel types are selectable by the user.
     * @param {Array<Number>} channelTypes An array of channel types to offer as a choice.
     * @returns {Dropdown}
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
     */
    addChannelTypes(channelTypes: Array<number>): Dropdown;
    channel_types: number[];
    /**
     * Sets the placeholder text.
     * @param {String} placeholder Placeholder text if nothing is selected.
     * @returns {Dropdown}
     */
    setPlaceholder(placeholder: string): Dropdown;
    placeholder: string;
    /**
     * Sets the minimum value the user may enter.
     * @param {Number} value The minimum number value that the user may enter.
     * @returns {Dropdown}
     */
    setMinValue(value: number): Dropdown;
    min_values: number;
    /**
     * Sets the maximum value the user may enter.
     * @param {Number} value The maximum number value that the user may enter.
     * @returns {Dropdown}
     */
    setMaxValue(value: number): Dropdown;
    max_values: number;
    /**
     * Disables the dropdown from being clickable.
     * @param {Boolean} disabled Whether this dropdown should be displayed as disabled.
     * @returns {Dropdown}
     */
    setDisabled(isDisabled: any): Dropdown;
    disabled: boolean;
    /**
     * Adds a default option to the dropdown.
     * @param {Object} option The default option to add to the dropdown.
     * @returns {Dropdown}
     */
    addDefaultOption(option: any): Dropdown;
    /**
     * Returns the correct Discord format for a dropdown.
     * @returns {Object}
     */
    toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): any;
}
import DropdownOption from "./dropdownOption.js";
//# sourceMappingURL=dropdownBuilder.d.ts.map