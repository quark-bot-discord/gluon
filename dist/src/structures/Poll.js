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
var _Poll__client,
  _Poll__guild_id,
  _Poll_question,
  _Poll_answers,
  _Poll_expiry,
  _Poll_allow_multiselect,
  _Poll_layout_type,
  _Poll_results;
import MessagePollManager from "../managers/MessagePollManager.js";
import Emoji from "./Emoji.js";
import util from "util";
import { JsonTypes } from "../../typings/index.d.js";
class Poll {
  /**
   * Creates the structure for a poll.
   * @param {Client} client The client instance.
   * @param {Object} data The raw poll data from Discord.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this poll belongs to.
   */
  constructor(client, data, { guildId }) {
    _Poll__client.set(this, void 0);
    _Poll__guild_id.set(this, void 0);
    _Poll_question.set(this, void 0);
    _Poll_answers.set(this, void 0);
    _Poll_expiry.set(this, void 0);
    _Poll_allow_multiselect.set(this, void 0);
    _Poll_layout_type.set(this, void 0);
    _Poll_results.set(this, void 0);
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
    __classPrivateFieldSet(this, _Poll__client, client, "f");
    /**
     * The ID of the guild that this poll belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Poll__guild_id, BigInt(guildId), "f");
    /**
     * The question of the poll.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _Poll_question, data.question, "f");
    /**
     * The answers of the poll.
     * @type {Array<Object>}
     * @private
     */
    __classPrivateFieldSet(this, _Poll_answers, data.answers, "f");
    /**
     * The UNIX timestamp of the expiry time for the poll.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Poll_expiry,
      data.expiry ? (new Date(data.expiry).getTime() / 1000) | 0 : null,
      "f",
    );
    /**
     * Whether the poll allows multiselect.
     * @type {Boolean}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Poll_allow_multiselect,
      data.allow_multiselect,
      "f",
    );
    /**
     * The layout type of the poll.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _Poll_layout_type, data.layout_type, "f");
    /**
     * The poll responses.
     * @type {MessagePollManager}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Poll_results,
      new MessagePollManager(
        __classPrivateFieldGet(this, _Poll__client, "f"),
        "_results" in data ? data._results : undefined,
      ),
      "f",
    );
  }
  /**
   * The ID of the guild that this poll belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _Poll__guild_id, "f"));
  }
  /**
   * The guild that this poll belongs to.
   * @type {Guild}
   * @readonly
   * @public
   */
  get guild() {
    return __classPrivateFieldGet(this, _Poll__client, "f").guilds.get(
      this.guildId,
    );
  }
  /**
   * The question of the poll.
   * @type {String}
   * @readonly
   * @public
   */
  get question() {
    return `${__classPrivateFieldGet(this, _Poll_question, "f").emoji ? `${Emoji.getMention(__classPrivateFieldGet(this, _Poll_question, "f").emoji.name /** name only not provided with reactions */, __classPrivateFieldGet(this, _Poll_question, "f").emoji.id, __classPrivateFieldGet(this, _Poll_question, "f").emoji.animated)} ` : ""}${__classPrivateFieldGet(this, _Poll_question, "f").text ? __classPrivateFieldGet(this, _Poll_question, "f").text : ""}`;
  }
  /**
   * The answers of the poll.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get answers() {
    if (!__classPrivateFieldGet(this, _Poll_answers, "f")) return [];
    return __classPrivateFieldGet(this, _Poll_answers, "f").map((a) => {
      return {
        answerId: a.answer_id,
        answer: `${a.poll_media.emoji ? `${Emoji.getMention(a.poll_media.emoji.name /** name only not provided with reactions */, a.poll_media.emoji.id, a.poll_media.emoji.animated)} ` : ""}${a.poll_media.text}`,
        result: this._results.getResult(a.answer_id),
      };
    });
  }
  /**
   * The UNIX timestamp of the expiry time for the poll.
   * @type {Number}
   * @readonly
   * @public
   */
  get expiry() {
    return __classPrivateFieldGet(this, _Poll_expiry, "f");
  }
  /**
   * Whether the poll allows multiselect.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get allowMultiselect() {
    return __classPrivateFieldGet(this, _Poll_allow_multiselect, "f");
  }
  /**
   * The layout type of the poll.
   * @type {String}
   * @readonly
   * @public
   */
  get layoutType() {
    return __classPrivateFieldGet(this, _Poll_layout_type, "f");
  }
  /**
   * The poll responses.
   * @type {MessagePollManager}
   * @readonly
   * @public
   */
  get _results() {
    return __classPrivateFieldGet(this, _Poll_results, "f");
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<Poll: ${this.question}>`;
  }
  /**
   * @method
   * @public
   */
  [((_Poll__client = new WeakMap()),
  (_Poll__guild_id = new WeakMap()),
  (_Poll_question = new WeakMap()),
  (_Poll_answers = new WeakMap()),
  (_Poll_expiry = new WeakMap()),
  (_Poll_allow_multiselect = new WeakMap()),
  (_Poll_layout_type = new WeakMap()),
  (_Poll_results = new WeakMap()),
  util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          question: __classPrivateFieldGet(this, _Poll_question, "f"),
          answers: __classPrivateFieldGet(this, _Poll_answers, "f"),
          expiry: this.expiry ? this.expiry * 1000 : null,
          allow_multiselect: this.allowMultiselect,
          layout_type: this.layoutType,
          _results: this._results.toJSON(format),
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          question: __classPrivateFieldGet(this, _Poll_question, "f"),
          answers: __classPrivateFieldGet(this, _Poll_answers, "f"),
          expiry: this.expiry
            ? new Date(this.expiry * 1000).toISOString()
            : null,
          allow_multiselect: this.allowMultiselect,
          layout_type: this.layoutType,
          results: this._results.toJSON(format),
        };
      }
    }
  }
}
export default Poll;
//# sourceMappingURL=Poll.js.map
