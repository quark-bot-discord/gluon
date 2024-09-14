export default CommandOption;
/**
 * Helps to create a choice for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
 */
declare class CommandOption {
    choices: any[];
    options: any[];
    defaultLocale: string;
    /**
     * Sets the name of the option.
     * @param {String | Object} name Sets the name of the option, or an object of names for localisation.
     * @returns {CommandOption}
     */
    setName(name: string | any): CommandOption;
    name: any;
    name_localizations: any;
    /**
     * Sets the option type.
     * @param {Number} type The option type.
     * @returns {Command}
     * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
     */
    setType(type: number): Command;
    type: number;
    /**
     * Sets the description of the command choice.
     * @param {String | Object} description The description of the command choice, or an object of descriptions for localisation.
     * @returns {Command}
     * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
     */
    setDescription(description: string | any): Command;
    description: any;
    description_localizations: any;
    /**
     * Sets whether the option is required.
     * @param {Boolean} isRequired Whether the option is required.
     * @returns {CommandOption}
     */
    setRequired(isRequired: boolean): CommandOption;
    required: boolean;
    /**
     * Adds a choice to the option.
     * @param {CommandChoice} choice Adds a choice to the option.
     * @returns {CommandOption}
     */
    addChoice(choice: CommandChoice): CommandOption;
    /**
     * Adds an option to this option.
     * @param {CommandOption} option Adds an option to this option.
     * @returns {CommandOption}
     */
    addOption(option: CommandOption): CommandOption;
    /**
     * Sets which channel types are selectable by the user.
     * @param {Array<Number>} channelTypes An array of channel types to offer as a choice.
     * @returns {CommandOption}
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
     */
    setChannelTypes(channelTypes: Array<number>): CommandOption;
    channel_types: number[];
    /**
     * Sets the minimum value the user may enter.
     * @param {Number} value The minimum number value that the user may enter.
     * @returns {CommandOption}
     */
    setMinValue(value: number): CommandOption;
    min_value: number;
    /**
     * Sets the maximum value the user may enter.
     * @param {Number} value The maximum number value that the user may enter.
     * @returns {CommandOption}
     */
    setMaxValue(value: number): CommandOption;
    max_value: number;
    /**
     * Sets the minimum length the user may enter.
     * @param {Number} length The minimum length that the user may enter.
     * @returns {CommandOption}
     */
    setMinLength(length: number): CommandOption;
    min_length: number;
    /**
     * Sets the maximum length the user may enter.
     * @param {Number} length The maximum length that the user may enter.
     * @returns {CommandOption}
     */
    setMaxLength(length: number): CommandOption;
    max_length: number;
    /**
     * Sets whether autocomplete is enabled for this option.
     * @param {Boolean} autocomplete Whether autocomplete is enabled for this option.
     * @returns {CommandOption}
     */
    setAutocomplete(autocomplete: boolean): CommandOption;
    autocomplete: boolean;
    /**
     * Sets the default locale for localisation.
     * @param {String?} locale Sets the default locale for localisation.
     * @returns {Command}
     * @see {@link https://discord.com/developers/docs/reference#locales}
     */
    setDefaultLocale(locale: string | null): Command;
    /**
     * Returns the correct Discord format for a command option.
     * @returns {Object}
     */
    toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): any;
}
//# sourceMappingURL=commandOptionBuilder.d.ts.map