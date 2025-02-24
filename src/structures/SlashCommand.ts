import Client from "../Client.js";
import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Interaction from "./Interaction.js";
import util from "util";
import Member from "./Member.js";
import Role from "./Role.js";
import cacheChannel from "../util/gluon/cacheChannel.js";
import User from "./User.js";

/**
 * Represents a slash command.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands}
 * @extends {Interaction}
 */
class SlashCommand extends Interaction {
  #data;
  #options;
  /**
   * Creates a slash command interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The raw interaction data from Discord.
   */
  constructor(client: any, data: any) {
    super(client, data);

    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");

    /**
     * Raw slash command data from discord.
     * @type {Object?}
     * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-application-command-interaction-data}
     * @private
     */
    this.#data = data.data;

    if (data.data.resolved?.members)
      for (const [key, value] of Object.entries(data.data.resolved.members))
        new Member(client, value, {
          userId: key,
          guildId: data.guild_id,
          user: new User(client, data.data.resolved.users[key]),
        });
    if (data.data.resolved?.roles)
      for (const value of Object.values(data.data.resolved.roles))
        new Role(client, value, {
          guildId: data.guild_id,
        });
    if (data.data.resolved?.channels)
      for (const value of Object.values(data.data.resolved.channels))
        cacheChannel(client, value, data.guild_id);

    /**
     * The options provided with the interaction.
     * @type {Array<Object>}
     * @private
     */
    this.#options = data.data.options;
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
   * The options provided with the slash command.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get options() {
    return this.#options;
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
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(format: any) {
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
