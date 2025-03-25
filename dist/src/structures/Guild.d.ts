import AuditLog from "./AuditLog.js";
import util from "util";
import {
  APIGuild,
  APIWebhook,
  AuditLogEvent,
  GatewayGuildCreateDispatchData,
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildMFALevel,
  GuildNSFWLevel,
  GuildPremiumTier,
  GuildVerificationLevel,
  Locale,
  Snowflake,
} from "#typings/discord.js";
import type {
  Guild as GuildType,
  GuildCacheJSON,
  GuildDiscordJSON,
  GuildStorageJSON,
  TextChannel as TextChannelType,
  GluonCacheOptions as GluonCacheOptionsType,
  GuildCacheOptions as GuildCacheOptionsType,
  GuildMemberManager as GuildMemberManagerType,
  GuildChannelsManager as GuildChannelsManagerType,
  GuildVoiceStatesManager as GuildVoiceStatesManagerType,
  GuildRoleManager as GuildRoleManagerType,
  GuildEmojisManager as GuildEmojisManagerType,
  GuildInviteManager as GuildInviteManagerType,
  GuildScheduledEventManager as GuildScheduledEventManagerType,
  Embed,
  FileUpload,
  MessageComponents as MessageComponentsType,
  Client as ClientType,
  GuildAuditLogManager as GuildAuditLogManagerType,
} from "#typings/index.d.ts";
import { JsonTypes } from "#typings/enums.js";
/**
 * Represents a Discord guild.
 * @see {@link https://discord.com/developers/docs/resources/guild}
 */
