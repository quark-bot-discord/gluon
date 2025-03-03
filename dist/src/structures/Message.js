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
var _Message__client,
  _Message__guild_id,
  _Message__channel_id,
  _Message__id,
  _Message_author,
  _Message_attachments,
  _Message_content,
  _Message_poll,
  _Message_reactions,
  _Message_embeds,
  _Message__attributes,
  _Message_reference,
  _Message_type,
  _Message_webhook_id,
  _Message_sticker_items,
  _Message_message_snapshots,
  _Message_edited_timestamp,
  _Message_flags;
import User from "./User.js";
import Member from "./Member.js";
import Attachment from "./Attachment.js";
import {
  PERMISSIONS,
  BASE_URL,
  LIMITS,
  GLUON_DEBUG_LEVELS,
} from "../constants.js";
import checkPermission from "../util/discord/checkPermission.js";
import Sticker from "./Sticker.js";
import getTimestamp from "../util/discord/getTimestampFromSnowflake.js";
import MessageReactionManager from "../managers/MessageReactionManager.js";
import Poll from "./Poll.js";
import Embed from "../util/builder/embedBuilder.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import ChannelCacheOptions from "../managers/ChannelCacheOptions.js";
import util from "util";
import MessageComponents from "../util/builder/messageComponents.js";
import encryptStructure from "../util/gluon/encryptStructure.js";
import structureHashName from "../util/general/structureHashName.js";
import decryptStructure from "../util/gluon/decryptStructure.js";
import GuildChannelsManager from "../managers/GuildChannelsManager.js";
import GuildManager from "../managers/GuildManager.js";
import GuildMemberManager from "../managers/GuildMemberManager.js";
import { JsonTypes } from "../../typings/index.d.js";
/**
 * A message belonging to a channel within a guild.
 */
