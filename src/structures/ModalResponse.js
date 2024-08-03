import { TO_JSON_TYPES_ENUM } from "../constants.js";
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
          values: this.values,
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          data: {
            components: [
              {
                components: this.values,
              },
            ],
          },
        };
      }
    }
  }
}

export default ModalResponse;
