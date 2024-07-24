const Interaction = require("./Interaction");

/**
 * Represents when a modal is submitted.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-interaction}
 */
class ModalResponse extends Interaction {
  #custom_id;
  #values;
  /**
   * Creates a modal submitted interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client, data) {
    super(client, data);

    /**
     * The custom id of the modal.
     * @type {String}
     */
    this.#custom_id = data.data.custom_id;

    /**
     * The entered modal values.
     * @type {Array<Object>}
     */
    this.#values = data.data.components[0].components;
  }

  /**
   * The custom id of the modal.
   * @type {String}
   * @readonly
   */
  get customId() {
    return this.#custom_id;
  }

  /**
   * The entered modal values.
   * @type {Array<Object>}
   * @readonly
   */
  get values() {
    return this.#values;
  }
  
  toString() {
    return `<ModalResponse: ${this.customId}>`;
  }

}

module.exports = ModalResponse;
