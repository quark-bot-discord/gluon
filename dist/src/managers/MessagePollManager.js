var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _MessagePollManager__client, _MessagePollManager_cache;
import { JsonTypes } from "#typings/enums.js";
/**
 * Manages a poll for a message.
 */
class MessagePollManager {
  /**
   * Creates a message poll manager.
   * @param {Object} existingResponses Existing responses for a poll.
   */
  constructor(client, existingResponses = {}) {
    _MessagePollManager__client.set(this, void 0);
    _MessagePollManager_cache.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof existingResponses !== "object")
      throw new TypeError("GLUON: Existing responses must be an object.");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _MessagePollManager__client, client, "f");
    /**
     * The cache of responses.
     * @type {Map<String, Array<BigInt>>}
     * @private
     */
    __classPrivateFieldSet(this, _MessagePollManager_cache, new Map(), "f");
    for (const [answer, answerValue] of Object.entries(existingResponses))
      __classPrivateFieldGet(this, _MessagePollManager_cache, "f").set(
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
    const currentUserList = __classPrivateFieldGet(
      this,
      _MessagePollManager_cache,
      "f",
    ).get(String(answer_id));
    if (currentUserList)
      __classPrivateFieldGet(this, _MessagePollManager_cache, "f").set(
        String(answer_id),
        [...currentUserList, BigInt(user_id)],
      );
    else
      __classPrivateFieldGet(this, _MessagePollManager_cache, "f").set(
        String(answer_id),
        [BigInt(user_id)],
      );
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
    const currentUserList = __classPrivateFieldGet(
      this,
      _MessagePollManager_cache,
      "f",
    ).get(String(answer_id));
    if (currentUserList)
      __classPrivateFieldGet(this, _MessagePollManager_cache, "f").set(
        String(answer_id),
        currentUserList.filter((x) => x !== BigInt(user_id)),
      );
  }
  /**
   * Returns the result for a given answer.
   * @param {Number} answerId The ID of the answer to get the result for.
   * @returns {Array<String>}
   */
  getResult(answerId) {
    if (typeof answerId !== "number")
      throw new TypeError("GLUON: Answer ID must be a number.");
    return (
      __classPrivateFieldGet(this, _MessagePollManager_cache, "f")
        .get(String(answerId))
        ?.map((v) => String(v)) ?? []
    );
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    if (!__classPrivateFieldGet(this, _MessagePollManager__client, "f").user) {
      throw new Error("GLUON: Client has not logged in yet");
    }
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        const pollResponses = {};
        for (const [key, values] of __classPrivateFieldGet(
          this,
          _MessagePollManager_cache,
          "f",
        ))
          pollResponses[key] = values.map((v) => String(v));
        return pollResponses;
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        const counts = [];
        for (const [key, values] of __classPrivateFieldGet(
          this,
          _MessagePollManager_cache,
          "f",
        ))
          counts.push({
            id: Number(key),
            count: values.length,
            me_voted: values.includes(
              BigInt(
                __classPrivateFieldGet(this, _MessagePollManager__client, "f")
                  .user.id,
              ),
            ),
          });
        return {
          answer_counts: counts,
        };
      }
    }
  }
}
(_MessagePollManager__client = new WeakMap()),
  (_MessagePollManager_cache = new WeakMap());
export default MessagePollManager;
//# sourceMappingURL=MessagePollManager.js.map
