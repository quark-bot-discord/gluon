import Interaction from "./Interaction.js";
import util from "util";
import ClientType from "src/interfaces/Client.js";
import { APIChatInputApplicationCommandGuildInteraction } from "discord-api-types/v10";
import {
  SlashCommand as SlashCommandType,
  SlashCommandCacheJSON,
  SlashCommandDiscordJSON,
  SlashCommandStorageJSON,
  JsonTypes,
} from "../../typings/index.d.js";
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
    data: APIChatInputApplicationCommandGuildInteraction,
  );
  /**
   * The raw slash command data from Discord.
   * @type {Object?}
   * @readonly
   * @public
   */
  get data(): import("discord-api-types/v10").APIChatInputApplicationCommandInteractionData;
  /**
   * The options provided with the slash command.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get options(): import("discord-api-types/v10").APIApplicationCommandInteractionDataOption[];
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
