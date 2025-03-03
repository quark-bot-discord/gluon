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
var _Reaction__client,
  _Reaction__guild_id,
  _Reaction_emoji,
  _Reaction__reacted,
  _Reaction_initial_reactor,
  _Reaction_count;
import Emoji from "./Emoji.js";
import util from "util";
import { JsonTypes } from "../../typings/index.d.js";
/**
 * Represents a reaction belonging to a message.
 */
class Reaction {
  /**
   * Creates the structure for a reaction.
   * @param {Client} client The client instance.
   * @param {Object} data The raw reaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the reaction belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure}
   */
  constructor(client, data, { guildId }) {
    _Reaction__client.set(this, void 0);
    _Reaction__guild_id.set(this, void 0);
    _Reaction_emoji.set(this, void 0);
    _Reaction__reacted.set(this, void 0);
    _Reaction_initial_reactor.set(this, void 0);
    _Reaction_count.set(this, void 0);
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
    __classPrivateFieldSet(this, _Reaction__client, client, "f");
    /**
     * The id of the guild that this reaction belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Reaction__guild_id, BigInt(guildId), "f");
    if ("emoji" in data && "mention" in data.emoji)
      /**
       * The emoji used for the reaction.
       * @type {Emoji}
       * @private
       */
      __classPrivateFieldSet(this, _Reaction_emoji, data.emoji, "f");
    else if ("emoji" in data)
      __classPrivateFieldSet(
        this,
        _Reaction_emoji,
        new Emoji(client, data.emoji, { guildId, nocache: true }),
        "f",
      );
    /**
     * Users who reacted with this emoji.
     * @type {Array<BigInt>}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Reaction__reacted,
      "_reacted" in data && Array.isArray(data._reacted)
        ? data._reacted.map((r) => BigInt(r))
        : [],
      "f",
    );
    if ("_reacted" in data && !Array.isArray(data._reacted) && "count" in data)
      __classPrivateFieldSet(this, _Reaction_count, data.count, "f");
    /**
     * The user who added the first reaction.
     * @type {BigInt?}
     * @private
     */
    if ("initial_reactor" in data && data.initial_reactor)
      __classPrivateFieldSet(
        this,
        _Reaction_initial_reactor,
        BigInt(data.initial_reactor),
        "f",
      );
  }
  /**
   * The number of reactions to this message.
   * @readonly
   * @type {Number}
   * @public
   */
  get count() {
    return (
      __classPrivateFieldGet(this, _Reaction_count, "f") ??
      __classPrivateFieldGet(this, _Reaction__reacted, "f").length
    );
  }
  /**
   * The member objects of the members who reacted. Returns the user id of the member cannot be found.
   * @readonly
   * @type {Array<Member | String>}
   * @public
   */
  get reacted() {
    return __classPrivateFieldGet(this, _Reaction__reacted, "f").map(
      (userId) => {
        const member = this.guild.members.get(String(userId));
        if (member) return member;
        else return String(userId);
      },
    );
  }
  /**
   * The user ids of the users who reacted.
   * @readonly
   * @type {Array<String>}
   * @public
   */
  get reactedIds() {
    return __classPrivateFieldGet(this, _Reaction__reacted, "f").map((r) =>
      String(r),
    );
  }
  /**
   * The id of the guild that this reaction belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _Reaction__guild_id, "f"));
  }
  /**
   * The guild that this reaction belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return (
      __classPrivateFieldGet(this, _Reaction__client, "f").guilds.get(
        this.guildId,
      ) || null
    );
  }
  /**
   * The emoji used for the reaction.
   * @type {Emoji}
   * @readonly
   * @public
   */
  get emoji() {
    return __classPrivateFieldGet(this, _Reaction_emoji, "f");
  }
  /**
   * The user who added the first reaction.
   * @type {String?}
   * @readonly
   * @public
   */
  get initialReactor() {
    return __classPrivateFieldGet(this, _Reaction_initial_reactor, "f")
      ? String(__classPrivateFieldGet(this, _Reaction_initial_reactor, "f"))
      : null;
  }
  /**
   * Adds a user to the list of reactors.
   * @param {String} userId The id of the user to add as a reactor.
   * @throws {TypeError}
   * @public
   * @method
   */
  _addReactor(userId) {
    var _a;
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");
    if (
      __classPrivateFieldGet(this, _Reaction__reacted, "f").length === 0 &&
      !__classPrivateFieldGet(this, _Reaction_initial_reactor, "f")
    )
      __classPrivateFieldSet(
        this,
        _Reaction_initial_reactor,
        BigInt(userId),
        "f",
      );
    __classPrivateFieldGet(this, _Reaction__reacted, "f").push(BigInt(userId));
    if (__classPrivateFieldGet(this, _Reaction_count, "f"))
      __classPrivateFieldSet(
        this,
        _Reaction_count,
        ((_a = __classPrivateFieldGet(this, _Reaction_count, "f")), _a++, _a),
        "f",
      );
  }
  /**
   * Removes a user from the list of reactors.
   * @param {String} userId The id of the user to add as a reactor.
   * @throws {TypeError}
   * @public
   * @method
   */
  _removeReactor(userId) {
    var _a;
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");
    __classPrivateFieldSet(
      this,
      _Reaction__reacted,
      __classPrivateFieldGet(this, _Reaction__reacted, "f").filter(
        (r) => r !== BigInt(userId),
      ),
      "f",
    );
    if (__classPrivateFieldGet(this, _Reaction_count, "f"))
      __classPrivateFieldSet(
        this,
        _Reaction_count,
        ((_a = __classPrivateFieldGet(this, _Reaction_count, "f")), _a--, _a),
        "f",
      );
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
  [((_Reaction__client = new WeakMap()),
  (_Reaction__guild_id = new WeakMap()),
  (_Reaction_emoji = new WeakMap()),
  (_Reaction__reacted = new WeakMap()),
  (_Reaction_initial_reactor = new WeakMap()),
  (_Reaction_count = new WeakMap()),
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
          emoji: this.emoji?.toJSON(format),
          _reacted: this.reactedIds,
          initial_reactor: this.initialReactor ?? undefined,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          emoji: this.emoji?.toJSON(format),
          count: this.count,
        };
      }
    }
  }
}
export default Reaction;
//# sourceMappingURL=Reaction.js.map
