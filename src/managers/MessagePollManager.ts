import { Snowflake } from "src/interfaces/gluon.js";
import type {
  MessagePollManagerCacheJSON,
  MessagePollManagerDiscordJSON,
  MessagePollManagerStorageJSON,
  MessagePollManager as MessagePollManagerType,
  Client as ClientType,
} from "../../typings/index.d.ts";
import { JsonTypes } from "../../typings/enums.js";

/**
 * Manages a poll for a message.
 */
class MessagePollManager implements MessagePollManagerType {
  #_client;
  #cache;
  /**
   * Creates a message poll manager.
   * @param {Object} existingResponses Existing responses for a poll.
   */
  constructor(
    client: ClientType,
    existingResponses:
      | MessagePollManagerCacheJSON
      | MessagePollManagerStorageJSON = {},
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
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
    this.#cache = new Map() as Map<string, bigint[]>;

    for (const [answer, answerValue] of Object.entries(existingResponses))
      this.#cache.set(
        String(answer),
        answerValue.map((v: Snowflake) => BigInt(v)),
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
  _addVote(user_id: Snowflake, answer_id: number) {
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
  _removeVote(user_id: Snowflake, answer_id: number) {
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof answer_id !== "number")
      throw new TypeError("GLUON: Answer ID must be a number.");

    const currentUserList = this.#cache.get(String(answer_id));

    if (currentUserList)
      this.#cache.set(
        String(answer_id),
        currentUserList.filter((x: bigint) => x !== BigInt(user_id)),
      );
  }

  /**
   * Returns the result for a given answer.
   * @param {Number} answerId The ID of the answer to get the result for.
   * @returns {Array<String>}
   */
  getResult(answerId: number) {
    if (typeof answerId !== "number")
      throw new TypeError("GLUON: Answer ID must be a number.");
    return (
      this.#cache.get(String(answerId))?.map((v: bigint) => String(v)) ?? []
    );
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(
    format?: JsonTypes,
  ):
    | MessagePollManagerCacheJSON
    | MessagePollManagerStorageJSON
    | MessagePollManagerDiscordJSON {
    if (!this.#_client.user) {
      throw new Error("GLUON: Client has not logged in yet");
    }
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        const pollResponses: { [key: string]: Snowflake[] } = {};
        for (const [key, values] of this.#cache)
          pollResponses[key] = values.map((v: bigint) => String(v));
        return pollResponses;
      }
      case JsonTypes.DISCORD_FORMAT:
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
