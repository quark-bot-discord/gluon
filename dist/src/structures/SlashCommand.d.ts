import Interaction from "./Interaction.js";
import util from "util";
import {
  APIApplicationCommandAutocompleteGuildInteraction,
  APIChatInputApplicationCommandGuildInteraction,
} from "#typings/discord.js";
import type {
  SlashCommand as SlashCommandType,
  SlashCommandCacheJSON,
  SlashCommandDiscordJSON,
  SlashCommandStorageJSON,
  Client as ClientType,
} from "../../typings/index.d.ts";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents a slash command.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands}
 * @extends {Interaction}
 */
declare class SlashCommand extends Interaction implements SlashCommandType {
  #private;
  /**
   * Creates a slash command interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The raw interaction data from Discord.
   */
  constructor(
    client: ClientType,
    data:
      | APIChatInputApplicationCommandGuildInteraction
      | APIApplicationCommandAutocompleteGuildInteraction,
  );
  /**
   * The raw slash command data from Discord.
   * @type {Object?}
   * @readonly
   * @public
   */
  get data():
    | import("#typings/discord.js").APIChatInputApplicationCommandInteractionData
    | (import("#typings/discord.js").APIChatInputApplicationCommandInteractionData &
        Required<
          Pick<
            import("#typings/discord.js").APIChatInputApplicationCommandInteractionData,
            "options"
          >
        >);
  /**
   * The options provided with the slash command.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get options(): import("#typings/discord.js").APIApplicationCommandInteractionDataOption[];
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(
    format?: JsonTypes,
  ): SlashCommandCacheJSON | SlashCommandStorageJSON | SlashCommandDiscordJSON;
}
export default SlashCommand;
