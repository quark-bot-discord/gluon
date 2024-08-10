import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Interaction from "./Interaction.js";
import util from "util";

/**
 * Represents a slash command.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands}
 * @extends {Interaction}
 */
class SlashCommand extends Interaction {
  #data;
  /**
   *
   * @param {Client} client The client instance.
   * @param {Object} data The raw interaction data from Discord.
   */
  constructor(client, data) {
    super(client, data);

    /**
     * Raw slash command data from discord.
     * @type {Object?}
     * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-application-command-interaction-data}
     * @private
     */
    this.#data = data.data;
  }

  /**
   * The raw slash command data from Discord.
   * @type {Object?}
   * @readonly
   * @public
   */
  get data() {
    return this.#data;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<SlashCommand: ${this.id}>`;
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
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          id: this.id,
          data: this.#data,
        };
      }
    }
  }
}

export default SlashCommand;
