export default CommandChoice;
/**
 * Helps to create a choice for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure}
 */
declare class CommandChoice {
    defaultLocale: string;
    /**
     * Sets the name of the choice.
     * @param {String | Object} name Sets the name of the choice, or an object of names for localisation.
     * @returns {CommandChoice}
     */
    setName(name: string | any): CommandChoice;
    name: any;
    name_localizations: any;
    /**
     * Sets the value of the choice.
     * @param {String} value Value of the choice.
     * @returns {CommandChoice}
     */
    setValue(value: string): CommandChoice;
    value: string;
    /**
     * Sets the default locale for localisation.
     * @param {String?} locale Sets the default locale for localisation.
     * @returns {Command}
     * @see {@link https://discord.com/developers/docs/reference#locales}
     */
    setDefaultLocale(locale: string | null): Command;
    /**
     * Returns the correct Discord format for a command choice.
     * @returns {Object}
     */
    toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): any;
}
//# sourceMappingURL=commandChoiceBuilder.d.ts.map