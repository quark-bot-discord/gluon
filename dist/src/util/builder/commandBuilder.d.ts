export default Command;
/**
 * Structure for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
 */
declare class Command {
    type: number;
    contexts: number[];
    options: any[];
    defaultLocale: string;
    /**
     * Sets the name of the command.
     * @param {String | Object} name The name of the command or an object of names for localisation.
     * @returns {Command}
     * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
     */
    setName(name: string | any): Command;
    name: any;
    name_localizations: any;
    /**
     * Sets the command type.
     * @param {Number} type The command type.
     * @returns {Command}
     * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}
     */
    setType(type: number): Command;
    /**
     * Sets the description of the command.
     * @param {String | Object} description The description of the command, or an object of descriptions for localisation.
     * @returns {Command}
     * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
     */
    setDescription(description: string | any): Command;
    description: any;
    description_localizations: any;
    /**
     * Sets the permission needed to use the command.
     * @param {String} permissions The permissions required to be able to use this command.
     * @returns {Command}
     */
    setDefaultMemberPermissions(permissions: string): Command;
    default_member_permissions: string;
    /**
     * Sets whether this command is NSFW.
     * @param {Boolean} nsfw Whether this command is NSFW.
     * @returns {Command}
     */
    setNsfw(nsfw: boolean): Command;
    nsfw: boolean;
    /**
     * Adds an option to the command.
     * @param {CommandOption} option Adds an option to the command.
     * @returns {Command}
     */
    addOption(option: CommandOption): Command;
    /**
     * Sets the default locale for localisation.
     * @param {String?} locale Sets the default locale for localisation.
     * @returns {Command}
     * @see {@link https://discord.com/developers/docs/reference#locales}
     */
    setDefaultLocale(locale: string | null): Command;
    /**
     * Returns the correct Discord format for a command.
     * @returns {Object}
     */
    toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): any;
}
import CommandOption from "./commandOptionBuilder.js";
//# sourceMappingURL=commandBuilder.d.ts.map