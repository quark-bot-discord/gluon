import { ApplicationCommandType, Locale } from "#typings/discord.js";
import type {
  CommandDescriptionLocalizations,
  CommandNameLocalizations,
  CommandOptionBuilder,
} from "typings/index.d.ts";
import { JsonTypes } from "../../../typings/enums.js";
import { PermissionsBitfield } from "#typings/gluon.js";
/**
 * Structure for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
 */
declare class Command {
  contexts: [0];
  defaultLocale: Locale;
  default_member_permissions?: PermissionsBitfield;
  description?: string;
  description_localizations?: CommandDescriptionLocalizations;
  name?: string;
  name_localizations?: CommandNameLocalizations;
  nsfw: boolean;
  options: CommandOptionBuilder[];
  type: ApplicationCommandType;
  /**
   * Sets the name of the command.
   * @param {String | Object} name The name of the command or an object of names for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setName(name: string | CommandNameLocalizations): this;
  /**
   * Sets the command type.
   * @param {Number} type The command type.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}
   */
  setType(type: ApplicationCommandType): this;
  /**
   * Sets the description of the command.
   * @param {String | Object} description The description of the command, or an object of descriptions for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setDescription(description: string | CommandDescriptionLocalizations): this;
  /**
   * Sets the permission needed to use the command.
   * @param {String} permissions The permissions required to be able to use this command.
   * @returns {Command}
   */
  setDefaultMemberPermissions(permissions: PermissionsBitfield): this;
  /**
   * Sets whether this command is NSFW.
   * @param {Boolean} nsfw Whether this command is NSFW.
   * @returns {Command}
   */
  setNsfw(nsfw: boolean): this;
  /**
   * Adds an option to the command.
   * @param {CommandOption} option Adds an option to the command.
   * @returns {Command}
   */
  addOption(option: CommandOptionBuilder): this;
  /**
   * Sets the default locale for localisation.
   * @param {String?} locale Sets the default locale for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/reference#locales}
   */
  setDefaultLocale(locale: Locale): this;
  /**
   * Returns the correct Discord format for a command.
   * @returns {Object}
   */
  toJSON(
    format?: JsonTypes,
    {
      suppressValidation,
    }?: {
      suppressValidation: boolean;
    },
  ): {
    name: string | undefined;
    name_localizations: CommandNameLocalizations | undefined;
    type: ApplicationCommandType;
    description: string | undefined;
    description_localizations: CommandDescriptionLocalizations | undefined;
    default_member_permissions: string | undefined;
    nsfw: boolean;
    options: (
      | import("typings/index.d.ts").CommandOptionStorageJSON
      | import("typings/index.d.ts").CommandOptionCacheJSON
      | import("typings/index.d.ts").CommandOptionDiscordJSON
    )[];
  };
}
export default Command;
