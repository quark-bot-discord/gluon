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
var _MessageReactionManager__client,
  _MessageReactionManager_guild,
  _MessageReactionManager_cache;
import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Reaction from "../structures/Reaction.js";
/**
 * Manages the reactions of a message.
 */
class MessageReactionManager {
  /**
   * Creates a message reaction manager.
   * @param {Object} existingReactions Existing reactions for a message.
   */
  constructor(client, guild, existingReactions = {}) {
    _MessageReactionManager__client.set(this, void 0);
    _MessageReactionManager_guild.set(this, void 0);
    _MessageReactionManager_cache.set(this, void 0);
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
    __classPrivateFieldSet(this, _MessageReactionManager__client, client, "f");
    /**
     * The guild that this reaction manager belongs to.
     * @type {Guild}
     * @private
     */
    __classPrivateFieldSet(this, _MessageReactionManager_guild, guild, "f");
    /**
     * Cache of message reactions.
     * @type {Object}
     * @private
     */
    __classPrivateFieldSet(this, _MessageReactionManager_cache, {}, "f");
    for (const [messageReaction, messageReactionValue] of Object.entries(
      existingReactions,
    ))
      __classPrivateFieldGet(this, _MessageReactionManager_cache, "f")[
        messageReaction
      ] = new Reaction(
        __classPrivateFieldGet(this, _MessageReactionManager__client, "f"),
        messageReactionValue,
        {
          guildId: __classPrivateFieldGet(
            this,
            _MessageReactionManager_guild,
            "f",
          ).id,
        },
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
  _addReaction(userId, emoji, data) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");
    if (typeof emoji !== "string")
      throw new TypeError("GLUON: Emoji must be a string.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object.");
    if (
      !__classPrivateFieldGet(this, _MessageReactionManager_cache, "f")[emoji]
    )
      __classPrivateFieldGet(this, _MessageReactionManager_cache, "f")[emoji] =
        new Reaction(
          __classPrivateFieldGet(this, _MessageReactionManager__client, "f"),
          data,
          {
            guildId: __classPrivateFieldGet(
              this,
              _MessageReactionManager_guild,
              "f",
            ).id,
          },
        );
    __classPrivateFieldGet(this, _MessageReactionManager_cache, "f")[
      emoji
    ]._addReactor(userId);
  }
  /**
   * Removes a reaction from a message.
   * @param {String} userId The id of the user whose reaction was removed.
   * @param {String} emoji The id or unicode emoji for which the reaction was removed.
   * @throws {TypeError}
   * @public
   * @method
   */
  _removeReaction(userId, emoji) {
    if (typeof userId !== "string")
      throw new TypeError("GLUON: User ID must be a string.");
    if (typeof emoji !== "string")
      throw new TypeError("GLUON: Emoji must be a string.");
    if (
      __classPrivateFieldGet(this, _MessageReactionManager_cache, "f")[emoji]
    ) {
      __classPrivateFieldGet(this, _MessageReactionManager_cache, "f")[
        emoji
      ]._removeReactor(userId);
      if (
        __classPrivateFieldGet(this, _MessageReactionManager_cache, "f")[emoji]
          .count == 0
      )
        delete __classPrivateFieldGet(this, _MessageReactionManager_cache, "f")[
          emoji
        ];
    }
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
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        const messageReactions = {};
        for (const [reaction, reactionData] of Object.entries(
          __classPrivateFieldGet(this, _MessageReactionManager_cache, "f"),
        ))
          messageReactions[reaction] = reactionData.toJSON(format);
        return messageReactions;
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return Array.from(
          Object.values(
            __classPrivateFieldGet(this, _MessageReactionManager_cache, "f"),
          ),
        ).map((o) => o.toJSON(format));
      }
    }
  }
}
(_MessageReactionManager__client = new WeakMap()),
  (_MessageReactionManager_guild = new WeakMap()),
  (_MessageReactionManager_cache = new WeakMap());
export default MessageReactionManager;
//# sourceMappingURL=MessageReactionManager.js.map
