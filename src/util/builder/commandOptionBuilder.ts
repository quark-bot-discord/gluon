import {
  ApplicationCommandOptionType,
  ChannelType,
  Locale,
} from "discord-api-types/v10";
import {
  APPLICATION_COMMAND_TYPES,
  COMMAND_NAME_REGEX,
  LIMITS,
} from "../../constants.js";
import {
  CommandOptionDescriptionLocalizations,
  CommandOptionNameLocalizations,
  CommandChoiceBuilder as CommandChoiceBuilderType,
  JsonTypes,
  CommandOptionBuilder as CommandOptionBuilderType,
} from "typings/index.js";

/**
 * Helps to create a choice for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
 */
class CommandOption implements CommandOptionBuilderType {
  autocomplete: boolean = false;
  channel_types?: ChannelType[];
  choices: CommandChoiceBuilderType[] = [];
  defaultLocale: Locale;
  description?: string;
  description_localizations?: CommandOptionDescriptionLocalizations;
  max_length?: number;
  max_value?: number;
  min_length?: number;
  min_value?: number;
  name?: string;
  name_localizations?: CommandOptionNameLocalizations;
  options: CommandOptionBuilderType[] = [];
  required?: boolean;
  type?: ApplicationCommandOptionType;
  /**
   * Creates an option for a command.
   */
  constructor() {
    this.choices = [];

    this.options = [];

    this.defaultLocale = Locale.EnglishUS;
  }

