import ChannelCacheOptions from "../managers/ChannelCacheOptions.js";
import ChannelMessageManager from "../managers/ChannelMessageManager.js";
import Message from "./Message.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import util from "util";
import Member from "./Member.js";
import { FileUpload } from "src/util.js";
import {
  APIGuildTextChannel,
  APIGuildVoiceChannel,
  APIWebhook,
  ChannelType,
  GuildTextChannelType,
  OverwriteType,
  Snowflake,
} from "#typings/discord.js";
import type {
  GuildChannel as GuildChannelType,
  GuildChannelCacheJSON,
  GuildChannelDiscordJSON,
  GuildChannelStorageJSON,
  PermissionOverwrite as PermissionOverwriteType,
  MessageCacheJSON,
  MessageDiscordJSON,
  MessageStorageJSON,
  Member as MemberType,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
  ChannelMessageManager as ChannelMessageManagerType,
  Embed,
  MessageComponents as MessageComponentsType,
  Client as ClientType,
  TextChannel as TextChannelType,
  VoiceChannel as VoiceChannelType,
  Thread as ThreadType,
  ChannelCacheOptions as ChannelCacheOptionsType,
} from "#typings/index.d.ts";
import { JsonTypes } from "#typings/enums.js";

/**
 * Represents a channel within Discord.
 * @see {@link https://discord.com/developers/docs/resources/channel}
 */
