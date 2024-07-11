const Interaction = require("./Interaction");
const Message = require("./Message");

/**
 * Represents when a button is clicked.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 */
class ButtonClick extends Interaction {
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
     */
    this.custom_id = data.data.custom_id;

    /**
     * The message which the button belongs to.
     * @type {Message}
     */
    this.message = new Message(
      this._client,
      data.message,
      data.channel_id,
      data.guild_id,
      this._client.cacheMessages
    );
  }
}

module.exports = ButtonClick;
