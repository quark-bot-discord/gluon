import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Emoji from "./Emoji.js";
import util from "util";
import {
  ReactionCacheJSON,
  ReactionDiscordJSON,
  ReactionRaw,
  ReactionStorageJSON,
  ReactionType,
} from "./interfaces/Reaction.js";
import ClientType from "src/interfaces/Client.js";
import { Snowflake } from "src/interfaces/gluon.js";

/**
 * Represents a reaction belonging to a message.
 */
class Reaction implements ReactionType {
  #_client;
  #_guild_id;
  #emoji;
  #_reacted;
  #initial_reactor;
  #count;
  /**
   * Creates the structure for a reaction.
   * @param {Client} client The client instance.
   * @param {Object} data The raw reaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the reaction belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure}
   */
  constructor(
    client: ClientType,
    data:
      | ReactionRaw
      | ReactionStorageJSON
      | ReactionCacheJSON
      | ReactionDiscordJSON,
    { guildId }: { guildId: Snowflake },
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The id of the guild that this reaction belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guildId);

    if (data.emoji.mention)
      /**
       * The emoji used for the reaction.
       * @type {Emoji}
       * @private
       */
      this.#emoji = data.emoji;
    else
      this.#emoji = new Emoji(client, data.emoji, { guildId, nocache: true });

    /**
     * Users who reacted with this emoji.
     * @type {Array<BigInt>}
     * @private
     */
    this.#_reacted = data._reacted?.map((r: any) => BigInt(r)) || [];
    if (!Array.isArray(data._reacted) && data.count) this.#count = data.count;

    /**
     * The user who added the first reaction.
     * @type {BigInt?}
     * @private
     */
    if (data.initial_reactor)
      this.#initial_reactor = BigInt(data.initial_reactor);
  }

  /**
   * The number of reactions to this message.
   * @readonly
   * @type {Number}
   * @public
   */
  get count() {
    return this.#count ?? this.#_reacted.length;
  }

  /**
   * The member objects of the members who reacted. Returns the user id of the member cannot be found.
   * @readonly
   * @type {Array<Member | String>}
   * @public
   */
  get reacted() {
    return this.#_reacted.map((userId: bigint) => {
      const member = this.guild.members.get(String(userId));

      if (member) return member;
      else return String(userId);
    });
  }

  /**
   * The user ids of the users who reacted.
   * @readonly
   * @type {Array<String>}
   * @public
   */
  get reactedIds() {
    return this.#_reacted.map((r: bigint) => String(r));
  }

  /**
   * The id of the guild that this reaction belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The guild that this reaction belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
  }

  /**
   * The emoji used for the reaction.
   * @type {Emoji}
   * @readonly
   * @public
   */
  get emoji() {
    return this.#emoji;
  }

  /**
   * The user who added the first reaction.
   * @type {String?}
   * @readonly
   * @public
   */
  get initialReactor() {
    return this.#initial_reactor ? String(this.#initial_reactor) : null;
  }

  /**
   * Adds a user to the list of reactors.
   * @param {String} userId The id of the user to add as a reactor.
   * @throws {TypeError}
   * @public
   * @method
   */
  _addReactor(userId: Snowflake) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (this.#_reacted.length === 0 && !this.#initial_reactor)
      this.#initial_reactor = BigInt(userId);

    this.#_reacted.push(BigInt(userId));

    if (this.#count) this.#count++;
  }

  /**
   * Removes a user from the list of reactors.
   * @param {String} userId The id of the user to add as a reactor.
   * @throws {TypeError}
   * @public
   * @method
   */
  _removeReactor(userId: Snowflake) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    this.#_reacted = this.#_reacted.filter((r: bigint) => r !== BigInt(userId));

    if (this.#count) this.#count--;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Reaction: ${this.emoji}>`;
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
   */
  toJSON(format: TO_JSON_TYPES_ENUM) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        return {
          emoji: this.emoji.toJSON(format),
          _reacted: this.reactedIds,
          initial_reactor: this.initialReactor ?? undefined,
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          emoji: this.emoji.toJSON(format),
          count: this.count,
        };
      }
    }
  }
}

export default Reaction;
