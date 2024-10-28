export default Guild;
/**
 * Represents a Discord guild.
 * @see {@link https://discord.com/developers/docs/resources/guild}
 */
declare class Guild {
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
    public static deleteWebhook(client: Client, webhookId: string): Promise<void>;
    /**
     * Creates a webhook in the given channel with the name "Gluon".
     * @param {Client} client The client instance.
     * @param {String} channelId The id of the channel to create the webhook in.
     * @param {Object} options The options for creating the webhook.
     * @param {String} options.name The name of the webhook.
     * @returns {Promise<Object>}
     * @public
     * @method
     * @async
     * @throws {TypeError}
     * @static
     */
    public static createWebhook(client: Client, channelId: string, { name }?: {
        name: string;
    }): Promise<any>;
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
    public static modifyWebhook(client: Client, webhookId: string, { channelId }?: {
        channelId: string;
    }): Promise<any>;
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
    public static fetchWebhook(client: Client, webhookId: string): Promise<any>;
    /**
     * Posts a webhook with the provided webhook id and token.
     * @param {Client} client The client instance.
     * @param {Object} referenceData An object with the webhook id and token.
     * @param {String?} content The message to send with the webhook.
     * @param {Object?} options Embeds, components and files to attach to the webhook.
     * @returns {Promise<void>}
     * @public
     * @method
     * @async
     * @throws {TypeError}
     * @static
     */
    public static postWebhook(client: Client, { id, token }: any, content: string | null, { embeds, components, files }?: any | null): Promise<void>;
    /**
     * Returns the icon URL of the guild.
     * @param {String} id The id of the guild.
     * @param {String?} hash The hash of the guild icon.
     * @returns {String}
     * @public
     * @static
     * @method
     */
    public static getIcon(id: string, hash: string | null): string;
    /**
     * Determines whether the emoji should be cached.
     * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
     * @returns {Boolean}
     * @public
     * @static
     * @method
     */
    public static shouldCache(gluonCacheOptions: GluonCacheOptions): boolean;
    /**
     * Creates the structure for a guild.
     * @param {Client} client The client instance.
     * @param {Object} data Raw guild data.
     * @param {Object?} options The additional options for this structure.
     * @param {Boolean?} options.nocache Whether this guild should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object}
     */
    constructor(client: Client, data: any, { nocache }?: any | null);
    /**
     * The id of the guild.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The hash of the guild's icon, as it was received from Discord.
     * @readonly
     * @type {String?}
     * @public
     */
    public readonly get _originalIconHash(): string;
    /**
     * The icon URL of the guild.
     * @readonly
     * @type {String?}
     * @public
     */
    public readonly get displayIconURL(): string;
    /**
     * The owner of the guild.
     * @type {Member}
     * @readonly
     * @public
     */
    public readonly get owner(): Member;
    /**
     * System channel flags.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
     * @readonly
     * @type {String[]}
     * @public
     */
    public readonly get systemChannelFlags(): string[];
    /**
     * Raw system channel flags.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get rawSystemChannelFlags(): number;
    /**
     * Server MFA level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get mfaLevel(): string;
    /**
     * Server MFA level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get rawMfaLevel(): number;
    /**
     * Server verification level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get verificationLevel(): string;
    /**
     * Server verification level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get rawVerificationLevel(): number;
    /**
     * Default notification setting.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get defaultMessageNotifications(): string;
    /**
     * Default notification setting.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get rawDefaultMessageNotifications(): number;
    /**
     * Explicit content filter level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get explicitContentFilter(): string;
    /**
     * Explicit content filter level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get rawExplicitContentFilter(): number;
    /**
     * Server NSFW level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
     * @readonly
     * @type {String}
     * @public
     */
    public readonly get nsfwLevel(): string;
    /**
     * Server NSFW level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get rawNsfwLevel(): number;
    /**
     * Server boost level.
     * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier}
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get premiumTier(): number;
    /**
     * Whether the guild has the boost progress bar enabled.
     * @readonly
     * @type {Boolean}
     * @public
     */
    public readonly get premiumProgressBarEnabled(): boolean;
    /**
     * Whether the guild is unavailable.
     * @type {Boolean}
     * @readonly
     * @public
     */
    public readonly get unavailable(): boolean;
    /**
     * The name of the guild.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get name(): string;
    /**
     * The description of the guild.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get description(): string;
    /**
     * The icon hash of the guild.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get ownerId(): string;
    /**
     * The id of the guild owner.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get joinedAt(): number;
    /**
     * The member count of the guild.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get memberCount(): number;
    /**
     * The system channel id of the guild.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get systemChannelId(): string;
    /**
     * The system channel of the guild.
     * @type {TextChannel?}
     * @readonly
     * @public
     */
    public readonly get systemChannel(): TextChannel;
    /**
     * The rules channel id of the guild.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get rulesChannelId(): string;
    /**
     * The rules channel of the guild.
     * @type {TextChannel?}
     * @readonly
     * @public
     */
    public readonly get rulesChannel(): TextChannel;
    /**
     * The preferred locale of the guild.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get preferredLocale(): string;
    /**
     * The premium subscription count of the guild.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get premiumSubscriptionCount(): number;
    /**
     * The cache options for this guild.
     * @type {GuildCacheOptions}
     * @readonly
     * @public
     */
    public readonly get _cacheOptions(): GuildCacheOptions;
    /**
     * The members in the guild.
     * @type {GuildMemberManager}
     * @readonly
     * @public
     */
    public readonly get members(): GuildMemberManager;
    /**
     * The channels in the guild.
     * @type {GuildChannelsManager}
     * @readonly
     * @public
     */
    public readonly get channels(): GuildChannelsManager;
    /**
     * The voice states in the guild.
     * @type {GuildVoiceStatesManager}
     * @readonly
     * @public
     */
    public readonly get voiceStates(): GuildVoiceStatesManager;
    /**
     * The roles in the guild.
     * @type {GuildRoleManager}
     * @readonly
     * @public
     */
    public readonly get roles(): GuildRoleManager;
    /**
     * The scheduled events in the guild.
     * @type {GuildScheduledEventManager}
     * @readonly
     * @public
     */
    public readonly get scheduledEvents(): GuildScheduledEventManager;
    /**
     * The emojis in the guild.
     * @type {GuildEmojisManager}
     * @readonly
     * @public
     */
    public readonly get emojis(): GuildEmojisManager;
    /**
     * The invites in the guild.
     * @type {GuildInviteManager}
     * @readonly
     * @public
     */
    public readonly get invites(): GuildInviteManager;
    /**
     * Increases the member count of the guild.
     * @method
     * @public
     */
    public _incrementMemberCount(): void;
    /**
     * Decreases the member count of the guild.
     * @method
     * @public
     */
    public _decrementMemberCount(): void;
    /**
     * Returns the client member for this guild.
     * @returns {Promise<Member>}
     * @public
     * @async
     * @method
     * @throws {Error}
     */
    public me(): Promise<Member>;
    /**
     * Bans a user with the given id from the guild.
     * @param {String} user_id The id of the user to ban.
     * @param {Object?} options Ban options.
     * @returns {Promise<void?>}
     * @async
     * @public
     * @method
     * @throws {Error | TypeError}
     */
    public ban(user_id: string, { reason, seconds }?: any | null): Promise<void | null>;
    /**
     * Unbans a user with the given id from the guild.
     * @param {String} user_id The id of the user to unban.
     * @param {Object?} options Unban options.
     * @returns {Promise<void?>}
     * @async
     * @public
     * @method
     * @throws {Error | TypeError}
     */
    public unban(user_id: string, { reason }?: any | null): Promise<void | null>;
    /**
     * Kicks a user with the given id from the guild.
     * @param {String} user_id The id of the user to kick.
     * @param {Object?} options Kick options.
     * @returns {Promise<void?>}
     * @async
     * @public
     * @method
     * @throws {Error | TypeError}
     */
    public kick(user_id: string, { reason }?: any | null): Promise<void | null>;
    /**
     * Removes the given role from the given member.
     * @param {String} user_id The id of the user.
     * @param {String} role_id The id of the role.
     * @param {Object?} options Remove role options.
     * @returns {Promise<void?>}
     * @async
     * @public
     * @method
     * @throws {Error | TypeError}
     */
    public removeMemberRole(user_id: string, role_id: string, { reason }?: any | null): Promise<void | null>;
    /**
     * Fetches audit logs.
     * @param {Object?} options Audit log fetch options.
     * @returns {Promise<AuditLog[]?>}
     * @async
     * @public
     * @method
     * @throws {Error | TypeError}
     */
    public fetchAuditLogs({ limit, type, user_id, before, after }?: any | null): Promise<AuditLog[] | null>;
    /**
     * Fetches the guild invites.
     * @returns {Promise<Object[]?>}
     * @async
     * @public
     * @method
     * @throws {Error}
     */
    public fetchInvites(): Promise<any[] | null>;
    /**
     * Fetches all the guild channels.
     * @returns {Promise<Array<TextChannel | VoiceState>>}
     * @async
     * @public
     * @method
     * @throws {Error}
     */
    public fetchChannels(): Promise<Array<TextChannel | VoiceState>>;
    /**
     * Fetches the ban for the provided user id.
     * @param {String} user_id The id of the user to fetch the ban of.
     * @returns {Promise<Object?>}
     * @async
     * @public
     * @method
     * @throws {Error | TypeError}
     */
    public fetchBan(user_id: string): Promise<any | null>;
    /**
     * Leaves the guild.
     * @returns {Promise<void?>}
     * @async
     * @public
     * @method
     * @throws {Error}
     */
    public leave(): Promise<void | null>;
    /**
     * Calculates the number of messages that should be cached per channel for this guild.
     * @returns {Number}
     * @public
     * @method
     */
    public calculateMessageCacheCount(): number;
    /**
     * Calculates the number of members that should be cached for this guild.
     * @returns {Number}
     * @public
     * @method
     */
    public calculateMemberCacheCount(): number;
    /**
     * @method
     * @public
     */
    public _intervalCallback(): void;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} format The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format: number): any;
    #private;
}
import Member from "./Member.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import GuildMemberManager from "../managers/GuildMemberManager.js";
import GuildChannelsManager from "../managers/GuildChannelsManager.js";
import GuildVoiceStatesManager from "../managers/GuildVoiceStatesManager.js";
import GuildRoleManager from "../managers/GuildRoleManager.js";
import GuildScheduledEventManager from "../managers/GuildScheduledEventManager.js";
import GuildEmojisManager from "../managers/GuildEmojisManager.js";
import GuildInviteManager from "../managers/GuildInviteManager.js";
import AuditLog from "./AuditLog.js";
import VoiceState from "./VoiceState.js";
import Client from "../Client.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
//# sourceMappingURL=Guild.d.ts.map