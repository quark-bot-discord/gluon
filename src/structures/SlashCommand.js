const Interaction = require("./Interaction");

/**
 * Represents a slash command.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands}
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
     */
    this.#data = data.data;
  }

  /**
   * The raw slash command data from Discord.
   * @type {Object?}
   * @readonly
   */
  get data() {
    return this.#data;
  }

  toString() {
    return `<SlashCommand: ${this.id}>`;
  }
}

module.exports = SlashCommand;
