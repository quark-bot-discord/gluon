const Reaction = require("../structures/Reaction");

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
  constructor(client, guild, existingReactions = {}) {
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

    for (const [messageReaction, messageReactionValue] of Object.entries(
      existingReactions
    ))
      this.#cache[messageReaction] = new Reaction(
        this.#_client,
        messageReactionValue,
        { guild_id: this.#guild.id }
      );
  }

  /**
   * Adds a reaction to a message.
   * @param {String} user_id The id of the user who reacted.
   * @param {String} emoji The id or unicode emoji that was reacted with.
   * @param {Object} data The raw MESSAGE_REACTION_ADD data.
   * @throws {TypeError}
   * @public
   * @method
   */
  addReaction(user_id, emoji, data) {
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof emoji !== "string")
      throw new TypeError("GLUON: Emoji must be a string.");

    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object.");

    if (!this.#cache[emoji]) {
      data.initial_reactor = user_id;
      this.#cache[emoji] = new Reaction(this.#_client, data, {
        guild_id: this.#guild.id,
      });
    }

    this.#cache[emoji]._reacted.push(BigInt(user_id));
  }

  /**
   * Removes a reaction from a message.
   * @param {String} user_id The id of the user whose reaction was removed.
   * @param {String} emoji The id or unicode emoji for which the reaction was removed.
   * @throws {TypeError}
   * @public
   * @method
   */
  removeReaction(user_id, emoji) {
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof emoji !== "string")
      throw new TypeError("GLUON: Emoji must be a string.");

    if (this.#cache[emoji]) {
      this.#cache[emoji]._reacted = this.#cache[emoji]._reacted.filter(
        (userId) => userId != user_id
      );

      if (this.#cache[emoji]._reacted.length == 0) delete this.#cache[emoji];
    }
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    const messageReactions = {};
    for (const [reaction, reactionData] of Object.entries(this.#cache))
      messageReactions[reaction] = reactionData;
    return messageReactions;
  }
}

module.exports = MessageReactionManager;
