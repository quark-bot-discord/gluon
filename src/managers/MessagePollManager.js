/**
 * Manages a poll for a message.
 */
class MessagePollManager {
  #cache;
  /**
   * Creates a message poll manager.
   * @param {Object} existingResponses Existing responses for a poll.
   */
  constructor(existingResponses = {}) {
    /**
     * The cache of responses.
     * @type {Map<String, Array<BigInt>>}
     */
    this.#cache = new Map();

    for (const [answer, answerValue] of Object.entries(existingResponses))
      this.#cache.set(
        answer,
        answerValue.map((v) => BigInt(v)),
      );
  }

  /**
   * Adds a response to a poll.
   * @param {String} user_id The id of the user who voted.
   * @param {String} answer_id The id of the answer that was voted for.
   */
  addVote(user_id, answer_id) {

    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof answer_id !== "string")
      throw new TypeError("GLUON: Answer ID must be a string.");

    const currentUserList = this.#cache.get(answer_id);

    if (currentUserList)
      this.#cache.set(answer_id, [...currentUserList, BigInt(user_id)]);
    else this.#cache.set(answer_id, [BigInt(user_id)]);
  }

  /**
   * Removes a response from a poll.
   * @param {String} user_id The id of the user whose vote was removed.
   * @param {String} answer_id The id of the answer for which the vote was removed.
   */
  removeVote(user_id, answer_id) {

    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof answer_id !== "string")
      throw new TypeError("GLUON: Answer ID must be a string.");

    const currentUserList = this.#cache.get(answer_id);

    if (currentUserList)
      this.#cache.set(
        answer_id,
        currentUserList.filter((x) => x != BigInt(user_id)),
      );
  }

  toJSON() {
    const pollResponses = {};
    for (const [key, values] of this.#cache)
      pollResponses[key] = values.map((v) => String(v));
    return pollResponses;
  }
}

module.exports = MessagePollManager;