  /**
   * Sets the name of the option.
   * @param {String | Object} name Sets the name of the option, or an object of names for localisation.
   * @returns {CommandOption}
   */
  setName(name: string | CommandOptionNameLocalizations) {
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [this.defaultLocale]: _, ...rest } = name;
      this.name_localizations = rest;

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
  setType(type: ApplicationCommandOptionType) {
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
  setDescription(description: string | CommandOptionDescriptionLocalizations) {
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [this.defaultLocale]: _, ...rest } = description;
      this.description_localizations = rest;

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
  setRequired(isRequired: boolean) {
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
  addChoice(choice: CommandChoiceBuilderType) {
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
  addOption(option: CommandOptionBuilderType) {
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
  setChannelTypes(channelTypes: ChannelType[]) {
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
  setMinValue(value: number) {
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
  setMaxValue(value: number) {
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
  setMinLength(length: number) {
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
  setMaxLength(length: number) {
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
  setAutocomplete(autocomplete: boolean) {
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
  setDefaultLocale(locale: Locale) {
    if (!locale) throw new TypeError("GLUON: Default locale must be provided.");

    this.defaultLocale = locale;

    return this;
  }

  /**
   * Returns the correct Discord format for a command option.
   * @returns {Object}
   */
  toJSON(
    format?: JsonTypes,
    { suppressValidation = false }: { suppressValidation: boolean } = {
      suppressValidation: false,
    },
  ) {
    if (suppressValidation !== true) {
      if (!this.name)
        throw new TypeError("GLUON: Command option name must be provided.");
      if (typeof this.name !== "string")
        throw new TypeError("GLUON: Command option name must be a string.");
      if (
        this.name.length > LIMITS.MAX_COMMAND_OPTION_NAME ||
        this.name.length < LIMITS.MIN_COMMAND_OPTION_NAME
      )
        throw new RangeError(
          `GLUON: Command option name must be between ${LIMITS.MIN_COMMAND_OPTION_NAME} and ${LIMITS.MAX_COMMAND_OPTION_NAME} characters.`,
        );
      if (!this.type)
        throw new TypeError("GLUON: Command option type must be provided.");
      if (typeof this.type !== "number")
        throw new TypeError("GLUON: Command option type must be a number.");
      if (
        (this.type === APPLICATION_COMMAND_TYPES.CHAT_INPUT ||
          typeof this.type === "undefined") &&
        !COMMAND_NAME_REGEX.test(this.name)
      )
        throw new TypeError("GLUON: Command option name must match the regex.");
      if (!this.description)
        throw new TypeError(
          "GLUON: Command option description must be provided.",
        );
      if (typeof this.description !== "string")
        throw new TypeError(
          "GLUON: Command option description must be a string.",
        );
      if (
        this.description.length > LIMITS.MAX_COMMAND_OPTION_DESCRIPTION ||
        this.description.length < LIMITS.MIN_COMMAND_OPTION_DESCRIPTION
      )
        throw new RangeError(
          `GLUON: Command option description must be less than ${LIMITS.MAX_COMMAND_OPTION_DESCRIPTION} characters.`,
        );
      if (
        this.name_localizations &&
        typeof this.name_localizations !== "object"
      )
        throw new TypeError(
          "GLUON: Command option name localizations must be an object.",
        );
      if (
        this.name_localizations &&
        !Object.values(this.name_localizations).every(
          (v) =>
            typeof v === "string" &&
            v.length >= LIMITS.MIN_COMMAND_OPTION_NAME &&
            v.length <= LIMITS.MAX_COMMAND_OPTION_NAME,
        )
      )
        throw new RangeError(
          `GLUON: Command option name localizations must be a string between ${LIMITS.MIN_COMMAND_OPTION_NAME} and ${LIMITS.MAX_COMMAND_OPTION_NAME} characters.`,
        );
      if (
        this.description_localizations &&
        typeof this.description_localizations !== "object"
      )
        throw new TypeError(
          "GLUON: Command option description localizations must be an object.",
        );
      if (
        this.description_localizations &&
        !Object.values(this.description_localizations).every(
          (v) =>
            typeof v === "string" &&
            v.length >= LIMITS.MIN_COMMAND_OPTION_DESCRIPTION &&
            v.length <= LIMITS.MAX_COMMAND_OPTION_DESCRIPTION,
        )
      )
        throw new RangeError(
          `GLUON: Command option description localizations must be a string between ${LIMITS.MIN_COMMAND_OPTION_DESCRIPTION} and ${LIMITS.MAX_COMMAND_OPTION_DESCRIPTION} characters.`,
        );
      if (
        typeof this.required !== "undefined" &&
        typeof this.required !== "boolean"
      )
        throw new TypeError(
          "GLUON: Command option required status must be a boolean.",
        );
      if (this.choices && !Array.isArray(this.choices))
        throw new TypeError("GLUON: Command option choices must be an array.");
      if (
        this.choices &&
        this.choices.length > LIMITS.MAX_COMMAND_OPTION_CHOICES
      )
        throw new RangeError(
          `GLUON: Command option choices must be less than ${LIMITS.MAX_COMMAND_OPTION_CHOICES}.`,
        );
      if (this.options && !Array.isArray(this.options))
        throw new TypeError("GLUON: Command option options must be an array.");
      if (this.options && this.options.length > LIMITS.MAX_COMMAND_OPTIONS)
        throw new RangeError(
          `GLUON: Command option options must be less than ${LIMITS.MAX_COMMAND_OPTIONS}.`,
        );
      if (this.channel_types && !Array.isArray(this.channel_types))
        throw new TypeError(
          "GLUON: Command option channel types must be an array.",
        );
      if (
        typeof this.min_value !== "undefined" &&
        typeof this.min_value !== "number"
      )
        throw new TypeError(
          "GLUON: Command option min value must be a number.",
        );
      if (
        typeof this.max_value !== "undefined" &&
        typeof this.max_value !== "number"
      )
        throw new TypeError(
          "GLUON: Command option max value must be a number.",
        );
      if (
        typeof this.min_length !== "undefined" &&
        typeof this.min_length !== "number"
      )
        throw new TypeError(
          "GLUON: Command option min length must be a number.",
        );
      if (
        typeof this.min_length !== "undefined" &&
        (this.min_length < LIMITS.MIN_MIN_COMMAND_OPTION_LENGTH ||
          this.min_length > LIMITS.MAX_MIN_COMMAND_OPTION_LENGTH)
      )
        throw new RangeError(
          `GLUON: Command option min length must be between ${LIMITS.MIN_MIN_COMMAND_OPTION_LENGTH} and ${LIMITS.MAX_MIN_COMMAND_OPTION_LENGTH}.`,
        );
      if (
        typeof this.max_length !== "undefined" &&
        typeof this.max_length !== "number"
      )
        throw new TypeError(
          "GLUON: Command option max length must be a number.",
        );
      if (
        typeof this.max_length !== "undefined" &&
        (this.max_length < LIMITS.MIN_MAX_COMMAND_OPTION_LENGTH ||
          this.max_length > LIMITS.MAX_MAX_COMMAND_OPTION_LENGTH)
      )
        throw new RangeError(
          `GLUON: Command option max length must be between ${LIMITS.MIN_MAX_COMMAND_OPTION_LENGTH} and ${LIMITS.MAX_MAX_COMMAND_OPTION_LENGTH}.`,
        );
      if (
        typeof this.autocomplete !== "undefined" &&
        typeof this.autocomplete !== "boolean"
      )
        throw new TypeError(
          "GLUON: Command option autocomplete must be a boolean.",
        );
    }
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      default: {
        return {
          name: this.name as string, // only valid due to validation above
          name_localizations: this.name_localizations,
          type: this.type as ApplicationCommandOptionType, // only valid due to validation above
          description: this.description as string, // only valid due to validation above
          description_localizations: this.description_localizations,
          required: this.required,
          choices: this.choices
            ? this.choices.map((c) => c.toJSON(format))
            : [],
          options: this.options
            ? this.options.map((o) => o.toJSON(format))
            : [],
          channel_types: this.channel_types,
          min_value: this.min_value,
          max_value: this.max_value,
          min_length: this.min_length,
          max_length: this.max_length,
          autocomplete: this.autocomplete,
        };
      }
    }
  }
}

export default CommandOption;
