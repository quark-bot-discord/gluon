import Interaction from "./Interaction.js";
import Message from "./Message.js";
import util from "util";
import type {
  ButtonClickCacheJSON,
  ButtonClickDiscordJSON,
  ButtonClickStorageJSON,
  ButtonClick as ButtonClickType,
  MessageCacheJSON,
  MessageDiscordJSON,
  MessageStorageJSON,
  Client as ClientType,
  MemberStorageJSON,
  MemberCacheJSON,
  MemberDiscordJSON,
} from "../../typings/index.d.ts";
import {
  APIMessageComponentGuildInteraction,
  Snowflake,
} from "#typings/discord.js";
import { JsonTypes } from "../../typings/enums.js";

/**
 * Represents when a button is clicked.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
class ButtonClick extends Interaction implements ButtonClickType {
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
  constructor(
    client: ClientType,
    data: APIMessageComponentGuildInteraction,
    { guildId, channelId }: { guildId: Snowflake; channelId: Snowflake },
  ) {
    super(client, data);

    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
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
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(
    format?: JsonTypes,
  ): ButtonClickCacheJSON | ButtonClickDiscordJSON | ButtonClickStorageJSON {
    switch (format) {
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.CACHE_FORMAT: {
        return {
          ...super.toJSON(format),
          data: {
            custom_id: this.customId,
          },
          message: this.message.toJSON(format) as
            | MessageStorageJSON
            | MessageCacheJSON,
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
          },
          message: this.message.toJSON(format) as MessageDiscordJSON,
          member: this.member
            ? (this.member.toJSON(format) as MemberDiscordJSON)
            : null,
        };
      }
    }
  }
}

export default ButtonClick;
