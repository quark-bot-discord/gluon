import Emoji from "./Emoji.js";
import util from "util";
import type {
  EmojiCacheJSON,
  EmojiDiscordJSON,
  EmojiStorageJSON,
  Emoji as EmojiType,
  ReactionCacheJSON,
  ReactionDiscordJSON,
  ReactionStorageJSON,
  Reaction as ReactionType,
  Client as ClientType,
  Guild as GuildType,
} from "#typings/index.d.ts";
import {
  APIReaction,
  GatewayMessageReactionAddDispatchData,
  Snowflake,
} from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";

/**
 * Represents a reaction belonging to a message.
 */
class Reaction implements ReactionType {
  #_client;
  #_guild_id;
  #emoji;
  #_reacted;
  #initial_reactor;
  #count: number | undefined;
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
      | APIReaction
      | ReactionStorageJSON
      | ReactionCacheJSON
      | ReactionDiscordJSON
      | GatewayMessageReactionAddDispatchData,
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

    if ("emoji" in data && "mention" in data.emoji)
      /**
       * The emoji used for the reaction.
       * @type {Emoji}
       * @private
       */
      this.#emoji = data.emoji as EmojiType;
    else if ("emoji" in data)
      this.#emoji = new Emoji(client, data.emoji, { guildId, nocache: true });

    /**
     * Users who reacted with this emoji.
     * @type {Array<BigInt>}
     * @private
     */
    this.#_reacted =
      "_reacted" in data && Array.isArray(data._reacted)
        ? data._reacted.map((r) => BigInt(r))
        : [];
    if ("_reacted" in data && !Array.isArray(data._reacted) && "count" in data)
      this.#count = data.count as number;

    /**
     * The user who added the first reaction.
     * @type {BigInt?}
     * @private
     */
    if ("initial_reactor" in data && data.initial_reactor)
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
    if (!this.guild) {
      throw new Error("GLUON: Guild not found.");
    }
    return this.#_reacted.map((userId: bigint) => {
      const member = (this.guild as GuildType).members.get(String(userId));

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
  toJSON(format: JsonTypes) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          emoji: this.emoji?.toJSON(format) as
            | EmojiStorageJSON
            | EmojiCacheJSON,
          _reacted: this.reactedIds,
          initial_reactor: this.initialReactor ?? undefined,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          emoji: this.emoji?.toJSON(format) as EmojiDiscordJSON,
          count: this.count,
        };
      }
    }
  }
}

export default Reaction;
