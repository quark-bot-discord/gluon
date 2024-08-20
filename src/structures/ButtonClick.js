import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Interaction from "./Interaction.js";
import Message from "./Message.js";
import util from "util";

/**
 * Represents when a button is clicked.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
class ButtonClick extends Interaction {
  #_client;
  #custom_id;
  #message;
  /**
   * Creates a button click interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this interaction belongs to.
   * @param {String} options.channelId The ID of the channel that this interaction belongs to.
   */
  constructor(client, data, { guildId, channelId } = {}) {
    super(client, data);

    this.#_client = client;

    /**
     * The custom id of the button.
     * @type {String}
     * @private
     */
    this.#custom_id = data.data.custom_id;

    /**
     * The message which the button belongs to.
     * @type {Message}
     * @private
     */
    this.#message = new Message(this.#_client, data.message, {
      channelId,
      guildId,
    });
  }

  /**
   * The custom id of the button.
   * @type {String}
   * @readonly
   * @public
   */
  get customId() {
    return this.#custom_id;
  }

  /**
   * The message which the button belongs to.
   * @type {Message}
   * @readonly
   * @public
   * @see {@link Message}
   */
  get message() {
    return this.#message;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<ButtonClick: ${this.id}>`;
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
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          data: {
            custom_id: this.customId,
          },
          message: this.message,
        };
      }
    }
  }
}

export default ButtonClick;
