/**
 * Structure for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
 */
declare class Command {
  contexts: any;
  defaultLocale: any;
  default_member_permissions: any;
  description: any;
  description_localizations: any;
  name: any;
  name_localizations: any;
  nsfw: any;
  options: any;
  type: any;
  /**
   * Creates the structure for a command.
   */
  constructor();
  /**
   * Sets the name of the command.
   * @param {String | Object} name The name of the command or an object of names for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setName(name: any): this;
  /**
   * Sets the command type.
   * @param {Number} type The command type.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}
   */
  setType(type: any): this;
  /**
   * Sets the description of the command.
   * @param {String | Object} description The description of the command, or an object of descriptions for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setDescription(description: any): this;
  /**
   * Sets the permission needed to use the command.
   * @param {String} permissions The permissions required to be able to use this command.
   * @returns {Command}
   */
  setDefaultMemberPermissions(permissions: any): this;
  /**
   * Sets whether this command is NSFW.
   * @param {Boolean} nsfw Whether this command is NSFW.
   * @returns {Command}
   */
  setNsfw(nsfw: any): this;
  /**
   * Adds an option to the command.
   * @param {CommandOption} option Adds an option to the command.
   * @returns {Command}
   */
  addOption(option: any): this;
  /**
   * Sets the default locale for localisation.
   * @param {String?} locale Sets the default locale for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/reference#locales}
   */
  setDefaultLocale(locale: any): this;
  /**
   * Returns the correct Discord format for a command.
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
    default_member_permissions: any;
    nsfw: any;
    options: any;
  };
}
export default Command;
