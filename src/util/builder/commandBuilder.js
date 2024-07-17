const { APPLICATION_COMMAND_TYPES } = require("../../constants");

/**
 * Structure for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
 */
class Command {
  /**
   * Creates the structure for a command.
   */
  constructor() {
    this.type = APPLICATION_COMMAND_TYPES.CHAT_INPUT;

    this.contexts = [0];

    this.options = [];

    this.defaultLocale = "en-US";
  }

  /**
   * Sets the name of the command.
   * @param {String | Object} name The name of the command or an object of names for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setName(name) {
    if (!name) throw new TypeError("GLUON: Command name must be provided.");

    if (typeof name == "object") {
      this.name = name[this.defaultLocale];

      delete name[this.defaultLocale];

      this.name_localizations = name;
    } else this.name = name;

    return this;
  }

  /**
   * Sets the command type.
   * @param {Number} type The command type.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}
   */
  setType(type) {
    this.type = type;

    return this;
  }

  /**
   * Sets the description of the command.
   * @param {String | Object} description The description of the command, or an object of descriptions for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setDescription(description) {
    if (!description)
      throw new TypeError("GLUON: Command description must be provided.");

    if (typeof description == "object") {
      this.description = description[this.defaultLocale];

      delete description[this.defaultLocale];

      this.description_localizations = description;
    } else this.description = description;

    return this;
  }

  /**
   * Sets the permission needed to use the command.
   * @param {Number | BigInt | String} permissions The permissions required to be able to use this command.
   * @returns {Command}
   */
  setDefaultMemberPermissions(permissions) {
    if (typeof permissions != "number")
      throw new TypeError(
        "GLUON: Command default permission must be a number.",
      );

    this.default_member_permissions = permissions;

    return this;
  }

  /**
   * Sets whether this command is NSFW.
   * @param {Boolean} nsfw Whether this command is NSFW.
   * @returns {Command}
   */
  setNsfw(nsfw) {
    this.nsfw = nsfw;

    return this;
  }

  /**
   * Adds an option to the command.
   * @param {CommandOption} option Adds an option to the command.
   * @returns {Command}
   */
  addOption(option) {
    this.options.push(option);

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
   * Returns the correct Discord format for a command.
   * @returns {Object}
   */
  toJSON() {
    return {
      name: this.name,
      name_localizations: this.name_localizations,
      type: this.type,
      description: this.description,
      description_localizations: this.description_localizations,
      default_member_permissions: Number(this.default_member_permissions),
      nsfw: this.nsfw,
      options: this.options,
    };
  }
}

module.exports = Command;