class GuildChannel implements GuildChannelType {
  #_client: ClientType;
  #_id: bigint;
  #_guild_id: bigint;
  #type: ChannelType;
  #name: string;
  #topic: string | undefined;
  #permission_overwrites: PermissionOverwriteType[] = [];
  #rate_limit_per_user: number | undefined;
  #_parent_id: bigint | undefined;
  #_attributes: number;
  #_cacheOptions: ChannelCacheOptionsType;
  #messages: ChannelMessageManagerType;
  #position: number | undefined;
  /**
   * Creates the base structure for a channel.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this channel belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure}
   */
  constructor(
    client: ClientType,
    data:
      | APIGuildTextChannel<GuildTextChannelType>
      | APIGuildTextChannel<ChannelType.GuildForum>
      | APIGuildTextChannel<ChannelType.GuildMedia>
      | APIGuildVoiceChannel
      | GuildChannelStorageJSON
      | GuildChannelCacheJSON
      | GuildChannelDiscordJSON,
    { guildId }: { guildId: Snowflake },
  ) {
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
    this.#_client = client;

    /**
     * The id of the channel.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    /**
     * The ID of the guild that this channel belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guildId);

    /**
     * The type of channel.
     * @type {Number}
     * @private
     */
    this.#type = data.type;

    const existing = this.guild?.channels.get(data.id) as
      | TextChannelType
      | VoiceChannelType
      | ThreadType
      | null;

    /**
     * The name of the channel.
     * @type {String}
     * @private
     */
    this.#name = data.name ?? existing?.name;

    /**
     * The topic of the channel.
     * @type {String?}
     * @private
     */
    if ("topic" in data && typeof data.topic == "string")
      this.#topic = data.topic;
    else if (
      "topic" in data &&
      typeof data.topic != "string" &&
      existing &&
      "topic" in existing &&
      typeof existing.topic == "string"
    )
      this.#topic = existing.topic;

    /**
     * The permission overwrites for this channel.
     * @type {Array<Object>}
     * @private
     * @see {@link https://discord.com/developers/docs/resources/channel#overwrite-object}
     */
    if (data.permission_overwrites && Array.isArray(data.permission_overwrites))
      this.#permission_overwrites = data.permission_overwrites.map(
        (p) => new PermissionOverwrite(this.#_client, p),
      );
    else if (
      !data.permission_overwrites &&
      existing &&
      Array.isArray(existing.permissionOverwrites)
    )
      this.#permission_overwrites = existing.permissionOverwrites;

    /**
     * The message send cooldown for the channel.
     * @type {Number?}
     * @private
     */
    if (typeof data.rate_limit_per_user == "number")
      this.#rate_limit_per_user = data.rate_limit_per_user;
    else if (
      typeof data.rate_limit_per_user != "number" &&
      existing &&
      "rateLimitPerUser" in existing &&
      typeof existing.rateLimitPerUser == "number"
    )
      this.#rate_limit_per_user = existing.rateLimitPerUser;

    /**
     * The position of the channel.
     * @type {Number?}
     * @private
     */
    if (typeof data.position == "number") {
      this.#position = data.position;
    } else if (
      typeof data.position != "number" &&
      existing &&
      typeof existing.position == "number"
    ) {
      this.#position = existing.position;
    }

    if (typeof data.parent_id == "string") {
      /**
       * The id of the parent channel.
       * @type {BigInt?}
       * @private
       */
      this.#_parent_id = BigInt(data.parent_id);
    } else if (
      typeof data.parent_id != "string" &&
      data.parent_id === undefined &&
      existing &&
      "parentId" in existing &&
      typeof existing.parentId == "string"
    )
      this.#_parent_id = BigInt(existing.parentId);

    /**
     * The attributes of the channel.
     * @type {Number}
     * @private
     */
    this.#_attributes = "_attributes" in data ? data._attributes : 0;

    if ("nsfw" in data && data.nsfw !== undefined && data.nsfw == true)
      this.#_attributes |= 0b1 << 0;
    else if (
      "nsfw" in data &&
      data.nsfw === undefined &&
      existing &&
      existing.nsfw == true
    )
      this.#_attributes |= 0b1 << 0;

    /**
     * The cache options for this channel.
     * @type {ChannelCacheOptions}
     * @private
     */
    this.#_cacheOptions = existing?._cacheOptions
      ? existing._cacheOptions
      : new ChannelCacheOptions(
          "_cache_options" in data ? data._cache_options : undefined,
        );

    if (guildId !== "0" && !this.guild) {
      throw new Error(`Guild not found in cache: ${guildId}`);
    } else if (guildId !== "0" && this.guild) {
      /**
       * The message manager for this channel.
       * @type {ChannelMessageManager}
       * @private
       */
      this.#messages = existing?.messages
        ? existing.messages
        : new ChannelMessageManager(client, this.guild, this);
    } else {
      this.#messages = {} as unknown as ChannelMessageManagerType;
    }
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
  send({
    content,
    components,
    files,
    embeds,
    suppressMentions = false,
  }: {
    content?: string;
    components?: MessageComponentsType;
    files?: FileUpload[];
    embeds?: Embed[];
    suppressMentions?: boolean;
  }) {
    return Message.send(this.#_client, this.id, this.guildId, {
      content,
      components,
      files,
      embeds,
      suppressMentions,
    });
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
    return (this.#_attributes & (0b1 << 0)) == 0b1 << 0;
  }

  /**
   * The guild that this channel belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId) || null;
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
    return String(this.#_id);
  }

  /**
   * The ID of the guild that this channel belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The ID of the parent channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get parentId() {
    return this.#_parent_id ? String(this.#_parent_id) : null;
  }

  /**
   * The type of channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get type() {
    return this.#type;
  }

  /**
   * The name of the channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get name() {
    return this.#name;
  }

  /**
   * The topic of the channel.
   * @type {String?}
   * @readonly
   * @public
   */
  get topic() {
    return this.#topic ?? null;
  }

  /**
   * The permission overwrites for this channel.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get permissionOverwrites() {
    return this.#permission_overwrites;
  }

  /**
   * The message send cooldown for the channel.
   * @type {Number?}
   * @readonly
   * @public
   */
  get rateLimitPerUser() {
    return this.#rate_limit_per_user;
  }

  /**
   * The position of the channel.
   * @type {Number?}
   * @readonly
   * @public
   */
  get position() {
    return this.#position;
  }

  /**
   * The cache options for this channel.
   * @type {ChannelCacheOptions}
   * @readonly
   * @public
   */
  get _cacheOptions() {
    return this.#_cacheOptions;
  }

  get messages() {
    return this.#messages;
  }

  /**
   * Returns the mention string for a channel.
   * @param {String} channelId The ID of the channel to mention.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getMention(channelId: Snowflake) {
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
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ) {
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
  static async follow(
    client: ClientType,
    channelId: Snowflake,
    followChannelId: Snowflake,
  ) {
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
  static fetchWebhooks(
    client: ClientType,
    channelId: Snowflake,
  ): Promise<APIWebhook[]> {
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
  checkPermission(member: MemberType) {
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
  [util.inspect.custom]() {
    return this.toString();
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
  ): GuildChannelStorageJSON | GuildChannelCacheJSON | GuildChannelDiscordJSON {
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
          _attributes: this.#_attributes,
          _cache_options: this._cacheOptions.toJSON(format),
          messages: this.messages.toJSON(format) as
            | MessageStorageJSON[]
            | MessageCacheJSON[],
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
          messages: this.messages.toJSON(format) as MessageDiscordJSON[],
          permission_overwrites: this.permissionOverwrites.map((p) =>
            p.toJSON(format),
          ),
        };
      }
    }
  }
}

export default GuildChannel;
