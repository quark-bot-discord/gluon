import { LIMITS } from "../../constants.js";

/**
 * Helps to create a choice for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
 */
class CommandOption {
  /**
   * Creates an option for a command.
   */
  constructor() {
    this.choices = [];

    this.options = [];

    this.defaultLocale = "en-US";
  }

  /**
   * Sets the name of the option.
   * @param {String | Object} name Sets the name of the option, or an object of names for localisation.
   * @returns {CommandOption}
   */
  setName(name) {
    if (!name)
      throw new TypeError("GLUON: Command option name must be provided.");

    if (typeof name != "string" && typeof name != "object")
      throw new TypeError(
        "GLUON: Command option name must be a string or an object.",
      );

    if (typeof name == "object") {
      if (name[this.defaultLocale].length > LIMITS.MAX_COMMAND_OPTION_NAME)
        throw new RangeError(
          `GLUON: Command option name must be less than ${LIMITS.MAX_COMMAND_OPTION_NAME} characters.`,
        );

      this.name = name[this.defaultLocale];

      delete name[this.defaultLocale];

      this.name_localizations = name;
    } else {
      if (name.length > LIMITS.MAX_COMMAND_OPTION_NAME)
        throw new RangeError(
          `GLUON: Command option name must be less than ${LIMITS.MAX_COMMAND_OPTION_NAME} characters.`,
        );

      this.name = name;
    }

    return this;
  }

  /**
   * Sets the option type.
   * @param {Number} type The option type.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
   */
  setType(type) {
    if (typeof type != "number")
      throw new TypeError("GLUON: Command option type must be a number.");

    this.type = type;

    return this;
  }

  /**
   * Sets the description of the command choice.
   * @param {String | Object} description The description of the command choice, or an object of descriptions for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setDescription(description) {
    if (!description)
      throw new TypeError(
        "GLUON: Command option description must be provided.",
      );

    if (typeof description != "string" && typeof description != "object")
      throw new TypeError(
        "GLUON: Command option description must be a string or an object.",
      );

    if (typeof description == "object") {
      if (
        description[this.defaultLocale].length >
        LIMITS.MAX_COMMAND_OPTION_DESCRIPTION
      )
        throw new RangeError(
          `GLUON: Command option description must be less than ${LIMITS.MAX_COMMAND_OPTION_DESCRIPTION} characters.`,
        );

      this.description = description[this.defaultLocale];

      delete description[this.defaultLocale];

      this.description_localizations = description;
    } else {
      if (description.length > LIMITS.MAX_COMMAND_OPTION_DESCRIPTION)
        throw new RangeError(
          `GLUON: Command option description must be less than ${LIMITS.MAX_COMMAND_OPTION_DESCRIPTION} characters.`,
        );

      this.description = description;
    }

    return this;
  }

  /**
   * Sets whether the option is required.
   * @param {Boolean} isRequired Whether the option is required.
   * @returns {CommandOption}
   */
  setRequired(isRequired) {
    if (typeof isRequired != "boolean")
      throw new TypeError(
        "GLUON: Command option required status must be a boolean.",
      );

    this.required = isRequired;

    return this;
  }

  /**
   * Adds a choice to the option.
   * @param {CommandChoice} choice Adds a choice to the option.
   * @returns {CommandOption}
   */
  addChoice(choice) {
    if (this.choices.length >= LIMITS.MAX_COMMAND_OPTION_CHOICES)
      throw new RangeError(
        `GLUON: Command option choices must be less than ${LIMITS.MAX_COMMAND_OPTION_CHOICES}.`,
      );

    if (!choice)
      throw new TypeError("GLUON: Command option choice must be provided.");

    this.choices.push(choice);

    return this;
  }

  /**
   * Adds an option to this option.
   * @param {CommandOption} option Adds an option to this option.
   * @returns {CommandOption}
   */
  addOption(option) {
    if (this.options.length >= LIMITS.MAX_COMMAND_OPTIONS)
      throw new RangeError(
        `GLUON: Command option options must be less than ${LIMITS.MAX_COMMAND_OPTIONS}.`,
      );

    if (!option) throw new TypeError("GLUON: Command option must be provided.");

    this.options.push(option);

    return this;
  }

  /**
   * Sets which channel types are selectable by the user.
   * @param {Array<Number>} channelTypes An array of channel types to offer as a choice.
   * @returns {CommandOption}
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
   */
  setChannelTypes(channelTypes) {
    if (!channelTypes)
      throw new TypeError(
        "GLUON: Command option channel types must be provided.",
      );

    if (!Array.isArray(channelTypes))
      throw new TypeError(
        "GLUON: Command option channel types must be an array.",
      );

    this.channel_types = channelTypes;

    return this;
  }

  /**
   * Sets the minimum value the user may enter.
   * @param {Number} value The minimum number value that the user may enter.
   * @returns {CommandOption}
   */
  setMinValue(value) {
    if (typeof value != "number")
      throw new TypeError("GLUON: Command option min value must be a number.");

    this.min_value = value;

    return this;
  }

  /**
   * Sets the maximum value the user may enter.
   * @param {Number} value The maximum number value that the user may enter.
   * @returns {CommandOption}
   */
  setMaxValue(value) {
    if (typeof value != "number")
      throw new TypeError("GLUON: Command option max value must be a number.");

    this.max_value = value;

    return this;
  }

  /**
   * Sets the minimum length the user may enter.
   * @param {Number} length The minimum length that the user may enter.
   * @returns {CommandOption}
   */
  setMinLength(length) {
    if (typeof length != "number")
      throw new TypeError("GLUON: Command option min length must be a number.");

    this.min_length = length;

    return this;
  }

  /**
   * Sets the maximum length the user may enter.
   * @param {Number} length The maximum length that the user may enter.
   * @returns {CommandOption}
   */
  setMaxLength(length) {
    if (typeof length != "number")
      throw new TypeError("GLUON: Command option max length must be a number.");

    this.max_length = length;

    return this;
  }

  /**
   * Sets whether autocomplete is enabled for this option.
   * @param {Boolean} autocomplete Whether autocomplete is enabled for this option.
   * @returns {CommandOption}
   */
  setAutocomplete(autocomplete) {
    if (typeof autocomplete != "boolean")
      throw new TypeError(
        "GLUON: Command option autocomplete must be a boolean.",
      );

    this.autocomplete = autocomplete;

    return this;
  }

  /**
   * Sets the default locale for localisation.
   * @param {String?} locale Sets the default locale for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/reference#locales}
   */
  setDefaultLocale(locale) {
    if (!locale) throw new TypeError("GLUON: Default locale must be provided.");

    this.defaultLocale = locale;

    return this;
  }

  /**
   * Returns the correct Discord format for a command option.
   * @returns {Object}
   */
  toJSON() {
    if (!this.name)
      throw new TypeError("GLUON: Command option name must be provided.");
    if (!this.type)
      throw new TypeError("GLUON: Command option type must be provided.");
    if (!this.description)
      throw new TypeError(
        "GLUON: Command option description must be provided.",
      );
    return {
      name: this.name,
      name_localizations: this.name_localizations,
      type: this.type,
      description: this.description,
      description_localizations: this.description_localizations,
      required: this.required,
      choices: this.choices,
      options: this.options,
      channel_types: this.channel_types,
      min_value: this.min_value,
      max_value: this.max_value,
      min_length: this.min_length,
      max_length: this.max_length,
      autocomplete: this.autocomplete,
    };
  }
}

export default CommandOption;
