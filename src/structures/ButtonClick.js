const Interaction = require("./Interaction");
const Message = require("./Message");

/**
 * Represents when a button is clicked.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 */
class ButtonClick extends Interaction {
  #custom_id;
  #message;
  /**
   * Creates a button click interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client, data) {
    super(client, data);

    /**
     * The custom id of the button.
     * @type {String}
     * @private
     */
    this.#custom_id = data.data.custom_id;

    /**
     * The message which the button belongs to.
     * @type {Message}
     */
    this.#message = new Message(this._client, data.message, {
      channel_id: data.channel_id,
      guild_id: data.guild_id,
      nocache: this._client.cacheMessages,
    });
  }

  /**
   * The custom id of the button.
   * @type {String}
   * @readonly
   */
  get customId() {
    return this.#custom_id;
  }

  /**
   * The message which the button belongs to.
   * @type {Message}
   * @readonly
   */
  get message() {
    return this.#message;
  }

  toString() {
    return `<ButtonClick: ${this.customId}>`;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      customId: this.customId,
      message: this.message,
    };
  }
}

module.exports = ButtonClick;