declare class Guild implements GuildType {
  #private;
  /**
   * Creates the structure for a guild.
   * @param {Client} client The client instance.
   * @param {Object} data Raw guild data.
   * @param {Object?} options The additional options for this structure.
   * @param {Boolean?} [options.nocache] Whether this guild should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object}
   */
  constructor(
    client: ClientType,
    data:
      | GatewayGuildCreateDispatchData
      | GuildCacheJSON
      | GuildStorageJSON
      | GuildDiscordJSON
      | APIGuild,
    {
      nocache,
    }?: {
      nocache?: false;
    },
  );
  /**
   * The id of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The hash of the guild's icon, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalIconHash(): string | null;
  /**
   * The icon URL of the guild.
   * @readonly
   * @type {String?}
   * @public
   */
  get displayIconURL(): string | null;
  /**
   * The owner of the guild.
   * @type {Member}
   * @readonly
   * @public
   */
  get owner(): import("#typings/index.d.ts").Member | null;
  /**
   * System channel flags.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
   * @readonly
   * @type {String[]}
   * @public
   */
  get systemChannelFlags(): number;
  /**
   * Server MFA level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
   * @readonly
   * @type {String}
   * @public
   */
  get mfaLevel(): GuildMFALevel;
  /**
   * Server verification level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
   * @readonly
   * @type {String}
   * @public
   */
  get verificationLevel(): GuildVerificationLevel;
  /**
   * Default notification setting.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
   * @readonly
   * @type {String}
   * @public
   */
  get defaultMessageNotifications(): GuildDefaultMessageNotifications;
  /**
   * Explicit content filter level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
   * @readonly
   * @type {String}
   * @public
   */
  get explicitContentFilter(): GuildExplicitContentFilter;
  /**
   * Server NSFW level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
   * @readonly
   * @type {String}
   * @public
   */
  get nsfwLevel(): GuildNSFWLevel;
  /**
   * Server boost level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier}
   * @readonly
   * @public
   */
  get premiumTier(): GuildPremiumTier;
  /**
   * Whether the guild has the boost progress bar enabled.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get premiumProgressBarEnabled(): boolean;
  /**
   * Whether the guild is unavailable.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get unavailable(): boolean;
  /**
   * The name of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get name(): string;
  /**
   * The description of the guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get description(): string | null;
  /**
   * The icon hash of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get ownerId(): string;
  /**
   * The id of the guild owner.
   * @type {Number}
   * @readonly
   * @public
   */
  get joinedAt(): number | undefined;
  /**
   * The member count of the guild.
   * @type {Number}
   * @readonly
   * @public
   */
  get memberCount(): number;
  /**
   * The system channel id of the guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get systemChannelId(): string | null;
  /**
   * The system channel of the guild.
   * @type {TextChannel?}
   * @readonly
   * @public
   */
  get systemChannel(): TextChannelType | null;
  /**
   * The rules channel id of the guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get rulesChannelId(): string | null;
  /**
   * The rules channel of the guild.
   * @type {TextChannel?}
   * @readonly
   * @public
   */
  get rulesChannel(): TextChannelType | null;
  /**
   * The preferred locale of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get preferredLocale(): Locale;
  /**
   * The premium subscription count of the guild.
   * @type {Number}
   * @readonly
   * @public
   */
  get premiumSubscriptionCount(): number;
  /**
   * The cache options for this guild.
   * @readonly
   * @public
   */
  get _cacheOptions(): GuildCacheOptionsType;
  /**
   * The members in the guild.
   * @type {GuildMemberManager}
   * @readonly
   * @public
   */
  get members(): GuildMemberManagerType;
  /**
   * The channels in the guild.
   * @type {GuildChannelsManager}
   * @readonly
   * @public
   */
  get channels(): GuildChannelsManagerType;
  /**
   * The voice states in the guild.
   * @type {GuildVoiceStatesManager}
   * @readonly
   * @public
   */
  get voiceStates(): GuildVoiceStatesManagerType;
  /**
   * The roles in the guild.
   * @type {GuildRoleManager}
   * @readonly
   * @public
   */
  get roles(): GuildRoleManagerType;
  /**
   * The scheduled events in the guild.
   * @type {GuildScheduledEventManager}
   * @readonly
   * @public
   */
  get scheduledEvents(): GuildScheduledEventManagerType;
  get auditLogs(): GuildAuditLogManagerType;
  /**
   * The emojis in the guild.
   * @type {GuildEmojisManager}
   * @readonly
   * @public
   */
  get emojis(): GuildEmojisManagerType;
  /**
   * The invites in the guild.
   * @type {GuildInviteManager}
   * @readonly
   * @public
   */
  get invites(): GuildInviteManagerType;
  /**
   * Increases the member count of the guild.
   * @method
   * @public
   */
  _incrementMemberCount(): void;
  /**
   * Decreases the member count of the guild.
   * @method
   * @public
   */
  _decrementMemberCount(): void;
  /**
   * Returns the client member for this guild.
   * @returns {Promise<Member>}
   * @public
   * @async
   * @method
   * @throws {Error}
   */
  me(): Promise<import("#typings/index.d.ts").Member>;
  /**
   * Bans a user with the given id from the guild.
   * @param {String} user_id The id of the user to ban.
   * @param {Object?} [options] Ban options.
   * @param {String?} [options.reason] The reason for banning the user.
   * @param {Number?} [options.seconds] The number of seconds to delete messages for.
   * @returns {Promise<void?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  ban(
    user_id: Snowflake,
    {
      reason,
      seconds,
    }?: {
      reason?: string;
      seconds?: number;
    },
  ): Promise<void>;
  /**
   * Unbans a user with the given id from the guild.
   * @param {String} user_id The id of the user to unban.
   * @param {Object?} [options] Unban options.
   * @param {String?} [options.reason] The reason for unbanning the user.
   * @returns {Promise<void?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  unban(
    user_id: Snowflake,
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
  /**
   * Kicks a user with the given id from the guild.
   * @param {String} user_id The id of the user to kick.
   * @param {Object?} [options] Kick options.
   * @param {String?} [options.reason] The reason for kicking the user.
   * @returns {Promise<void?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  kick(
    user_id: Snowflake,
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
  /**
   * Removes the given role from the given member.
   * @param {String} user_id The id of the user.
   * @param {String} role_id The id of the role.
   * @param {Object?} [options] Remove role options.
   * @param {String?} [options.reason] The reason for removing the role.
   * @returns {Promise<void?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  removeMemberRole(
    user_id: Snowflake,
    role_id: Snowflake,
    {
      reason,
    }?: {
      reason?: string;
    },
  ): Promise<void>;
  /**
   * Fetches audit logs.
   * @param {Object?} [options] Audit log fetch options.
   * @param {Number?} [options.limit] The number of entries to fetch.
   * @param {String?} [options.type] The type of audit log to fetch.
   * @param {String?} [options.user_id] The id of the user to fetch the audit log for.
   * @param {String?} [options.before] The id of the audit log entry to fetch before.
   * @param {String?} [options.after] The id of the audit log entry to fetch after
   * @returns {Promise<AuditLog[]?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  fetchAuditLogs({
    limit,
    type,
    user_id,
    before,
    after,
  }?: {
    limit?: number;
    type?: AuditLogEvent;
    user_id?: Snowflake;
    before?: Snowflake;
    after?: Snowflake;
  }): Promise<AuditLog[]>;
  /**
   * Fetches the guild invites.
   * @returns {Promise<Object[]?>}
   * @async
   * @public
   * @method
   * @throws {Error}
   */
  fetchInvites(): Promise<any>;
  /**
   * Fetches all the guild channels.
   * @returns {Promise<Array<TextChannel | VoiceState>>}
   * @async
   * @public
   * @method
   * @throws {Error}
   */
  fetchChannels(): Promise<
    (
      | TextChannelType
      | import("#typings/index.d.ts").VoiceChannel
      | import("#typings/index.d.ts").Thread
      | import("#typings/index.d.ts").CategoryChannel
    )[]
  >;
  /**
   * Fetches the ban for the provided user id.
   * @param {String} user_id The id of the user to fetch the ban of.
   * @returns {Promise<Object?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  fetchBan(user_id: Snowflake): Promise<any>;
  /**
   * Leaves the guild.
   * @returns {Promise<void?>}
   * @async
   * @public
   * @method
   * @throws {Error}
   */
  leave(): Promise<void>;
  /**
   * Calculates the number of messages that should be cached per channel for this guild.
   * @returns {Number}
   * @public
   * @method
   */
  calculateMessageCacheCount(): number;
  /**
   * Calculates the number of members that should be cached for this guild.
   * @returns {Number}
   * @public
   * @method
   */
  calculateMemberCacheCount(): number;
  /**
   * Deletes a webhook.
   * @param {Client} client The client instance.
   * @param {String} webhookId The id of the webhook to delete.
   * @returns {Promise<void>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   * @static
   */
  static deleteWebhook(client: ClientType, webhookId: Snowflake): Promise<void>;
  /**
   * Creates a webhook in the given channel with the name "Gluon".
   * @param {Client} client The client instance.
   * @param {String} channelId The id of the channel to create the webhook in.
   * @param {Object} [options] The options for creating the webhook.
   * @param {String} [options.name] The name of the webhook.
   * @returns {Promise<Object>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   * @static
   */
  static createWebhook(
    client: ClientType,
    channelId: Snowflake,
    {
      name,
    }?: {
      name?: string;
    },
  ): any;
  /**
   * Modified a webhook with the given webhook id.
   * @param {Client} client The client instance.
   * @param {String} webhookId The id of the webhook to modify.
   * @param {Object} options The options to modify the webhook with.
   * @param {String} options.channelId The id of the channel the webhook belongs to.
   * @returns {Promise<Object>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   * @static
   */
  static modifyWebhook(
    client: ClientType,
    webhookId: Snowflake,
    {
      channelId,
    }: {
      channelId: Snowflake;
    },
  ): any;
  /**
   * Fetches a webhook by the webhook's id.
   * @param {Client} client The client instance.
   * @param {String} webhookId The id of the webhook to fetch.
   * @returns {Promise<Object>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   * @static
   */
  static fetchWebhook(
    client: ClientType,
    webhookId: Snowflake,
  ): Promise<APIWebhook>;
  /**
   * Posts a webhook with the provided webhook id and token.
   * @param {Client} client The client instance.
   * @param {Object} referenceData An object with the webhook id and token.
   * @param {String} referenceData.id The id of the webhook.
   * @param {String} referenceData.token The token of the webhook.
   * @param {Object?} [options] Embeds, components and files to attach to the webhook.
   * @param {String} [options.content] The content to attach to the webhook.
   * @param {Embed[]} [options.embeds] The embeds to attach to the webhook.
   * @param {MessageComponent[]} [options.components] The components to attach to the webhook.
   * @param {File[]} [options.files] The files to attach to the webhook.
   * @returns {Promise<void>}
   * @public
   * @method
   * @async
   * @throws {TypeError}
   * @static
   */
  static postWebhook(
    client: ClientType,
    {
      id,
      token,
    }: {
      id: Snowflake;
      token: string;
    },
    {
      content,
      embeds,
      components,
      files,
    }?: {
      content?: string;
      embeds?: Embed[];
      components?: MessageComponentsType;
      files?: FileUpload[];
    },
  ): Promise<void>;
  /**
   * Returns the icon URL of the guild.
   * @param {String} id The id of the guild.
   * @param {String?} hash The hash of the guild icon.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getIcon(id: Snowflake, hash?: string | null): string | null;
  /**
   * @method
   * @public
   */
  _intervalCallback(): void;
  /**
   * Determines whether the emoji should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions: GluonCacheOptionsType): boolean;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @public
   * @method
   */
  toJSON(
    format?: JsonTypes,
  ): GuildStorageJSON | GuildCacheJSON | GuildDiscordJSON;
}
export default Guild;
