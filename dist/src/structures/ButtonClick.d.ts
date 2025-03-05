import Interaction from "./Interaction.js";
import Message from "./Message.js";
import util from "util";
import type {
  ButtonClickCacheJSON,
  ButtonClickDiscordJSON,
  ButtonClickStorageJSON,
  ButtonClick as ButtonClickType,
  Client as ClientType,
} from "../../typings/index.d.ts";
import {
  APIMessageComponentGuildInteraction,
  Snowflake,
} from "discord-api-types/v10";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents when a button is clicked.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
declare class ButtonClick extends Interaction implements ButtonClickType {
  #private;
  /**
   * Creates a button click interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this interaction belongs to.
   * @param {String} options.channelId The ID of the channel that this interaction belongs to.
   */
  constructor(
    client: ClientType,
    data: APIMessageComponentGuildInteraction,
    {
      guildId,
      channelId,
    }: {
      guildId: Snowflake;
      channelId: Snowflake;
    },
  );
  /**
   * The custom id of the button.
   * @type {String}
   * @readonly
   * @public
   */
  get customId(): string;
  /**
   * The message which the button belongs to.
   * @type {Message}
   * @readonly
   * @public
   * @see {@link Message}
   */
  get message(): Message;
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
  ): ButtonClickCacheJSON | ButtonClickDiscordJSON | ButtonClickStorageJSON;
}
export default ButtonClick;
