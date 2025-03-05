import {
  ApplicationCommandOptionType,
  ChannelType,
  Locale,
} from "#typings/discord.js";
import type {
  CommandOptionDescriptionLocalizations,
  CommandOptionNameLocalizations,
  CommandChoiceBuilder as CommandChoiceBuilderType,
  CommandOptionBuilder as CommandOptionBuilderType,
} from "typings/index.d.ts";
import { JsonTypes } from "../../../typings/enums.js";
/**
 * Helps to create a choice for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
 */
declare class CommandOption implements CommandOptionBuilderType {
  autocomplete: boolean;
  channel_types?: ChannelType[];
  choices: CommandChoiceBuilderType[];
  defaultLocale: Locale;
  description?: string;
  description_localizations?: CommandOptionDescriptionLocalizations;
  max_length?: number;
  max_value?: number;
  min_length?: number;
  min_value?: number;
  name?: string;
  name_localizations?: CommandOptionNameLocalizations;
  options: CommandOptionBuilderType[];
  required?: boolean;
  type?: ApplicationCommandOptionType;
  /**
   * Creates an option for a command.
   */
  constructor();
  /**
   * Sets the name of the option.
   * @param {String | Object} name Sets the name of the option, or an object of names for localisation.
   * @returns {CommandOption}
   */
  setName(name: string | CommandOptionNameLocalizations): this;
  /**
   * Sets the option type.
   * @param {Number} type The option type.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
   */
  setType(type: ApplicationCommandOptionType): this;
  /**
   * Sets the description of the command choice.
   * @param {String | Object} description The description of the command choice, or an object of descriptions for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setDescription(
    description: string | CommandOptionDescriptionLocalizations,
  ): this;
  /**
   * Sets whether the option is required.
   * @param {Boolean} isRequired Whether the option is required.
   * @returns {CommandOption}
   */
  setRequired(isRequired: boolean): this;
  /**
   * Adds a choice to the option.
   * @param {CommandChoice} choice Adds a choice to the option.
   * @returns {CommandOption}
   */
  addChoice(choice: CommandChoiceBuilderType): this;
  /**
   * Adds an option to this option.
   * @param {CommandOption} option Adds an option to this option.
   * @returns {CommandOption}
   */
  addOption(option: CommandOptionBuilderType): this;
  /**
   * Sets which channel types are selectable by the user.
   * @param {Array<Number>} channelTypes An array of channel types to offer as a choice.
   * @returns {CommandOption}
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
   */
  setChannelTypes(channelTypes: ChannelType[]): this;
  /**
   * Sets the minimum value the user may enter.
   * @param {Number} value The minimum number value that the user may enter.
   * @returns {CommandOption}
   */
  setMinValue(value: number): this;
  /**
   * Sets the maximum value the user may enter.
   * @param {Number} value The maximum number value that the user may enter.
   * @returns {CommandOption}
   */
  setMaxValue(value: number): this;
  /**
   * Sets the minimum length the user may enter.
   * @param {Number} length The minimum length that the user may enter.
   * @returns {CommandOption}
   */
  setMinLength(length: number): this;
  /**
   * Sets the maximum length the user may enter.
   * @param {Number} length The maximum length that the user may enter.
   * @returns {CommandOption}
   */
  setMaxLength(length: number): this;
  /**
   * Sets whether autocomplete is enabled for this option.
   * @param {Boolean} autocomplete Whether autocomplete is enabled for this option.
   * @returns {CommandOption}
   */
  setAutocomplete(autocomplete: boolean): this;
  /**
   * Sets the default locale for localisation.
   * @param {String?} locale Sets the default locale for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/reference#locales}
   */
  setDefaultLocale(locale: Locale): this;
  /**
   * Returns the correct Discord format for a command option.
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
    name: string;
    name_localizations: CommandOptionNameLocalizations | undefined;
    type: ApplicationCommandOptionType;
    description: string;
    description_localizations:
      | CommandOptionDescriptionLocalizations
      | undefined;
    required: boolean | undefined;
    choices: (
      | import("typings/index.d.ts").CommandChoiceBuilderStorageJSON
      | import("typings/index.d.ts").CommandChoiceBuilderDiscordJSON
      | import("typings/index.d.ts").CommandChoiceBuilderCacheJSON
    )[];
    options: (
      | import("typings/index.d.ts").CommandOptionStorageJSON
      | import("typings/index.d.ts").CommandOptionCacheJSON
      | import("typings/index.d.ts").CommandOptionDiscordJSON
    )[];
    channel_types: ChannelType[] | undefined;
    min_value: number | undefined;
    max_value: number | undefined;
    min_length: number | undefined;
    max_length: number | undefined;
    autocomplete: boolean;
  };
}
export default CommandOption;
