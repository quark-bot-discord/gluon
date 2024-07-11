const Reaction = require("../structures/Reaction");

/**
 * Manages the reactions of a message.
 */
class MessageReactionManager {
  /**
   * Creates a message reaction manager.
   * @param {Object} existingReactions Existing reactions for a message.
   */
  constructor(client, guild, existingReactions = {}) {
    this.client = client;

    this.guild = guild;

    /**
     * Cache of message reactions.
     * @type {Object}
     */
    this.cache = {};

    for (const message_reaction in existingReactions)
      this.cache[message_reaction] = new Reaction(
        this.client,
        existingReactions[message_reaction],
        this.guild.id.toString(),
      );
  }

  /**
   * Adds a reaction to a message.
   * @param {String | BigInt} user_id The id of the user who reacted.
   * @param {String} emoji The id or unicode emoji that was reacted with.
   * @param {Object} data The raw MESSAGE_REACTION_ADD data.
   */
  addReaction(user_id, emoji, data) {
    if (!this.cache[emoji]) {
      data.initial_reactor = user_id;
      this.cache[emoji] = new Reaction(
        this.client,
        data,
        this.guild.id.toString(),
      );
    }

    this.cache[emoji]._reacted.push(BigInt(user_id));
  }

  /**
   * Removes a reaction from a message.
   * @param {String | BigInt} user_id The id of the user whose reaction was removed.
   * @param {String} emoji The id or unicode emoji for which the reaction was removed.
   */
  removeReaction(user_id, emoji) {
    if (this.cache[emoji]) {
      this.cache[emoji]._reacted = this.cache[emoji]._reacted.filter(
        (userId) => userId != user_id,
      );

      if (this.cache[emoji]._reacted.length == 0) delete this.cache[emoji];
    }
  }
}

module.exports = MessageReactionManager;
