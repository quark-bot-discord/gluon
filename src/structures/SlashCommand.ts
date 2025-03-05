import Interaction from "./Interaction.js";
import util from "util";
import Member from "./Member.js";
import Role from "./Role.js";
// import cacheChannel from "../util/gluon/cacheChannel.js";
import User from "./User.js";
import {
  APIApplicationCommandAutocompleteGuildInteraction,
  APIChatInputApplicationCommandGuildInteraction,
} from "discord-api-types/v10";
import type {
  SlashCommand as SlashCommandType,
  SlashCommandCacheJSON,
  SlashCommandDiscordJSON,
  SlashCommandStorageJSON,
  Client as ClientType,
} from "../../typings/index.d.ts";
import { JsonTypes } from "../../typings/enums.js";

/**
 * Represents a slash command.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands}
 * @extends {Interaction}
 */
class SlashCommand extends Interaction implements SlashCommandType {
  #data;
  #options;
  /**
   * Creates a slash command interaction structure.
   * @param {Client} client The client instance.
   * @param {Object} data The raw interaction data from Discord.
   */
  constructor(
    client: ClientType,
    data:
      | APIChatInputApplicationCommandGuildInteraction
      | APIApplicationCommandAutocompleteGuildInteraction,
  ) {
    super(client, data);

    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");

    /**
     * Raw slash command data from discord.
     * @type {Object?}
     * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-application-command-interaction-data}
     * @private
     */
    this.#data = data.data;

    if (data.data.resolved?.members && data.data.resolved?.users) {
      for (const [key, value] of Object.entries(data.data.resolved.members)) {
        new Member(client, value, {
          userId: key,
          guildId: data.guild_id,
          user: new User(client, data.data.resolved.users[key]),
        });
      }
    }
    if (data.data.resolved?.roles) {
      for (const value of Object.values(data.data.resolved.roles)) {
        new Role(client, value, {
          guildId: data.guild_id,
        });
      }
    }
    // if (data.data.resolved?.channels) {
    //   for (const value of Object.values(data.data.resolved.channels)) {
    //     cacheChannel(client, value, data.guild_id);
    //   }
    // }

    /**
     * The options provided with the interaction.
     * @type {Array<Object>}
     * @private
     */
    this.#options = data.data.options ?? [];
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
  toJSON(
    format?: JsonTypes,
  ): SlashCommandCacheJSON | SlashCommandStorageJSON | SlashCommandDiscordJSON {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
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
