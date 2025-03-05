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
var _GuildChannel__client,
  _GuildChannel__id,
  _GuildChannel__guild_id,
  _GuildChannel_type,
  _GuildChannel_name,
  _GuildChannel_topic,
  _GuildChannel_permission_overwrites,
  _GuildChannel_rate_limit_per_user,
  _GuildChannel__parent_id,
  _GuildChannel__attributes,
  _GuildChannel__cacheOptions,
  _GuildChannel_messages,
  _GuildChannel_position;
import ChannelCacheOptions from "../managers/ChannelCacheOptions.js";
import ChannelMessageManager from "../managers/ChannelMessageManager.js";
import Message from "./Message.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import util from "util";
import Member from "./Member.js";
import { OverwriteType } from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";
/**
 * Represents a channel within Discord.
 * @see {@link https://discord.com/developers/docs/resources/channel}
 */
class GuildChannel {
  /**
   * Creates the base structure for a channel.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure}
   */
  constructor(client, data, { guildId }) {
    _GuildChannel__client.set(this, void 0);
    _GuildChannel__id.set(this, void 0);
    _GuildChannel__guild_id.set(this, void 0);
    _GuildChannel_type.set(this, void 0);
    _GuildChannel_name.set(this, void 0);
    _GuildChannel_topic.set(this, void 0);
    _GuildChannel_permission_overwrites.set(this, []);
    _GuildChannel_rate_limit_per_user.set(this, void 0);
    _GuildChannel__parent_id.set(this, void 0);
    _GuildChannel__attributes.set(this, void 0);
    _GuildChannel__cacheOptions.set(this, void 0);
    _GuildChannel_messages.set(this, void 0);
    _GuildChannel_position.set(this, void 0);
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    __classPrivateFieldSet(this, _GuildChannel__client, client, "f");
    /**
     * The id of the channel.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _GuildChannel__id, BigInt(data.id), "f");
    /**
     * The ID of the guild that this channel belongs to.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _GuildChannel__guild_id, BigInt(guildId), "f");
    if (!this.guild) {
      throw new Error(`Guild not found in cache: ${guildId}`);
    }
    /**
     * The type of channel.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(this, _GuildChannel_type, data.type, "f");
    const existing = this.guild?.channels.get(data.id);
    /**
     * The name of the channel.
     * @type {String}
     * @private
     */
    data.name = data.name ?? existing?.name;
    /**
     * The topic of the channel.
     * @type {String?}
     * @private
     */
    if ("topic" in data && typeof data.topic == "string")
      __classPrivateFieldSet(this, _GuildChannel_topic, data.topic, "f");
    else if (
      "topic" in data &&
      typeof data.topic != "string" &&
      existing &&
      "topic" in existing &&
      typeof existing.topic == "string"
    )
      __classPrivateFieldSet(this, _GuildChannel_topic, existing.topic, "f");
    /**
     * The permission overwrites for this channel.
     * @type {Array<Object>}
     * @private
     * @see {@link https://discord.com/developers/docs/resources/channel#overwrite-object}
     */
    if (data.permission_overwrites && Array.isArray(data.permission_overwrites))
      __classPrivateFieldSet(
        this,
        _GuildChannel_permission_overwrites,
        data.permission_overwrites.map(
          (p) =>
            new PermissionOverwrite(
              __classPrivateFieldGet(this, _GuildChannel__client, "f"),
              p,
            ),
        ),
        "f",
      );
    else if (
      !data.permission_overwrites &&
      existing &&
      Array.isArray(existing.permissionOverwrites)
    )
      __classPrivateFieldSet(
        this,
        _GuildChannel_permission_overwrites,
        existing.permissionOverwrites,
        "f",
      );
    /**
     * The message send cooldown for the channel.
     * @type {Number?}
     * @private
     */
    if (typeof data.rate_limit_per_user == "number")
      __classPrivateFieldSet(
        this,
        _GuildChannel_rate_limit_per_user,
        data.rate_limit_per_user,
        "f",
      );
    else if (
      typeof data.rate_limit_per_user != "number" &&
      existing &&
      "rateLimitPerUser" in existing &&
      typeof existing.rateLimitPerUser == "number"
    )
      __classPrivateFieldSet(
        this,
        _GuildChannel_rate_limit_per_user,
        existing.rateLimitPerUser,
        "f",
      );
    /**
     * The position of the channel.
     * @type {Number?}
     * @private
     */
    if (typeof data.position == "number") {
      __classPrivateFieldSet(this, _GuildChannel_position, data.position, "f");
    } else if (
      typeof data.position != "number" &&
      existing &&
      typeof existing.position == "number"
    ) {
      __classPrivateFieldSet(
        this,
        _GuildChannel_position,
        existing.position,
        "f",
      );
    }
    if (typeof data.parent_id == "string") {
      /**
       * The id of the parent channel.
       * @type {BigInt?}
       * @private
       */
      __classPrivateFieldSet(
        this,
        _GuildChannel__parent_id,
        BigInt(data.parent_id),
        "f",
      );
    } else if (
      typeof data.parent_id != "string" &&
      data.parent_id === undefined &&
      existing &&
      "parentId" in existing &&
      typeof existing.parentId == "string"
    )
      __classPrivateFieldSet(
        this,
        _GuildChannel__parent_id,
        BigInt(existing.parentId),
        "f",
      );
    /**
     * The attributes of the channel.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _GuildChannel__attributes,
      "_attributes" in data ? data._attributes : 0,
      "f",
    );
    if ("nsfw" in data && data.nsfw !== undefined && data.nsfw == true)
      __classPrivateFieldSet(
        this,
        _GuildChannel__attributes,
        __classPrivateFieldGet(this, _GuildChannel__attributes, "f") |
          (0b1 << 0),
        "f",
      );
    else if (
      "nsfw" in data &&
      data.nsfw === undefined &&
      existing &&
      existing.nsfw == true
    )
      __classPrivateFieldSet(
        this,
        _GuildChannel__attributes,
        __classPrivateFieldGet(this, _GuildChannel__attributes, "f") |
          (0b1 << 0),
        "f",
      );
    /**
     * The cache options for this channel.
     * @type {ChannelCacheOptions}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _GuildChannel__cacheOptions,
      existing?._cacheOptions
        ? existing._cacheOptions
        : new ChannelCacheOptions(
            "_cacheOptions" in data ? data._cacheOptions : undefined,
          ),
      "f",
    );
    /**
     * The message manager for this channel.
     * @type {ChannelMessageManager}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _GuildChannel_messages,
      existing?.messages
        ? existing.messages
        : new ChannelMessageManager(client, this.guild, this),
      "f",
    );
  }
  /**
   * Sends a message to this channel.
   * @param {Object} [data] Embeds, components and files to include with the message.
   * @param {String?} [data.content] The content of the message.
   * @param {Array<Embed>?} [data.embeds] The embeds to include with the message.
   * @param {MessageComponents?} [data.components] The components to include with the message.
   * @param {Array<FileUpload>?} [data.files] The files to include with the message.
   * @param {Boolean} [data.suppressMentions] Whether to suppress mentions in the message.
   * @returns {Promise<Message>}
   * @see {@link https://discord.com/developers/docs/resources/channel#create-message}
   * @method
   * @public
   * @async
   * @throws {Error | TypeError}
   */
  send({ content, components, files, embeds, suppressMentions = false }) {
    return Message.send(
      __classPrivateFieldGet(this, _GuildChannel__client, "f"),
      this.id,
      this.guildId,
      {
        content,
        components,
        files,
        embeds,
        suppressMentions,
      },
    );
  }
  /**
   * Returns the mention for this channel.
   * @type {String}
   * @readonly
   * @public
   */
  get mention() {
    return GuildChannel.getMention(this.id);
  }
  /**
   * Whether this channel is marked as NSFW or not.
   * @readonly
   * @returns {Boolean}
   * @public
   */
  get nsfw() {
    return (
      (__classPrivateFieldGet(this, _GuildChannel__attributes, "f") &
        (0b1 << 0)) ==
      0b1 << 0
    );
  }
  /**
   * The guild that this channel belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return (
      __classPrivateFieldGet(this, _GuildChannel__client, "f").guilds.get(
        this.guildId,
      ) || null
    );
  }
  /**
   * The parent channel.
   * @type {Channel?}
   * @readonly
   * @public
   */
  get parent() {
    return this.parentId
      ? this.guild?.channels.get(this.parentId) || null
      : null;
  }
  /**
   * The ID of the channel.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _GuildChannel__id, "f"));
  }
  /**
   * The ID of the guild that this channel belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(__classPrivateFieldGet(this, _GuildChannel__guild_id, "f"));
  }
  /**
   * The ID of the parent channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get parentId() {
    return __classPrivateFieldGet(this, _GuildChannel__parent_id, "f")
      ? String(__classPrivateFieldGet(this, _GuildChannel__parent_id, "f"))
      : null;
  }
  /**
   * The type of channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get type() {
    return __classPrivateFieldGet(this, _GuildChannel_type, "f");
  }
  /**
   * The name of the channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get name() {
    return __classPrivateFieldGet(this, _GuildChannel_name, "f");
  }
  /**
   * The topic of the channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get topic() {
    return __classPrivateFieldGet(this, _GuildChannel_topic, "f") ?? null;
  }
  /**
   * The permission overwrites for this channel.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get permissionOverwrites() {
    return __classPrivateFieldGet(
      this,
      _GuildChannel_permission_overwrites,
      "f",
    );
  }
  /**
   * The message send cooldown for the channel.
   * @type {Number?}
   * @readonly
   * @public
   */
  get rateLimitPerUser() {
    return __classPrivateFieldGet(this, _GuildChannel_rate_limit_per_user, "f");
  }
  /**
   * The position of the channel.
   * @type {Number?}
   * @readonly
   * @public
   */
  get position() {
    return __classPrivateFieldGet(this, _GuildChannel_position, "f");
  }
  /**
   * The cache options for this channel.
   * @type {ChannelCacheOptions}
   * @readonly
   * @public
   */
  get _cacheOptions() {
    return __classPrivateFieldGet(this, _GuildChannel__cacheOptions, "f");
  }
  /**
   * The messages in this channel.
   * @type {ChannelMessageManager}
   * @readonly
   * @public
   */
  get messages() {
    return __classPrivateFieldGet(this, _GuildChannel_messages, "f");
  }
  /**
   * Returns the mention string for a channel.
   * @param {String} channelId The ID of the channel to mention.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(channelId) {
    if (!channelId) throw new TypeError("GLUON: No channel ID provided.");
    return `<#${channelId}>`;
  }
  /**
   * Determines whether the channel should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions, guildCacheOptions) {
    if (!(gluonCacheOptions instanceof GluonCacheOptions))
      throw new TypeError(
        "GLUON: Gluon cache options must be a GluonCacheOptions.",
      );
    if (!(guildCacheOptions instanceof GuildCacheOptions))
      throw new TypeError(
        "GLUON: Guild cache options must be a GuildCacheOptions.",
      );
    if (gluonCacheOptions.cacheChannels === false) return false;
    if (guildCacheOptions.channelCaching === false) return false;
    return true;
  }
  /**
   * Follows a news channel.
   * @param {Client} client The client instance.
   * @param {String} channelId The ID of the channel.
   * @param {String} followChannelId THe ID of the channel to follow.
   * @returns {Promise<void>}
   * @public
   * @static
   * @async
   * @method
   * @throws {TypeError}
   */
  static async follow(client, channelId, followChannelId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (typeof followChannelId !== "string")
      throw new TypeError("GLUON: Follow channel ID is not a string.");
    const body = {};
    // @ts-expect-error TS(2339): Property 'webhook_channel_id' does not exist on ty... Remove this comment to see the full error message
    body.webhook_channel_id = channelId;
    await client.request.makeRequest(
      "postFollowNewsChannel",
      [followChannelId],
      body,
    );
  }
  /**
   * Returns an array of webhooks for the specified channel.
   * @param {Client} client The client instance.
   * @param {String} channelId The ID of the channel.
   * @returns {Promise<Array<Object>>}
   * @public
   * @static
   * @async
   * @method
   */
  static fetchWebhooks(client, channelId) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    return client.request.makeRequest("getChannelWebhooks", [channelId]);
  }
  /**
   * Returns the permissions for a member in this channel.
   * @param {Member} member The member to check the permissions for.
   * @returns {String}
   */
  checkPermission(member) {
    if (!member) throw new TypeError("GLUON: No member provided.");
    if (!(member instanceof Member))
      throw new TypeError("GLUON: Member must be a Member.");
    // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
    let overallPermissions = BigInt(member.permissions);
    const everyoneRole = this.permissionOverwrites.find(
      (p) => p.id === this.guildId && p.type === OverwriteType.Role,
    );
    if (everyoneRole) {
      overallPermissions &= ~BigInt(everyoneRole.deny);
      overallPermissions |= BigInt(everyoneRole.allow);
    }
    let overallRoleDenyPermissions = BigInt(0);
    let overallRoleAllowPermissions = BigInt(0);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    for (let i = 0; i < member.roles.length; i++) {
      const role = this.permissionOverwrites.find(
        (p) =>
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          p.id === member.roles[i].id && p.type === OverwriteType.Role,
      );
      if (role) {
        overallRoleDenyPermissions |= BigInt(role.deny);
        overallRoleAllowPermissions |= BigInt(role.allow);
      }
    }
    overallPermissions &= ~overallRoleDenyPermissions;
    overallPermissions |= overallRoleAllowPermissions;
    const memberOverwritePermissions = this.permissionOverwrites.find(
      (p) => p.id === member.id && p.type === OverwriteType.Member,
    );
    if (memberOverwritePermissions) {
      overallPermissions &= ~BigInt(memberOverwritePermissions.deny);
      overallPermissions |= BigInt(memberOverwritePermissions.allow);
    }
    return String(overallPermissions);
  }
  /**
   * @method
   * @public
   */
  toString() {
    return `<Channel: ${this.id}>`;
  }
  /**
   * @method
   * @public
   */
  [((_GuildChannel__client = new WeakMap()),
  (_GuildChannel__id = new WeakMap()),
  (_GuildChannel__guild_id = new WeakMap()),
  (_GuildChannel_type = new WeakMap()),
  (_GuildChannel_name = new WeakMap()),
  (_GuildChannel_topic = new WeakMap()),
  (_GuildChannel_permission_overwrites = new WeakMap()),
  (_GuildChannel_rate_limit_per_user = new WeakMap()),
  (_GuildChannel__parent_id = new WeakMap()),
  (_GuildChannel__attributes = new WeakMap()),
  (_GuildChannel__cacheOptions = new WeakMap()),
  (_GuildChannel_messages = new WeakMap()),
  (_GuildChannel_position = new WeakMap()),
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
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.CACHE_FORMAT: {
        return {
          id: this.id,
          type: this.type,
          name: this.name,
          topic: this.topic ?? undefined,
          rate_limit_per_user: this.rateLimitPerUser,
          position: this.position,
          parent_id: this.parentId ?? undefined,
          _attributes: __classPrivateFieldGet(
            this,
            _GuildChannel__attributes,
            "f",
          ),
          _cacheOptions: this._cacheOptions.toJSON(format),
          messages: this.messages.toJSON(format),
          permission_overwrites: this.permissionOverwrites.map((p) =>
            p.toJSON(format),
          ),
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          type: this.type,
          name: this.name,
          topic: this.topic ?? undefined,
          rate_limit_per_user: this.rateLimitPerUser,
          position: this.position,
          parent_id: this.parentId ?? undefined,
          nsfw: this.nsfw,
          messages: this.messages.toJSON(format),
          permission_overwrites: this.permissionOverwrites.map((p) =>
            p.toJSON(format),
          ),
        };
      }
    }
  }
}
export default GuildChannel;
//# sourceMappingURL=GuildChannel.js.map
