import Client from "../Client.js";
import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Reaction from "../structures/Reaction.js";

/**
 * Manages the reactions of a message.
 */
class MessageReactionManager {
  #_client;
  #guild;
  #cache;
  /**
   * Creates a message reaction manager.
   * @param {Object} existingReactions Existing reactions for a message.
   */
  constructor(client: any, guild: any, existingReactions = {}) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be an instance of Client.");
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
    this.#cache = {};

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
  _addReaction(userId: any, emoji: any, data: any) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof emoji !== "string")
      throw new TypeError("GLUON: Emoji must be a string.");

    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object.");

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this.#cache[emoji])
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      this.#cache[emoji] = new Reaction(this.#_client, data, {
        guildId: this.#guild.id,
      });

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
  _removeReaction(userId: any, emoji: any) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof emoji !== "string")
      throw new TypeError("GLUON: Emoji must be a string.");

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (this.#cache[emoji]) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      this.#cache[emoji]._removeReactor(userId);

      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
  toJSON(format: any) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        const messageReactions = {};
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        for (const [reaction, reactionData] of Object.entries(this.#cache))
          messageReactions[reaction] = reactionData.toJSON(format);
        return messageReactions;
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return Array.from(Object.values(this.#cache)).map((o) =>
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          o.toJSON(format),
        );
      }
    }
  }
}

export default MessageReactionManager;
