import ClientType from "src/interfaces/Client.js";
import Interaction from "./Interaction.js";
import Message from "./Message.js";
import util from "util";
import { Snowflake } from "src/interfaces/gluon.js";
import { APIMessageComponentSelectMenuInteraction } from "discord-api-types/v10";
import {
  OptionSelect as OptionSelectType,
  OptionSelectCacheJSON,
  OptionSelectDiscordJSON,
  OptionSelectStorageJSON,
  JsonTypes,
} from "../../typings/index.d.js";

/**
 * Represents when an option is selected.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
class OptionSelect extends Interaction implements OptionSelectType {
  #_client;
  #custom_id;
  #message;
  #values;
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
    data: APIMessageComponentSelectMenuInteraction,
    { channelId, guildId }: { channelId: Snowflake; guildId: Snowflake },
  ) {
    super(client, data);

    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The custom id of the select menu.
     * @type {String}
     * @private
     */
    this.#custom_id = data.data.custom_id;

    /**
     * The message which the option belongs to.
     * @type {Message}
     * @private
     */
    this.#message = new Message(this.#_client, data.message, {
      channelId,
      guildId,
    });

    /**
     * The values selected from the select menu.
     * @type {Array<Object>}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
     * @private
     */
    this.#values = data.data.values;
  }

  /**
   * The custom id of the select menu.
   * @type {String}
   * @readonly
   * @public
   */
  get customId() {
    return this.#custom_id;
  }

  /**
   * The message which the option belongs to.
   * @type {Message}
   * @readonly
   * @public
   */
  get message() {
    return this.#message;
  }

  /**
   * The values selected from the select menu.
   * @type {Array<Object>}
   * @readonly
   * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
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
    return `<OptionSelect: ${this.id}>`;
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
  ): OptionSelectCacheJSON | OptionSelectDiscordJSON | OptionSelectStorageJSON {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          ...super.toJSON(format),
          custom_id: this.customId,
          message: this.message.toJSON(format),
          values: this.values,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          data: {
            custom_id: this.customId,
            values: this.values,
          },
          message: this.message.toJSON(format),
        };
      }
    }
  }
}

export default OptionSelect;
