import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Interaction from "./Interaction.js";
import Message from "./Message.js";

/**
 * Represents when an option is selected.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
class OptionSelect extends Interaction {
  #_client;
  #custom_id;
  #message;
  #values;
  /**
   * Creates an option selected interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client, data) {
    super(client, data);

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
      channel_id: data.channel_id,
      guild_id: data.guild_id,
      nocache: this.#_client.cacheMessages,
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
   * Returns the JSON representation of this structure.
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        return {
          ...super.toJSON(format),
          custom_id: this.customId,
          message: this.message.toJSON(format),
          values: this.values,
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
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
