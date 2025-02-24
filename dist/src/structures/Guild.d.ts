import { TO_JSON_TYPES_ENUM } from "../constants.js";
import Thread from "./Thread.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import util from "util";
import {
  GuildCacheJSON,
  GuildDiscordJSON,
  GuildRaw,
  GuildRawGateway,
  GuildStorageJSON,
  GuildType,
} from "./interfaces/Guild.js";
import ClientType from "src/interfaces/Client.js";
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
      | GuildRaw
      | GuildRawGateway
      | GuildCacheJSON
      | GuildStorageJSON
      | GuildDiscordJSON,
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
  get owner(): any;
  /**
   * System channel flags.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
   * @readonly
   * @type {String[]}
   * @public
   */
  get systemChannelFlags(): string[];
  /**
   * Raw system channel flags.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawSystemChannelFlags(): number;
  /**
   * Server MFA level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
   * @readonly
   * @type {String}
   * @public
   */
  get mfaLevel(): "NONE" | "ELEVATED" | null;
  /**
   * Server MFA level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawMfaLevel(): 1 | 0 | null;
  /**
   * Server verification level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
   * @readonly
   * @type {String}
   * @public
   */
  get verificationLevel():
    | "NONE"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "VERY_HIGH"
    | null;
  /**
   * Server verification level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawVerificationLevel(): 4 | 1 | 0 | 2 | 3 | null;
  /**
   * Default notification setting.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
   * @readonly
   * @type {String}
   * @public
   */
  get defaultMessageNotifications(): "ALL_MESSAGES" | "ONLY_MENTIONS" | null;
  /**
   * Default notification setting.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawDefaultMessageNotifications(): 1 | 0 | null;
  /**
   * Explicit content filter level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
   * @readonly
   * @type {String}
   * @public
   */
  get explicitContentFilter():
    | "DISABLED"
    | "MEMBERS_WITHOUT_ROLES"
    | "ALL_MEMBERS"
    | null;
  /**
   * Explicit content filter level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawExplicitContentFilter(): 1 | 0 | 2 | null;
  /**
   * Server NSFW level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
   * @readonly
   * @type {String}
   * @public
   */
  get nsfwLevel(): "DEFAULT" | "EXPLICIT" | "SAFE" | "AGE_RESTRICTED" | null;
  /**
   * Server NSFW level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawNsfwLevel(): 1 | 0 | 2 | 3 | null;
  /**
   * Server boost level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier}
   * @readonly
   * @public
   */
  get premiumTier(): 1 | 0 | 2 | 3 | null;
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
  get name(): any;
  /**
   * The description of the guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get description(): any;
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
  get joinedAt(): any;
  /**
   * The member count of the guild.
   * @type {Number}
   * @readonly
   * @public
   */
  get memberCount(): any;
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
  get systemChannel(): any;
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
  get rulesChannel(): any;
  /**
   * The preferred locale of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get preferredLocale(): any;
  /**
   * The premium subscription count of the guild.
   * @type {Number}
   * @readonly
   * @public
   */
  get premiumSubscriptionCount(): any;
  /**
   * The cache options for this guild.
   * @type {GuildCacheOptions}
   * @readonly
   * @public
   */
  get _cacheOptions(): GuildCacheOptions | undefined;
  /**
   * The members in the guild.
   * @type {GuildMemberManager}
   * @readonly
   * @public
   */
  get members(): any;
  /**
   * The channels in the guild.
   * @type {GuildChannelsManager}
   * @readonly
   * @public
   */
  get channels(): any;
  /**
   * The voice states in the guild.
   * @type {GuildVoiceStatesManager}
   * @readonly
   * @public
   */
  get voiceStates(): any;
  /**
   * The roles in the guild.
   * @type {GuildRoleManager}
   * @readonly
   * @public
   */
  get roles(): any;
  /**
   * The scheduled events in the guild.
   * @type {GuildScheduledEventManager}
   * @readonly
   * @public
   */
  get scheduledEvents(): any;
  /**
   * The emojis in the guild.
   * @type {GuildEmojisManager}
   * @readonly
   * @public
   */
  get emojis(): any;
  /**
   * The invites in the guild.
   * @type {GuildInviteManager}
   * @readonly
   * @public
   */
  get invites(): any;
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
  me(): Promise<any>;
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
  ban(user_id: any, { reason, seconds }?: any): Promise<void>;
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
  unban(user_id: any, { reason }?: any): Promise<void>;
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
  kick(user_id: any, { reason }?: any): Promise<void>;
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
  removeMemberRole(user_id: any, role_id: any, { reason }?: any): Promise<void>;
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
  fetchAuditLogs({ limit, type, user_id, before, after }?: any): Promise<any>;
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
      | import("./CategoryChannel.js").default
      | import("./TextChannel.js").default
      | Thread
      | import("./VoiceChannel.js").default
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
  fetchBan(user_id: any): Promise<any>;
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
  static deleteWebhook(client: ClientType, webhookId: any): Promise<void>;
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
    channelId: any,
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
    webhookId: any,
    { channelId }?: any,
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
  static fetchWebhook(client: ClientType, webhookId: any): any;
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
    { id, token }: any,
    { content, embeds, components, files }?: any,
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
  static getIcon(id: any, hash: any): string | null;
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
  static shouldCache(gluonCacheOptions: any): boolean;
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
  toJSON(format: TO_JSON_TYPES_ENUM):
    | {
        id: string;
        name: any;
        icon: string | null;
        owner_id: string;
        joined_at: number;
        unavailable: boolean;
        member_count: any;
        premium_tier: number | null;
        preferred_locale: any;
        _cache_options: GuildCacheOptions | undefined;
        _attributes: any;
        system_channel_id: string | null;
        rules_channel_id: string | null;
        premium_subscription_count: any;
        members: any;
        channels: any;
        voice_states: any;
        roles: any;
        emojis: any;
        invites: any;
        system_channel_flags?: undefined;
        premium_progress_bar_enabled?: undefined;
        default_message_notifications?: undefined;
        explicit_content_filter?: undefined;
        verification_level?: undefined;
        nsfw_level?: undefined;
        mfa_level?: undefined;
      }
    | {
        id: string;
        name: any;
        icon: string | null;
        owner_id: string;
        joined_at: string;
        premium_tier: number | null;
        unavailable: boolean;
        member_count: any;
        preferred_locale: any;
        system_channel_flags: number;
        system_channel_id: string | null;
        rules_channel_id: string | null;
        premium_subscription_count: any;
        premium_progress_bar_enabled: boolean;
        default_message_notifications: number | null;
        explicit_content_filter: number | null;
        verification_level: number | null;
        nsfw_level: number | null;
        mfa_level: number | null;
        members: any;
        channels: any;
        voice_states: any;
        roles: any;
        emojis: any;
        invites: any;
        _cache_options?: undefined;
        _attributes?: undefined;
      };
}
export default Guild;
