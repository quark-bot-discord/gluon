import Interaction from "./Interaction.js";
import Message from "./Message.js";
import util from "util";
import {
  APIMessageComponentGuildInteraction,
  APIMessageComponentSelectMenuInteraction,
  Snowflake,
} from "#typings/discord.js";
import type {
  OptionSelect as OptionSelectType,
  OptionSelectCacheJSON,
  OptionSelectDiscordJSON,
  OptionSelectStorageJSON,
  Client as ClientType,
} from "#typings/index.d.ts";
import { JsonTypes } from "#typings/enums.js";
/**
 * Represents when an option is selected.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
declare class OptionSelect extends Interaction implements OptionSelectType {
  #private;
  /**
   * Creates an option selected interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this interaction belongs to.
   * @param {String} options.channelId The ID of the channel that this interaction belongs to.
   */
  constructor(
    client: ClientType,
    data: APIMessageComponentSelectMenuInteraction &
      APIMessageComponentGuildInteraction,
    {
      channelId,
      guildId,
    }: {
      channelId: Snowflake;
      guildId: Snowflake;
    },
  );
  /**
   * The custom id of the select menu.
   * @type {String}
   * @readonly
   * @public
   */
  get customId(): string;
  /**
   * The message which the option belongs to.
   * @type {Message}
   * @readonly
   * @public
   */
  get message(): Message;
  /**
   * The values selected from the select menu.
   * @type {Array<Object>}
   * @readonly
   * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
   * @public
   */
  get values(): string[];
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
  ): OptionSelectCacheJSON | OptionSelectDiscordJSON | OptionSelectStorageJSON;
}
export default OptionSelect;
