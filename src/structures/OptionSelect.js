const Interaction = require("./Interaction");
const Message = require("./Message");

/**
 * Represents when an option is selected.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 */
class OptionSelect extends Interaction {
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

    /**
     * The custom id of the select menu.
     * @type {String}
     */
    this.#custom_id = data.data.custom_id;

    /**
     * The message which the option belongs to.
     * @type {Message}
     */
    this.#message = new Message(this._client, data.message, {
      channel_id: data.channel_id,
      guild_id: data.guild_id,
      nocache: this._client.cacheMessages,
    });

    /**
     * The values selected from the select menu.
     * @type {Array<Object>}
     * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
     */
    this.#values = data.data.values;
  }

  /**
   * The custom id of the select menu.
   * @type {String}
   * @readonly
   */
  get customId() {
    return this.#custom_id;
  }

  /**
   * The message which the option belongs to.
   * @type {Message}
   * @readonly
   */
  get message() {
    return this.#message;
  }

  /**
   * The values selected from the select menu.
   * @type {Array<Object>}
   * @readonly
   * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
   */
  get values() {
    return this.#values;
  }

  toString() {
    return `<OptionSelect: ${this.customId}>`;
  }
}

module.exports = OptionSelect;
