import Interaction from "./Interaction.js";

/**
 * Represents when a modal is submitted.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-interaction}
 * @extends {Interaction}
 */
class ModalResponse extends Interaction {
  #values;
  /**
   * Creates a modal submitted interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client, data) {
    super(client, data);

    /**
     * The entered modal values.
     * @type {Array<Object>}
     * @private
     */
    this.#values = data.data.components[0].components;
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
  toJSON() {
    return {
      ...super.toJSON(),
      values: this.values,
    };
  }
}

export default ModalResponse;
