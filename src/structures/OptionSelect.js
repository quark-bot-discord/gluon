const Interaction = require("./Interaction");
const Message = require("./Message");

/**
 * Represents when an option is selected.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 */
class OptionSelect extends Interaction {
  /**
   * Creates an option selected interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client, data) {
    super(client, data);

    /**
     * The custom id of the select menu.
     * @type {String}
     */
    this.custom_id = data.data.custom_id;

    /**
     * The message which the option belongs to.
     * @type {Message}
     */
    this.message = new Message(
      this._client,
      data.message,
      data.channel_id,
      data.guild_id,
      this._client.cacheMessages
    );

    /**
     * The values selected from the select menu.
     * @type {Array<Object>}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
     */
    this.values = data.data.values;
  }
}

module.exports = OptionSelect;
