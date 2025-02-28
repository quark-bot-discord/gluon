import ClientType from "src/interfaces/Client.js";
import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Reaction from "../structures/Reaction.js";
import {
  MessageReactionManagerCacheJSON,
  MessageReactionManagerStorageJSON,
  MessageReactionManagerType,
} from "./interfaces/MessageReactionManager.js";
import { GuildType } from "src/structures/interfaces/Guild.js";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  ReactionCacheJSON,
  ReactionStorageJSON,
  ReactionType,
} from "src/structures/interfaces/Reaction.js";

/**
 * Manages the reactions of a message.
 */
class MessageReactionManager implements MessageReactionManagerType {
  #_client;
  #guild;
  #cache: { [key: string]: ReactionType };
  /**
   * Creates a message reaction manager.
   * @param {Object} existingReactions Existing reactions for a message.
   */
  constructor(
    client: ClientType,
    guild: GuildType,
    existingReactions:
      | MessageReactionManagerCacheJSON
      | MessageReactionManagerStorageJSON = {},
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (!guild) throw new TypeError("GLUON: Guild must be provided.");
    if (typeof existingReactions !== "object")
      throw new TypeError("GLUON: Existing reactions must be an object.");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The guild that this reaction manager belongs to.
     * @type {Guild}
     * @private
     */
    this.#guild = guild;

    /**
     * Cache of message reactions.
     * @type {Object}
     * @private
     */
    this.#cache = {} as { [key: string]: ReactionType };

    for (const [messageReaction, messageReactionValue] of Object.entries(
      existingReactions,
    ))
      this.#cache[messageReaction] = new Reaction(
        this.#_client,
        messageReactionValue,
        { guildId: this.#guild.id },
      );
  }

  /**
   * Adds a reaction to a message.
   * @param {String} userId The id of the user who reacted.
   * @param {String} emoji The id or unicode emoji that was reacted with.
   * @param {Object} data The raw MESSAGE_REACTION_ADD data.
   * @throws {TypeError}
   * @public
   * @method
   */
  _addReaction(userId: Snowflake, emoji: Snowflake | string, data: any) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof emoji !== "string")
      throw new TypeError("GLUON: Emoji must be a string.");

    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object.");

    if (!this.#cache[emoji])
      this.#cache[emoji] = new Reaction(this.#_client, data, {
        guildId: this.#guild.id,
      });

    this.#cache[emoji]._addReactor(userId);
  }

  /**
   * Removes a reaction from a message.
   * @param {String} userId The id of the user whose reaction was removed.
   * @param {String} emoji The id or unicode emoji for which the reaction was removed.
   * @throws {TypeError}
   * @public
   * @method
   */
  _removeReaction(userId: Snowflake, emoji: Snowflake | string) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof emoji !== "string")
      throw new TypeError("GLUON: Emoji must be a string.");

    if (this.#cache[emoji]) {
      this.#cache[emoji]._removeReactor(userId);

      if (this.#cache[emoji].count == 0) delete this.#cache[emoji];
    }
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
        const messageReactions: {
          [key: string]: ReactionCacheJSON | ReactionStorageJSON;
        } = {};
        for (const [reaction, reactionData] of Object.entries(this.#cache))
          messageReactions[reaction] = (reactionData as ReactionType).toJSON(
            format,
          );
        return messageReactions;
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return Array.from(Object.values(this.#cache)).map((o) =>
          o.toJSON(format),
        );
      }
    }
  }
}

export default MessageReactionManager;
