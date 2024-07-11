/**
 * Helps to create a choice for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure}
 */
class CommandChoice {
  /**
   * Creates a choice for a command.
   */
  constructor() {
    this.defaultLocale = "en-US";
  }

  /**
   * Sets the name of the choice.
   * @param {String | Object} name Sets the name of the choice, or an object of names for localisation.
   * @returns {CommandChoice}
   */
  setName(name) {
    if (typeof name == "object") {
      this.name = name[this.defaultLocale];

      delete name[this.defaultLocale];

      this.name_localizations = name;
    } else this.name = name;

    return this;
  }

  /**
   * Sets the value of the choice.
   * @param {String} value Value of the choice.
   * @returns {CommandChoice}
   */
  setValue(value) {
    this.value = value;

    return this;
  }

  /**
   * Sets the default locale for localisation.
   * @param {String?} locale Sets the default locale for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/reference#locales}
   */
  setDefaultLocale(locale = "en-US") {
    this.defaultLocale = locale;

    return this;
  }

  /**
   * Returns the correct Discord format for a command choice.
   * @returns {Object}
   */
  toJSON() {
    return {
      name: this.name,
      name_localizations: this.name_localizations,
      value: this.value,
    };
  }
}

module.exports = CommandChoice;
