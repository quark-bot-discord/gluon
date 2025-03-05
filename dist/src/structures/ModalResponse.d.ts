import Interaction from "./Interaction.js";
import util from "util";
import type {
  ModalResponseCacheJSON,
  ModalResponseDiscordJSON,
  ModalResponseStorageJSON,
  ModalResponse as ModalResponseType,
  Client as ClientType,
} from "../../typings/index.d.ts";
import {
  APIGuildInteraction,
  APIModalSubmitInteraction,
} from "#typings/discord.js";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents when a modal is submitted.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-interaction}
 * @extends {Interaction}
 */
declare class ModalResponse extends Interaction implements ModalResponseType {
  #private;
  /**
   * Creates a modal submitted interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(
    client: ClientType,
    data: APIModalSubmitInteraction & APIGuildInteraction,
  );
  /**
   * The custom id of the modal.
   * @type {String}
   * @readonly
   * @public
   */
  get customId(): string;
  /**
   * The entered modal values.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get values(): import("#typings/discord.js").ModalSubmitComponent[];
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
  ):
    | ModalResponseStorageJSON
    | ModalResponseCacheJSON
    | ModalResponseDiscordJSON;
}
export default ModalResponse;
