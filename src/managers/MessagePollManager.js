import Client from "../Client.js";
import { TO_JSON_TYPES_ENUM } from "../constants.js";

/**
 * Manages a poll for a message.
 */
class MessagePollManager {
  #_client;
  #cache;
  /**
   * Creates a message poll manager.
   * @param {Object} existingResponses Existing responses for a poll.
   */
  constructor(client, existingResponses = {}) {
    if (!(client instanceof Client))
      throw new TypeError("GLUON: Client must be an instance of Client.");
    if (typeof existingResponses !== "object")
      throw new TypeError("GLUON: Existing responses must be an object.");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The cache of responses.
     * @type {Map<String, Array<BigInt>>}
     * @private
     */
    this.#cache = new Map();

    for (const [answer, answerValue] of Object.entries(existingResponses))
      this.#cache.set(
        String(answer),
        answerValue.map((v) => BigInt(v)),
      );
  }

  /**
   * Adds a response to a poll.
   * @param {String} user_id The id of the user who voted.
   * @param {Number} answer_id The id of the answer that was voted for.
   * @throws {TypeError}
   * @public
   * @method
   */
  _addVote(user_id, answer_id) {
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof answer_id !== "number")
      throw new TypeError("GLUON: Answer ID must be a number.");

    const currentUserList = this.#cache.get(String(answer_id));

    if (currentUserList)
      this.#cache.set(String(answer_id), [...currentUserList, BigInt(user_id)]);
    else this.#cache.set(String(answer_id), [BigInt(user_id)]);
  }

  /**
   * Removes a response from a poll.
   * @param {String} user_id The id of the user whose vote was removed.
   * @param {Number} answer_id The id of the answer for which the vote was removed.
   * @throws {TypeError}
   * @public
   * @method
   */
  _removeVote(user_id, answer_id) {
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof answer_id !== "number")
      throw new TypeError("GLUON: Answer ID must be a number.");

    const currentUserList = this.#cache.get(String(answer_id));

    if (currentUserList)
      this.#cache.set(
        String(answer_id),
        currentUserList.filter((x) => x != BigInt(user_id)),
      );
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        const pollResponses = {};
        for (const [key, values] of this.#cache)
          pollResponses[key] = values.map((v) => String(v));
        return pollResponses;
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        const counts = [];
        for (const [key, values] of this.#cache)
          counts.push({
            id: Number(key),
            count: values.length,
            me_voted: values.includes(BigInt(this.#_client.user.id)),
          });
        return {
          answer_counts: counts,
        };
      }
    }
  }
}

export default MessagePollManager;
