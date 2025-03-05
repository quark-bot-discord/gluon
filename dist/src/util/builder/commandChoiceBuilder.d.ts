import { Locale } from "#typings/discord.js";
import type {
  CommandChoiceBuilder as CommandChoiceBuilderType,
  CommandChoiceNameLocalizations,
} from "typings/index.d.ts";
import { JsonTypes } from "../../../typings/enums.js";
/**
 * Helps to create a choice for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure}
 */
declare class CommandChoice implements CommandChoiceBuilderType {
  defaultLocale: Locale;
  name: string | undefined;
  name_localizations: CommandChoiceNameLocalizations;
  value: string | undefined;
  /**
   * Creates a choice for a command.
   */
  constructor();
  /**
   * Sets the name of the choice.
   * @param {String | Object} name Sets the name of the choice, or an object of names for localisation.
   * @returns {CommandChoice}
   */
  setName(name: string | CommandChoiceNameLocalizations): this;
  /**
   * Sets the value of the choice.
   * @param {String} value Value of the choice.
   * @returns {CommandChoice}
   */
  setValue(value: string): this;
  /**
   * Sets the default locale for localisation.
   * @param {String?} locale Sets the default locale for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/reference#locales}
   */
  setDefaultLocale(locale: Locale): this;
  /**
   * Returns the correct Discord format for a command choice.
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
    name_localizations: CommandChoiceNameLocalizations;
    value: string;
  };
}
export default CommandChoice;
