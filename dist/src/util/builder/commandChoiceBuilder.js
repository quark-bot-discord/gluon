import { Locale } from "discord-api-types/v10";
import { LIMITS } from "../../constants.js";
import { JsonTypes } from "../../../typings/enums.js";
/**
 * Helps to create a choice for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure}
 */
class CommandChoice {
  /**
   * Creates a choice for a command.
   */
  constructor() {
    this.name_localizations = {};
    this.defaultLocale = Locale.EnglishUS;
  }
  /**
   * Sets the name of the choice.
   * @param {String | Object} name Sets the name of the choice, or an object of names for localisation.
   * @returns {CommandChoice}
   */
  setName(name) {
    if (!name)
      throw new TypeError("GLUON: Command choice name must be provided.");
    if (typeof name != "string" && typeof name != "object")
      throw new TypeError(
        "GLUON: Command choice name must be a string or an object.",
      );
    if (typeof name == "object") {
      if (
        name[this.defaultLocale].length > LIMITS.MAX_COMMAND_OPTION_CHOICE_NAME
      )
        throw new RangeError(
          `GLUON: Command choice name must be less than ${LIMITS.MAX_COMMAND_OPTION_CHOICE_NAME} characters.`,
        );
      this.name = name[this.defaultLocale];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [this.defaultLocale]: _, ...rest } = name;
      this.name_localizations = rest;
      this.name_localizations = name;
    } else {
      if (name.length > LIMITS.MAX_COMMAND_OPTION_CHOICE_NAME)
        throw new RangeError(
          `GLUON: Command choice name must be less than ${LIMITS.MAX_COMMAND_OPTION_CHOICE_NAME} characters.`,
        );
      this.name = name;
    }
    return this;
  }
  /**
   * Sets the value of the choice.
   * @param {String} value Value of the choice.
   * @returns {CommandChoice}
   */
  setValue(value) {
    if (!value)
      throw new TypeError("GLUON: Command choice value must be provided.");
    if (value.length > LIMITS.MAX_COMMAND_OPTION_CHOICE_VALUE)
      throw new RangeError(
        `GLUON: Command choice value must be less than ${LIMITS.MAX_COMMAND_OPTION_CHOICE_VALUE} characters.`,
      );
    this.value = value;
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
   * Returns the correct Discord format for a command choice.
   * @returns {Object}
   */
  toJSON(
    format,
    { suppressValidation = false } = {
      suppressValidation: false,
    },
  ) {
    if (suppressValidation !== true) {
      if (!this.name)
        throw new TypeError("GLUON: Command choice name must be provided.");
      if (typeof this.name !== "string")
        throw new TypeError("GLUON: Command choice name must be a string.");
      if (
        this.name.length > LIMITS.MAX_COMMAND_OPTION_CHOICE_NAME ||
        this.name.length < LIMITS.MIN_COMMAND_OPTION_CHOICE_NAME
      )
        throw new RangeError(
          `GLUON: Command choice name must be between ${LIMITS.MIN_COMMAND_OPTION_CHOICE_NAME} and ${LIMITS.MAX_COMMAND_OPTION_CHOICE_NAME} characters.`,
        );
      if (!this.value)
        throw new TypeError("GLUON: Command choice value must be provided.");
      if (typeof this.value !== "string" && typeof this.value !== "number")
        throw new TypeError(
          "GLUON: Command choice value must be a string or a number.",
        );
      if (
        typeof this.value === "string" &&
        (this.value.length > LIMITS.MAX_COMMAND_OPTION_CHOICE_VALUE ||
          this.value.length < LIMITS.MIN_COMMAND_OPTION_CHOICE_VALUE)
      )
        throw new RangeError(
          `GLUON: Command choice value must be between ${LIMITS.MIN_COMMAND_OPTION_CHOICE_VALUE} and ${LIMITS.MAX_COMMAND_OPTION_CHOICE_VALUE} characters.`,
        );
      if (
        this.name_localizations &&
        typeof this.name_localizations !== "object"
      )
        throw new TypeError(
          "GLUON: Command choice name localizations must be an object.",
        );
      if (
        this.name_localizations &&
        !Object.values(this.name_localizations).every(
          (v) =>
            typeof v === "string" &&
            v.length >= LIMITS.MIN_COMMAND_OPTION_CHOICE_NAME &&
            v.length <= LIMITS.MAX_COMMAND_OPTION_CHOICE_NAME,
        )
      )
        throw new RangeError(
          `GLUON: Command choice name localizations must be a string between ${LIMITS.MIN_COMMAND_OPTION_CHOICE_NAME} and ${LIMITS.MAX_COMMAND_OPTION_CHOICE_NAME} characters.`,
        );
    }
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      default: {
        return {
          name: this.name, // only valid due to validation above
          name_localizations: this.name_localizations,
          value: this.value, // only valid due to validation above
        };
      }
    }
  }
}
export default CommandChoice;
//# sourceMappingURL=commandChoiceBuilder.js.map