class Message {
  /**
   * Creates the structure for a message.
   * @param {Client} client The client instance.
   * @param {Object} data Message data returned from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.channelId The id of the channel that the message belongs to.
   * @param {String} options.guildId The id of the guild that the channel belongs to.
   * @param {Boolean?} [options.nocache] Whether this message should be cached or not.
   * @param {Boolean?} [options.ignoreExisting] Whether to ignore existing messages in the cache.
   * @see {@link https://discord.com/developers/docs/resources/channel#message-object}
   */
  constructor(
    client,
    data,
    { channelId, guildId, nocache = false, ignoreExisting = false },
  ) {
    _Message__client.set(this, void 0);
    _Message__guild_id.set(this, void 0);
    _Message__channel_id.set(this, void 0);
    _Message__id.set(this, void 0);
    _Message_author.set(this, void 0);
    _Message_attachments.set(this, void 0);
    _Message_content.set(this, void 0);
    _Message_poll.set(this, void 0);
    _Message_reactions.set(this, void 0);
    _Message_embeds.set(this, void 0);
    _Message__attributes.set(this, void 0);
    _Message_reference.set(this, void 0);
    _Message_type.set(this, void 0);
    _Message_webhook_id.set(this, void 0);
    _Message_sticker_items.set(this, void 0);
    _Message_message_snapshots.set(this, void 0);
    _Message_edited_timestamp.set(this, void 0);
    _Message_flags.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    if (typeof nocache !== "boolean")
      throw new TypeError("GLUON: No cache must be a boolean");
    if (typeof ignoreExisting !== "boolean")
      throw new TypeError("GLUON: Ignore existing must be a boolean");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _Message__client, client, "f");
    /**
     * The id of the guild that this message belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Message__guild_id, BigInt(guildId), "f");
    /**
     * The id of the channel that this message belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Message__channel_id, BigInt(channelId), "f");
    const existing =
      ignoreExisting != true
        ? this.channel?.messages.get(data.id) || null
        : null;
    /**
     * The id of the message.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Message__id, BigInt(data.id), "f");
    /**
     * The timestamp for when this message was last edited.
     * @type {Number?}
     * @private
     */
    if (data.edited_timestamp)
      __classPrivateFieldSet(
        this,
        _Message_edited_timestamp,
        (new Date(data.edited_timestamp).getTime() / 1000) | 0,
        "f",
      );
    else if (existing?.editedTimestamp)
      __classPrivateFieldSet(
        this,
        _Message_edited_timestamp,
        existing.editedTimestamp,
        "f",
      );
    // messages only ever need to be cached if logging is enabled
    // but this should always return a "refined" message, so commands can be handled
    if (data.author)
      /**
       * The message author.
       * @type {User}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _Message_author,
        new User(
          __classPrivateFieldGet(this, _Message__client, "f"),
          data.author,
          {
            // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'false'.
            nocache: !data.webhook_id || nocache,
          },
        ),
        "f",
      );
    else if (existing?.author)
      __classPrivateFieldSet(this, _Message_author, existing.author, "f");
    else {
      throw new Error("GLUON: Message author is missing.");
    }
    if ("member" in data && data.member) {
      new Member(
        __classPrivateFieldGet(this, _Message__client, "f"),
        data.member,
        {
          userId: data.author.id,
          guildId,
          user: new User(
            __classPrivateFieldGet(this, _Message__client, "f"),
            data.author,
          ),
        },
      );
    }
    // should only be stored if file logging is enabled
    /**
     * The message attachments.
     * @type {Attachment[]?}
     * @private
     */
    __classPrivateFieldSet(this, _Message_attachments, [], "f");
    if (data.attachments != undefined)
      for (let i = 0; i < data.attachments.length; i++)
        __classPrivateFieldGet(this, _Message_attachments, "f").push(
          new Attachment(
            __classPrivateFieldGet(this, _Message__client, "f"),
            data.attachments[i],
            {
              channelId: this.channelId,
            },
          ),
        );
    else if (existing?.attachments)
      __classPrivateFieldSet(
        this,
        _Message_attachments,
        existing.attachments,
        "f",
      );
    /**
     * The message content.
     * @type {String?}
     * @private
     */
    if (this.channel?._cacheOptions.contentCaching !== false) {
      __classPrivateFieldSet(this, _Message_content, data.content, "f");
      if (
        !__classPrivateFieldGet(this, _Message_content, "f") &&
        existing &&
        existing.content
      )
        __classPrivateFieldSet(this, _Message_content, existing.content, "f");
      else if (!__classPrivateFieldGet(this, _Message_content, "f"))
        __classPrivateFieldSet(this, _Message_content, null, "f");
    }
    if (this.channel?._cacheOptions.pollCaching !== false) {
      /**
       * The message poll.
       * @type {Object?}
       * @private
       */
      if (data.poll)
        __classPrivateFieldSet(
          this,
          _Message_poll,
          new Poll(
            __classPrivateFieldGet(this, _Message__client, "f"),
            data.poll,
            { guildId },
          ),
          "f",
        );
      else if (
        __classPrivateFieldGet(this, _Message_poll, "f") == undefined &&
        existing &&
        existing.poll != undefined
      )
        __classPrivateFieldSet(this, _Message_poll, existing.poll, "f");
      else if (__classPrivateFieldGet(this, _Message_poll, "f") == undefined)
        __classPrivateFieldSet(this, _Message_poll, undefined, "f");
    }
    if (this.channel?._cacheOptions.reactionCaching !== false) {
      if (existing?.reactions)
        /**
         * The message reactions.
         * @type {MessageReactionManager}
         * @private
         */
        __classPrivateFieldSet(
          this,
          _Message_reactions,
          existing.reactions,
          "f",
        );
      else if ("messageReactions" in data)
        __classPrivateFieldSet(
          this,
          _Message_reactions,
          new MessageReactionManager(
            __classPrivateFieldGet(this, _Message__client, "f"),
            this.guild,
            data.messageReactions,
          ),
          "f",
        );
    }
    if (this.channel?._cacheOptions.embedCaching !== false) {
      /**
       * The message embeds.
       * @type {Embed[]}
       * @private
       */
      if (data.embeds)
        __classPrivateFieldSet(
          this,
          _Message_embeds,
          data.embeds.map((e) => new Embed(e)),
          "f",
        );
      else if (existing && existing.embeds != undefined)
        __classPrivateFieldSet(this, _Message_embeds, existing.embeds, "f");
      else if (__classPrivateFieldGet(this, _Message_embeds, "f") == undefined)
        __classPrivateFieldSet(this, _Message_embeds, [], "f");
    }
    if (this.channel?._cacheOptions.attributeCaching !== false) {
      /**
       * The message attributes.
       * @type {Number}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _Message__attributes,
        "_attributes" in data ? data._attributes : 0,
        "f",
      );
      if ("mentions" in data && data.mentions.length != 0)
        __classPrivateFieldSet(
          this,
          _Message__attributes,
          __classPrivateFieldGet(this, _Message__attributes, "f") | (0b1 << 0),
          "f",
        );
      else if (!("mentions" in data) && existing && existing.mentions == true)
        __classPrivateFieldSet(
          this,
          _Message__attributes,
          __classPrivateFieldGet(this, _Message__attributes, "f") | (0b1 << 0),
          "f",
        );
      if ("mention_roles" in data && data.mention_roles.length != 0)
        __classPrivateFieldSet(
          this,
          _Message__attributes,
          __classPrivateFieldGet(this, _Message__attributes, "f") | (0b1 << 1),
          "f",
        );
      else if (
        !("mention_roles" in data) &&
        existing &&
        existing.mentionRoles == true
      )
        __classPrivateFieldSet(
          this,
          _Message__attributes,
          __classPrivateFieldGet(this, _Message__attributes, "f") | (0b1 << 1),
          "f",
        );
      if ("mention_everyone" in data && data.mention_everyone == true)
        __classPrivateFieldSet(
          this,
          _Message__attributes,
          __classPrivateFieldGet(this, _Message__attributes, "f") | (0b1 << 2),
          "f",
        );
      else if (
        !("mention_everyone" in data) &&
        existing &&
        existing.mentionEveryone == true
      )
        __classPrivateFieldSet(
          this,
          _Message__attributes,
          __classPrivateFieldGet(this, _Message__attributes, "f") | (0b1 << 2),
          "f",
        );
      if ("pinned" in data && data.pinned == true)
        __classPrivateFieldSet(
          this,
          _Message__attributes,
          __classPrivateFieldGet(this, _Message__attributes, "f") | (0b1 << 3),
          "f",
        );
      else if (!("pinned" in data) && existing && existing.pinned == true)
        __classPrivateFieldSet(
          this,
          _Message__attributes,
          __classPrivateFieldGet(this, _Message__attributes, "f") | (0b1 << 3),
          "f",
        );
      if ("mirrored" in data && data.mirrored == true)
        __classPrivateFieldSet(
          this,
          _Message__attributes,
          __classPrivateFieldGet(this, _Message__attributes, "f") | (0b1 << 4),
          "f",
        );
      else if (!("mirrored" in data) && existing && existing.mirrored == true)
        __classPrivateFieldSet(
          this,
          _Message__attributes,
          __classPrivateFieldGet(this, _Message__attributes, "f") | (0b1 << 4),
          "f",
        );
    }
    if (this.channel?._cacheOptions.referenceCaching !== false) {
      /**
       * The message that this message references.
       * @type {Object}
       * @private
       */
      __classPrivateFieldSet(this, _Message_reference, {}, "f");
      if (data.referenced_message)
        // @ts-expect-error TS(2339): Property 'message_id' does not exist on type '{}'.
        __classPrivateFieldGet(this, _Message_reference, "f").message_id =
          BigInt(data.referenced_message.id);
      else if (existing && existing.reference?.messageId)
        // @ts-expect-error TS(2339): Property 'message_id' does not exist on type '{}'.
        __classPrivateFieldGet(this, _Message_reference, "f").message_id =
          existing.reference.messageId;
    }
    /**
     * The flags of the message.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Message_flags,
      "flags" in data ? (data.flags ?? 0) : 0,
      "f",
    );
    if (
      existing &&
      existing.flags != undefined &&
      __classPrivateFieldGet(this, _Message_flags, "f") === 0
    )
      __classPrivateFieldSet(this, _Message_flags, existing.flags, "f");
    /**
     * The type of message.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _Message_type, data.type, "f");
    if (
      typeof __classPrivateFieldGet(this, _Message_type, "f") != "number" &&
      existing &&
      typeof existing.type == "number"
    )
      __classPrivateFieldSet(this, _Message_type, existing.type, "f");
    if (this.channel?._cacheOptions.webhookCaching !== false) {
      /**
       * The id of the webhook this message is from.
       * @type {BigInt?}
       * @private
       */
      if ("webhook_id" in data && data.webhook_id)
        __classPrivateFieldSet(
          this,
          _Message_webhook_id,
          BigInt(data.webhook_id),
          "f",
        );
      else if (existing?.webhookId)
        __classPrivateFieldSet(
          this,
          _Message_webhook_id,
          existing.webhookId,
          "f",
        );
    }
    if (this.channel?._cacheOptions.stickerCaching !== false) {
      /**
       * Stickers sent with this message.
       * @type {Sticker[]}
       * @private
       */
      __classPrivateFieldSet(this, _Message_sticker_items, [], "f");
      if (data.sticker_items != undefined)
        for (let i = 0; i < data.sticker_items.length; i++)
          __classPrivateFieldGet(this, _Message_sticker_items, "f").push(
            new Sticker(
              __classPrivateFieldGet(this, _Message__client, "f"),
              data.sticker_items[i],
            ),
          );
      else if (existing && existing.stickerItems != undefined)
        __classPrivateFieldSet(
          this,
          _Message_sticker_items,
          existing.stickerItems,
          "f",
        );
    }
    if (this.channel?._cacheOptions.referenceCaching !== false) {
      /**
       * The snapshot data about the message.
       * @type {Array<Object>?}
       * @private
       */
      if (data.message_snapshots)
        __classPrivateFieldSet(
          this,
          _Message_message_snapshots,
          data.message_snapshots,
          "f",
        );
      else if (existing && existing.messageSnapshots != undefined)
        __classPrivateFieldSet(
          this,
          _Message_message_snapshots,
          existing.messageSnapshots,
          "f",
        );
    }
    const shouldCache = this.channel
      ? Message.shouldCache(
          __classPrivateFieldGet(this, _Message__client, "f")._cacheOptions,
          this.guild._cacheOptions,
          this.channel._cacheOptions,
        )
      : false;
    const attachmentsPresent =
      __classPrivateFieldGet(this, _Message_attachments, "f").length !== 0 &&
      this.channel?._cacheOptions.fileCaching !== false;
    const contentPresent =
      __classPrivateFieldGet(this, _Message_content, "f") &&
      this.channel?._cacheOptions.contentCaching !== false;
    const pollPresent =
      __classPrivateFieldGet(this, _Message_poll, "f") &&
      this.channel?._cacheOptions.pollCaching !== false;
    const reactionsPresent =
      __classPrivateFieldGet(this, _Message_reactions, "f") &&
      this.channel?._cacheOptions.reactionCaching !== false;
    const embedsPresent =
      __classPrivateFieldGet(this, _Message_embeds, "f") &&
      __classPrivateFieldGet(this, _Message_embeds, "f").length !== 0 &&
      this.channel?._cacheOptions.embedCaching !== false;
    const attributesPresent =
      __classPrivateFieldGet(this, _Message__attributes, "f") !== 0 &&
      this.channel?._cacheOptions.attributeCaching !== false;
    const referencePresent =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      __classPrivateFieldGet(this, _Message_reference, "f").message_id &&
      this.channel?._cacheOptions.referenceCaching !== false;
    const webhookPresent =
      __classPrivateFieldGet(this, _Message_webhook_id, "f") &&
      this.channel?._cacheOptions.webhookCaching !== false;
    const stickerPresent =
      __classPrivateFieldGet(this, _Message_sticker_items, "f") &&
      __classPrivateFieldGet(this, _Message_sticker_items, "f").length !== 0 &&
      this.channel?._cacheOptions.stickerCaching !== false;
    const snapshotsPresent =
      __classPrivateFieldGet(this, _Message_message_snapshots, "f") &&
      this.channel?._cacheOptions.referenceCaching !== false;
    if (
      nocache === false &&
      shouldCache &&
      (attachmentsPresent ||
        contentPresent ||
        pollPresent ||
        reactionsPresent ||
        embedsPresent ||
        attributesPresent ||
        referencePresent ||
        webhookPresent ||
        stickerPresent ||
        snapshotsPresent)
    ) {
      this.channel?.messages.set(data.id, this);
      __classPrivateFieldGet(this, _Message__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE MESSAGE ${guildId} ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _Message__client, "f")._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE MESSAGE ${guildId} ${data.id} (${nocache} ${shouldCache} ${attachmentsPresent} ${contentPresent} ${pollPresent} ${reactionsPresent} ${embedsPresent} ${attributesPresent} ${referencePresent} ${webhookPresent} ${stickerPresent} ${snapshotsPresent})`,
      );
    }
  }
  /**
   * The timestamp for when this message was last edited.
   * @type {Number?}
   * @readonly
   * @public
   */
  get editedTimestamp() {
    return __classPrivateFieldGet(this, _Message_edited_timestamp, "f") ?? null;
  }
  /**
   * The user who sent the message.
   * @type {User}
   * @readonly
   * @public
   */
  get author() {
    return __classPrivateFieldGet(this, _Message_author, "f");
  }
  /**
   * The id of the user who sent the message.
   * @type {String}
   * @readonly
   * @public
   */
  get authorId() {
    return __classPrivateFieldGet(this, _Message_author, "f").id;
  }
  /**
   * The member who sent the message.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member() {
    if (!this.author || !this.author.id) {
      return null;
    }
    return GuildMemberManager.getMember(
      __classPrivateFieldGet(this, _Message__client, "f"),
      this.guildId,
      this.authorId,
    );
  }
  /**
   * Whether this message includes user mentions.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mentions() {
    return (
      (__classPrivateFieldGet(this, _Message__attributes, "f") & (0b1 << 0)) ==
      0b1 << 0
    );
  }
  /**
   * Whether this message includes role mentions.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mentionRoles() {
    return (
      (__classPrivateFieldGet(this, _Message__attributes, "f") & (0b1 << 1)) ==
      0b1 << 1
    );
  }
  /**
   * Whether this message mentions everyone.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mentionEveryone() {
    return (
      (__classPrivateFieldGet(this, _Message__attributes, "f") & (0b1 << 2)) ==
      0b1 << 2
    );
  }
  /**
   * Whether this message has been pinned.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get pinned() {
    return (
      (__classPrivateFieldGet(this, _Message__attributes, "f") & (0b1 << 3)) ==
      0b1 << 3
    );
  }
  /**
   * Whether another message has replaced this original message.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mirrored() {
    return (
      (__classPrivateFieldGet(this, _Message__attributes, "f") & (0b1 << 4)) ==
      0b1 << 4
    );
  }
  /**
   * The UNIX (seconds) timestamp for when this message was created.
   * @readonly
   * @type {Number}
   * @public
   */
  get timestamp() {
    return getTimestamp(this.id);
  }
  /**
   * The guild that this message belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return (
      __classPrivateFieldGet(this, _Message__client, "f").guilds.get(
        this.guildId,
      ) || null
    );
  }
  /**
   * The guild that this message belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _Message__guild_id, "f"));
  }
  /**
   * The channel that this message belongs to.
   * @type {Channel?}
   * @readonly
   * @public
   */
  get channel() {
    return this.guild?.channels.get(this.channelId) || null;
  }
  /**
   * The channel that this message belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId() {
    return String(__classPrivateFieldGet(this, _Message__channel_id, "f"));
  }
  /**
   * The id of the message.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _Message__id, "f"));
  }
  /**
   * The message attachments.
   * @type {Attachment[]}
   * @readonly
   * @public
   */
  get attachments() {
    return __classPrivateFieldGet(this, _Message_attachments, "f");
  }
  /**
   * The message content.
   * @type {String?}
   * @readonly
   * @public
   */
  get content() {
    return __classPrivateFieldGet(this, _Message_content, "f");
  }
  /**
   * The message poll.
   * @type {Poll?}
   * @readonly
   * @public
   */
  get poll() {
    return __classPrivateFieldGet(this, _Message_poll, "f") ?? null;
  }
  /**
   * The message reactions.
   * @type {MessageReactionManager}
   * @readonly
   * @public
   */
  get reactions() {
    if (!__classPrivateFieldGet(this, _Message_reactions, "f")) {
      throw new Error("GLUON: Message reactions are missing.");
    }
    return __classPrivateFieldGet(this, _Message_reactions, "f");
  }
  /**
   * The message embeds.
   * @type {Array<Embed>}
   * @readonly
   * @public
   */
  get embeds() {
    if (!__classPrivateFieldGet(this, _Message_embeds, "f")) {
      throw new Error("GLUON: Message embeds are missing.");
    }
    return __classPrivateFieldGet(this, _Message_embeds, "f");
  }
  /**
   * The message that this message references.
   * @type {Object}
   * @readonly
   * @public
   */
  get reference() {
    return {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      messageId: __classPrivateFieldGet(this, _Message_reference, "f")
        .message_id
        ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          String(
            __classPrivateFieldGet(this, _Message_reference, "f").message_id,
          )
        : null,
    };
  }
  /**
   * The flags of the message.
   * @type {String[]}
   * @readonly
   * @public
   * @see {@link https://discord.com/developers/docs/resources/message#message-object-message-flags}
   */
  get flags() {
    return __classPrivateFieldGet(this, _Message_flags, "f");
  }
  /**
   * The type of message.
   * @type {Number}
   * @readonly
   * @public
   */
  get type() {
    return __classPrivateFieldGet(this, _Message_type, "f");
  }
  /**
   * The id of the webhook this message is from.
   * @type {String?}
   * @readonly
   * @public
   */
  get webhookId() {
    return __classPrivateFieldGet(this, _Message_webhook_id, "f")
      ? String(__classPrivateFieldGet(this, _Message_webhook_id, "f"))
      : null;
  }
  /**
   * Stickers sent with this message.
   * @type {Sticker[]}
   * @readonly
   * @public
   */
  get stickerItems() {
    if (!__classPrivateFieldGet(this, _Message_sticker_items, "f")) {
      throw new Error("GLUON: Sticker items are missing.");
    }
    return __classPrivateFieldGet(this, _Message_sticker_items, "f");
  }
  /**
   * The snapshot data about the message.
   * @type {Array<Message>?}
   * @readonly
   * @public
   */
  get messageSnapshots() {
    return __classPrivateFieldGet(this, _Message_message_snapshots, "f") &&
      Array.isArray(
        __classPrivateFieldGet(this, _Message_message_snapshots, "f"),
      )
      ? __classPrivateFieldGet(this, _Message_message_snapshots, "f").map(
          (snapshot) => {
            snapshot.id = this.id;
            return new Message(
              __classPrivateFieldGet(this, _Message__client, "f"),
              snapshot,
              {
                channelId: this.channelId,
                guildId: this.guildId,
                nocache: true,
                ignoreExisting: true,
              },
            );
          },
        )
      : null;
  }
  /**
   * The URL of the message.
   * @type {String}
   * @readonly
   * @public
   */
  get url() {
    return Message.getUrl(this.guildId, this.channelId, this.id);
  }
  /**
   * The hash name for the message.
   * @type {String}
   * @readonly
   * @public
   */
  get hashName() {
    return Message.getHashName(this.guildId, this.channelId, this.id);
  }
  /**
   * The URL of the message.
   * @param {String} guildId The id of the guild that the message belongs to.
   * @param {String} channelId The id of the channel that the message belongs to.
   * @param {String} messageId The id of the message.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getUrl(guildId, channelId, messageId) {
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID must be a string.");
    return `${BASE_URL}/channels/${guildId}/${channelId}/${messageId}`;
  }
  /**
   * Replies to the message.
   * @param {Object?} [options] Embeds, components and files to attach to the message.
   * @param {String?} [options.content] The message content.
   * @param {Embed?} [options.embed] Embed to send with the message.
   * @param {MessageComponents?} [options.components] Message components to send with the message.
   * @param {Array<FileUpload>?} [options.files] Array of file objects for files to send with the message.
   * @returns {Promise<Message>}
   * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
   * @method
   * @public
   * @async
   * @throws {Error | TypeError}
   */
  reply({ content, embeds, components, files, suppressMentions = false }) {
    return Message.send(
      __classPrivateFieldGet(this, _Message__client, "f"),
      this.channelId,
      this.guildId,
      {
        content,
        reference: {
          message_id: this.id,
          channel_id: this.channelId,
          guild_id: this.guildId,
        },
        embeds,
        components,
        files,
        suppressMentions,
      },
    );
  }
  /**
   * Edits the message, assuming it is sent by the client user.
   * @param {Object?} [options] Content, embeds and components to attach to the message.
   * @param {String?} [options.content] The message content.
   * @param {Embed?} [options.embed] Embed to send with the message.
   * @param {MessageComponents?} [options.components] Message components to send with the message.
   * @param {Array<Attachment>?} [options.attachments] Array of attachment objects for files to send with the message.
   * @param {Number?} [options.flags] The message flags.
   * @param {Object?} [options.reference] The message reference.
   * @param {String?} [options.reference.message_id] The id of the message to reference.
   * @param {String?} [options.reference.channel_id] The id of the channel to reference.
   * @param {String?} [options.reference.guild_id] The id of the guild to reference.
   * @param {FileUpload[]?} [options.files] Array of file objects for files to send with the message.
   * @returns {Promise<Message>}
   * @see {@link https://discord.com/developers/docs/resources/channel#edit-message}
   * @method
   * @public
   * @async
   * @throws {Error | TypeError}
   */
  edit(options) {
    const {
      components = undefined,
      files = [],
      content = this.content,
      embeds = this.embeds,
      attachments = this.attachments,
    } = options;
    return Message.edit(
      __classPrivateFieldGet(this, _Message__client, "f"),
      this.channelId,
      this.id,
      this.guildId,
      {
        content,
        components,
        files,
        embeds,
        attachments,
      },
    );
  }
  /**
   * Deletes the message.
   * @param {Object?} [options] The options for deleting the message.
   * @param {String?} [options.reason] The reason for deleting the message
   * @returns {Promise<void>}
   * @method
   * @public
   * @async
   */
  delete({ reason } = {}) {
    return Message.delete(
      __classPrivateFieldGet(this, _Message__client, "f"),
      this.guildId,
      this.channelId,
      this.id,
      { reason },
    );
  }
  /**
   * Determines whether the message should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @param {ChannelCacheOptions} channelCacheOptions The cache options for the channel.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(
    gluonCacheOptions,
    guildCacheOptions,
    channelCacheOptions,
  ) {
    if (!(gluonCacheOptions instanceof GluonCacheOptions))
      throw new TypeError(
        "GLUON: Gluon cache options must be a GluonCacheOptions.",
      );
    if (!(guildCacheOptions instanceof GuildCacheOptions))
      throw new TypeError(
        "GLUON: Guild cache options must be a GuildCacheOptions.",
      );
    if (!(channelCacheOptions instanceof ChannelCacheOptions))
      throw new TypeError(
        "GLUON: Channel cache options must be a ChannelCacheOptions.",
      );
    if (gluonCacheOptions.cacheMessages === false) return false;
    if (guildCacheOptions.messageCaching === false) return false;
    if (channelCacheOptions.messageCaching === false) return false;
    return true;
  }
  /**
   * Posts a message to the specified channel.
   * @param {Client} client The client instance.
   * @param {String} channelId The id of the channel to send the message to.
   * @param {String} guildId The id of the guild which the channel belongs to.
   * @param {Object?} [options] Content, embeds, components and files to attach to the message.
   * @param {String?} [options.content] The message content.
   * @param {Embed[]} [options.embeds] Array of embeds to send with the message.
   * @param {MessageComponents?} [options.components] Message components to send with the message.
   * @param {Array<FileUpload>?} [options.files] Array of file objects for files to send with the message.
   * @param {Boolean?} [options.suppressMentions] Whether to suppress mentions in the message.
   * @returns {Promise<Message>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  static async send(
    client,
    channelId,
    guildId,
    { content, embeds, components, files, reference, suppressMentions = false },
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    Message.sendValidation({ content, embeds, components, files, reference });
    if (typeof suppressMentions !== "boolean")
      throw new TypeError("GLUON: Suppress mentions is not a boolean.");
    if (
      !checkPermission(
        GuildChannelsManager.getChannel(
          client,
          guildId,
          channelId,
        ).checkPermission(await GuildManager.getGuild(client, guildId).me()),
        PERMISSIONS.SEND_MESSAGES,
      )
    )
      throw new Error("MISSING PERMISSIONS: SEND_MESSAGES");
    const body = {};
    // @ts-expect-error TS(2339): Property 'content' does not exist on type '{}'.
    if (content) body.content = content;
    // @ts-expect-error TS(2339): Property 'embeds' does not exist on type '{}'.
    if (embeds && embeds.length !== 0) body.embeds = embeds;
    // @ts-expect-error TS(2339): Property 'components' does not exist on type '{}'.
    if (components) body.components = components;
    // @ts-expect-error TS(2339): Property 'files' does not exist on type '{}'.
    if (files) body.files = files;
    if (suppressMentions === true) {
      // @ts-expect-error TS(2339): Property 'allowed_mentions' does not exist on type... Remove this comment to see the full error message
      body.allowed_mentions = {};
      // @ts-expect-error TS(2339): Property 'allowed_mentions' does not exist on type... Remove this comment to see the full error message
      body.allowed_mentions.parse = [];
    }
    // @ts-expect-error TS(2339): Property 'message_reference' does not exist on typ... Remove this comment to see the full error message
    if (reference) body.message_reference = reference;
    const data = await client.request.makeRequest(
      "postCreateMessage",
      [channelId],
      body,
    );
    return new Message(client, data, {
      channelId,
      guildId,
    });
  }
  /**
   * Edits a message.
   * @param {Client} client The client instance.
   * @param {String} channelId The id of the channel the message belongs to.
   * @param {String} messageId The id of the message.
   * @param {String} guildId The id of the guild the message belongs to.
   * @param {Object?} [options] The message options.
   * @param {String?} [options.content] The message content.
   * @param {Embed[]?} [options.embeds] Array of embeds to send with the message.
   * @param {MessageComponents?} [options.components] Message components to send with the message.
   * @param {Array<FileUpload>?} [options.files] Array of file objects for files to send with the message.
   * @param {Array<Attachment>?} [options.attachments] Array of attachment objects for existing attachments sent with the message.
   * @returns {Promise<Message>}
   */
  static async edit(
    client,
    channelId,
    messageId,
    guildId,
    { content, embeds, components, attachments, files },
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID is not a string.");
    Message.sendValidation({ content, embeds, components, attachments, files });
    if (
      !checkPermission(
        GuildChannelsManager.getChannel(
          client,
          guildId,
          channelId,
        ).checkPermission(await GuildManager.getGuild(client, guildId).me()),
        PERMISSIONS.SEND_MESSAGES,
      )
    )
      throw new Error("MISSING PERMISSIONS: SEND_MESSAGES");
    const body = {};
    // @ts-expect-error TS(2339): Property 'content' does not exist on type '{}'.
    body.content = content;
    // @ts-expect-error TS(2339): Property 'embeds' does not exist on type '{}'.
    body.embeds = embeds;
    // @ts-expect-error TS(2339): Property 'components' does not exist on type '{}'.
    body.components = components;
    // @ts-expect-error TS(2339): Property 'attachments' does not exist on type '{}'... Remove this comment to see the full error message
    body.attachments = attachments;
    // @ts-expect-error TS(2339): Property 'files' does not exist on type '{}'.
    body.files = files;
    const data = await client.request.makeRequest(
      "patchEditMessage",
      [channelId, messageId],
      body,
    );
    return new Message(client, data, {
      channelId,
      guildId,
    });
  }
  /**
   * Returns the hash name for the message.
   * @param {String} guildId The id of the guild that the message belongs to.
   * @param {String} channelId The id of the channel that the message belongs to.
   * @param {String} messageId The id of the message.
   * @returns {String}
   * @public
   * @static
   * @method
   * @throws {TypeError}
   */
  static getHashName(guildId, channelId, messageId) {
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID must be a string.");
    return structureHashName(guildId, channelId, messageId);
  }
  /**
   * Decrypts a message.
   * @param {Client} client The client instance.
   * @param {String} data The encrypted message data.
   * @param {String} guildId The id of the guild that the message belongs to.
   * @param {String} channelId The id of the channel that the message belongs to.
   * @param {String} messageId The id of the message.
   * @returns {Message}
   * @public
   * @static
   * @method
   * @throws {TypeError}
   */
  static decrypt(client, data, guildId, channelId, messageId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "string")
      throw new TypeError("GLUON: Data must be a string.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID must be a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID must be a string.");
    return new Message(
      client,
      decryptStructure(data, messageId, channelId, guildId),
      { channelId, guildId },
    );
  }
  /**
   * Validates the message content, embeds, components and files.
   * @param {Object} [options] The message options.
   * @param {String} [options.content] The message content.
   * @param {Embed[]} [options.embeds] Array of embeds to send with the message.
   * @param {MessageComponents} [options.components] Message components to send with the message.
   * @param {Array<FileUpload>} [options.files] Array of file objects for files to send with the message.
   * @param {Array<Attachment>} [options.attachments] Array of attachment objects for existing attachments sent with the message.
   * @param {Number} [options.flags] The message flags.
   * @param {Object} [options.reference] The message reference.
   * @param {String} [options.reference.message_id] The id of the message to reference.
   * @param {String} [options.reference.channel_id] The id of the channel to reference.
   * @param {String} [options.reference.guild_id] The id of the guild to reference.
   * @returns {void}
   * @throws {Error | TypeError | RangeError}
   * @public
   * @static
   * @method
   */
  static sendValidation({
    content,
    embeds,
    components,
    files,
    attachments,
    flags,
    reference,
  } = {}) {
    if (!content && !embeds && !components && !files)
      throw new Error(
        "GLUON: Must provide content, embeds, components or files",
      );
    if (content && typeof content !== "string")
      throw new TypeError("GLUON: Content must be a string.");
    if (content && content.length > LIMITS.MAX_MESSAGE_CONTENT)
      throw new RangeError(
        `GLUON: Content exceeds ${LIMITS.MAX_MESSAGE_CONTENT} characters.`,
      );
    if (
      embeds &&
      (!Array.isArray(embeds) || !embeds.every((e) => e instanceof Embed))
    )
      throw new TypeError("GLUON: Embeds must be an array of embeds.");
    if (embeds && embeds.length > LIMITS.MAX_MESSAGE_EMBEDS)
      throw new RangeError(
        `GLUON: Embeds exceeds ${LIMITS.MAX_MESSAGE_EMBEDS}.`,
      );
    if (components && !(components instanceof MessageComponents))
      throw new TypeError("GLUON: Components must be an array of components.");
    if (files && files.length > LIMITS.MAX_MESSAGE_FILES)
      throw new RangeError(`GLUON: Files exceeds ${LIMITS.MAX_MESSAGE_FILES}.`);
    if (
      attachments &&
      (!Array.isArray(attachments) ||
        !attachments.every((a) => a instanceof Attachment))
    )
      throw new TypeError(
        "GLUON: Attachments must be an array of attachments.",
      );
    if (attachments && attachments.length > LIMITS.MAX_MESSAGE_FILES)
      throw new RangeError(
        `GLUON: Attachments exceeds ${LIMITS.MAX_MESSAGE_FILES}.`,
      );
    if (typeof flags !== "undefined" && typeof flags !== "number")
      throw new TypeError("GLUON: Flags must be a number.");
    if (reference && typeof reference !== "object")
      throw new TypeError("GLUON: Reference must be an object.");
    if (reference && typeof reference.message_id !== "string")
      throw new TypeError("GLUON: Reference message id must be a string.");
    if (reference && typeof reference.channel_id !== "string")
      throw new TypeError("GLUON: Reference channel id must be a string.");
    if (reference && typeof reference.guild_id !== "string")
      throw new TypeError("GLUON: Reference guild id must be a string.");
  }
  /**
   * Deletes one message.
   * @param {Client} client The client instance.
   * @param {String} channelId The id of the channel that the message belongs to.
   * @param {String} messageId The id of the message to delete.
   * @param {Object?} [options]
   * @param {String?} [options.reason] The reason for deleting the message.
   * @returns {Promise<void>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   */
  static async delete(client, guildId, channelId, messageId, { reason } = {}) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID is not a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (typeof messageId !== "string")
      throw new TypeError("GLUON: Message ID is not a string.");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: Reason is not a string.");
    if (
      !checkPermission(
        GuildChannelsManager.getChannel(
          client,
          guildId,
          channelId,
        ).checkPermission(await GuildManager.getGuild(client, guildId).me()),
        PERMISSIONS.MANAGE_MESSAGES,
      )
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_MESSAGES");
    const body = {};
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    await client.request.makeRequest(
      "deleteChannelMessage",
      [channelId, messageId],
      body,
    );
  }
  /**
   * Encrypts the message.
   * @returns {String}
   * @public
   * @method
   */
  encrypt() {
    return encryptStructure(this, this.id, this.channelId, this.guildId);
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<Message: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_Message__client = new WeakMap()),
  (_Message__guild_id = new WeakMap()),
  (_Message__channel_id = new WeakMap()),
  (_Message__id = new WeakMap()),
  (_Message_author = new WeakMap()),
  (_Message_attachments = new WeakMap()),
  (_Message_content = new WeakMap()),
  (_Message_poll = new WeakMap()),
  (_Message_reactions = new WeakMap()),
  (_Message_embeds = new WeakMap()),
  (_Message__attributes = new WeakMap()),
  (_Message_reference = new WeakMap()),
  (_Message_type = new WeakMap()),
  (_Message_webhook_id = new WeakMap()),
  (_Message_sticker_items = new WeakMap()),
  (_Message_message_snapshots = new WeakMap()),
  (_Message_edited_timestamp = new WeakMap()),
  (_Message_flags = new WeakMap()),
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
          id: this.id,
          author: this.author?.toJSON(format),
          member: this.member?.toJSON(format),
          content: this.content,
          _attributes: __classPrivateFieldGet(this, _Message__attributes, "f"),
          attachments: this.attachments.map((a) => a.toJSON(format)),
          embeds: this.embeds.map((e) => e.toJSON(format)),
          edited_timestamp: this.editedTimestamp
            ? this.editedTimestamp * 1000
            : null,
          poll: this.poll?.toJSON(format),
          message_snapshots: this.messageSnapshots?.map((m) =>
            m.toJSON(format),
          ),
          type: this.type,
          referenced_message: this.reference?.messageId
            ? {
                id: this.reference.messageId ? this.reference.messageId : null,
              }
            : undefined,
          sticker_items: this.stickerItems.map((s) => s.toJSON(format)),
          messageReactions: this.reactions.toJSON(format),
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          channel_id: this.channelId,
          author: this.author?.toJSON(format),
          member: this.member?.toJSON(format),
          content: this.content,
          pinned: this.pinned,
          attachments: this.attachments.map((a) => a.toJSON(format)),
          embeds: this.embeds.map((e) => e.toJSON(format)),
          edited_timestamp: this.editedTimestamp
            ? this.editedTimestamp * 1000
            : null,
          poll: this.poll?.toJSON(format),
          message_snapshots: this.messageSnapshots?.map((m) =>
            m.toJSON(format),
          ),
          type: this.type,
          referenced_message: this.reference?.messageId
            ? {
                id: this.reference.messageId ? this.reference.messageId : null,
              }
            : undefined,
          sticker_items: this.stickerItems?.map((s) => s.toJSON(format)),
          reactions: this.reactions?.toJSON(format),
          mention_everyone: this.mentionEveryone,
          mention_roles: this.mentionRoles ? [""] : [],
          mentions: this.mentions ? [""] : [],
        };
      }
    }
  }
}
export default Message;
//# sourceMappingURL=Message.js.map
