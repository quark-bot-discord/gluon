/**
 * Helps to create a choice for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure}
 */
declare class CommandChoice {
  defaultLocale: any;
  name: any;
  name_localizations: any;
  value: any;
  /**
   * Creates a choice for a command.
   */
  constructor();
  /**
   * Sets the name of the choice.
   * @param {String | Object} name Sets the name of the choice, or an object of names for localisation.
   * @returns {CommandChoice}
   */
  setName(name: any): this;
  /**
   * Sets the value of the choice.
   * @param {String} value Value of the choice.
   * @returns {CommandChoice}
   */
  setValue(value: any): this;
  /**
   * Sets the default locale for localisation.
   * @param {String?} locale Sets the default locale for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/reference#locales}
   */
  setDefaultLocale(locale: any): this;
  /**
   * Returns the correct Discord format for a command choice.
   * @returns {Object}
   */
  toJSON(
    format: number,
    {
      suppressValidation,
    }?: {
      suppressValidation: boolean;
    },
  ): {
    name: any;
    name_localizations: any;
    value: any;
  };
}
export default CommandChoice;
