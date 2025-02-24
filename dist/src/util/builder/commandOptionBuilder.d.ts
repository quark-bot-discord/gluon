/**
 * Helps to create a choice for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
 */
declare class CommandOption {
  autocomplete: any;
  channel_types: any;
  choices: any;
  defaultLocale: any;
  description: any;
  description_localizations: any;
  max_length: any;
  max_value: any;
  min_length: any;
  min_value: any;
  name: any;
  name_localizations: any;
  options: any;
  required: any;
  type: any;
  /**
   * Creates an option for a command.
   */
  constructor();
  /**
   * Sets the name of the option.
   * @param {String | Object} name Sets the name of the option, or an object of names for localisation.
   * @returns {CommandOption}
   */
  setName(name: any): this;
  /**
   * Sets the option type.
   * @param {Number} type The option type.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
   */
  setType(type: any): this;
  /**
   * Sets the description of the command choice.
   * @param {String | Object} description The description of the command choice, or an object of descriptions for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setDescription(description: any): this;
  /**
   * Sets whether the option is required.
   * @param {Boolean} isRequired Whether the option is required.
   * @returns {CommandOption}
   */
  setRequired(isRequired: any): this;
  /**
   * Adds a choice to the option.
   * @param {CommandChoice} choice Adds a choice to the option.
   * @returns {CommandOption}
   */
  addChoice(choice: any): this;
  /**
   * Adds an option to this option.
   * @param {CommandOption} option Adds an option to this option.
   * @returns {CommandOption}
   */
  addOption(option: any): this;
  /**
   * Sets which channel types are selectable by the user.
   * @param {Array<Number>} channelTypes An array of channel types to offer as a choice.
   * @returns {CommandOption}
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
   */
  setChannelTypes(channelTypes: any): this;
  /**
   * Sets the minimum value the user may enter.
   * @param {Number} value The minimum number value that the user may enter.
   * @returns {CommandOption}
   */
  setMinValue(value: any): this;
  /**
   * Sets the maximum value the user may enter.
   * @param {Number} value The maximum number value that the user may enter.
   * @returns {CommandOption}
   */
  setMaxValue(value: any): this;
  /**
   * Sets the minimum length the user may enter.
   * @param {Number} length The minimum length that the user may enter.
   * @returns {CommandOption}
   */
  setMinLength(length: any): this;
  /**
   * Sets the maximum length the user may enter.
   * @param {Number} length The maximum length that the user may enter.
   * @returns {CommandOption}
   */
  setMaxLength(length: any): this;
  /**
   * Sets whether autocomplete is enabled for this option.
   * @param {Boolean} autocomplete Whether autocomplete is enabled for this option.
   * @returns {CommandOption}
   */
  setAutocomplete(autocomplete: any): this;
  /**
   * Sets the default locale for localisation.
   * @param {String?} locale Sets the default locale for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/reference#locales}
   */
  setDefaultLocale(locale: any): this;
  /**
   * Returns the correct Discord format for a command option.
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
    type: any;
    description: any;
    description_localizations: any;
    required: any;
    choices: any;
    options: any;
    channel_types: any;
    min_value: any;
    max_value: any;
    min_length: any;
    max_length: any;
    autocomplete: any;
  };
}
export default CommandOption;
