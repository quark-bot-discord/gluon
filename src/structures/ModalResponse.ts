import Interaction from "./Interaction.js";
import util from "util";
import type {
  ModalResponseCacheJSON,
  ModalResponseDiscordJSON,
  ModalResponseStorageJSON,
  ModalResponse as ModalResponseType,
  Client as ClientType,
  MemberStorageJSON,
  MemberCacheJSON,
  MemberDiscordJSON,
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
class ModalResponse extends Interaction implements ModalResponseType {
  #values;
  #custom_id;
  /**
   * Creates a modal submitted interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(
    client: ClientType,
    data: APIModalSubmitInteraction & APIGuildInteraction,
  ) {
    super(client, data);

    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");

    /**
     * The custom id of the button.
     * @type {String}
     * @private
     */
    this.#custom_id = data.data.custom_id;

    /**
     * The entered modal values.
     * @type {Array<Object>}
     * @private
     */
    this.#values = data.data.components[0].components;
  }

  /**
   * The custom id of the modal.
   * @type {String}
   * @readonly
   * @public
   */
  get customId() {
    return this.#custom_id;
  }

  /**
   * The entered modal values.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get values() {
    return this.#values;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<ModalResponse: ${this.id}>`;
  }

  /**
   * @method
   * @public
   */
  [util.inspect.custom]() {
    return this.toString();
  }

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
    | ModalResponseDiscordJSON {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          ...super.toJSON(format),
          values: this.values,
          custom_id: this.customId,
          member: this.member
            ? (this.member.toJSON(format) as
                | MemberStorageJSON
                | MemberCacheJSON)
            : null,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          data: {
            custom_id: this.customId,
            components: [
              {
                components: this.values,
              },
            ],
          },
          member: this.member
            ? (this.member.toJSON(format) as MemberDiscordJSON)
            : null,
        };
      }
    }
  }
}

export default ModalResponse;
