export default Client;
/**
 * A client user, which is able to handle multiple shards.
 * @extends {TypedEmitter<{
 *  "ready": (shardGuilds: String[]) => void
 *  "resumed": () => void
 *  "guildCreate": (guild: Guild) => void
 *  "guildDelete": (guild: Guild) => void
 *  "guildUpdate": (oldGuild: Guild, newGuild: Guild) => void
 *  "messageCreate": (message: Message) => void
 *  "messageUpdate": (oldMessage: Message, newMessage: Message) => void
 *  "messageDelete": (message: Message) => void
 *  "messageDeleteBulk": (messages: Message[]) => void
 *  "guildAuditLogEntryCreate": (auditLog: AuditLog) => void
 *  "guildBanAdd": (bannedUser: User) => void
 *  "guildBanRemove": (unbannedUser: User) => void
 *  "guildMemberAdd": (member: Member) => void
 *  "guildMemberUpdate": (oldMember: Member, newMember: Member) => void
 *  "guildMemberRemove": (member: Member) => void
 *  "buttonClick": (interaction: ButtonClick) => void
 *  "menuSelect": (interaction: OptionSelect) => void
 *  "modalResponse": (interaction: ModalResponse) => void
 *  "slashCommand": (interaction: SlashCommand) => void
 *  "slashCommandAutocomplete": (interaction: SlashCommand) => void
 *  "voiceStateUpdate": (oldVoiceState: VoiceState, newVoiceState: VoiceState) => void
 *  "voiceChannelStatusUpdate": (data: Object) => void
 *  "channelCreate": (channel: TextChannel | VoiceChannel | CategoryChannel) => void
 *  "channelUpdate": (oldChannel: TextChannel | VoiceChannel | CategoryChannel, newChannel: TextChannel | VoiceChannel | CategoryChannel) => void
 *  "channelDelete": (channel: TextChannel | VoiceChannel | CategoryChannel) => void
 *  "channelPinsUpdate": (data: Object) => void
 *  "threadCreate": (thread: Thread) => void
 *  "threadUpdate": (oldThread: Thread, newThread: Thread)
 *  "threadDelete": (thread: Thread) => void
 *  "threadListSync": (threads: Thread[]) => void
 *  "inviteCreate": (invite: Invite) => void
 *  "inviteDelete": (data: Object, invite: Invite) => void
 *  "roleCreate": (role: Role) => void
 *  "roleUpdate": (oldRole: Role, newRole: Role) => void
 *  "roleDelete": (role: Role) => void
 *  "emojiCreate": (emoji: Emoji) => void
 *  "emojiUpdate": (oldEmoji: Emoji, newEmoji: Emoji) => void
 *  "emojiDelete": (emoji: Emoji) => void
 *  "entitlementCreate": (entitlement: Object) => void
 *  "entitlementUpdate": (entitlement: Object) => void
 *  "entitlementDelete": (entitlement: Object) => void
 *  "guildScheduledEventCreate": (scheduledEvent: ScheduledEvent) => void
 *  "guildScheduledEventUpdate": (oldScheduledEvent: ScheduledEvent, newScheduledEvent: ScheduledEvent) => void
 *  "guildScheduledEventDelete": (scheduledEvent: ScheduledEvent) => void
 *  "guildScheduledEventUserAdd": (data: Object, user: User) => void
 *  "guildScheduledEventUserRemove": (data: Object, user: User) => void
 *  "initialised": () => void
 *  "messagePollVoteAdd": (data: Object) => void
 *  "messagePollVoteRemove": (data: Object) => void
 *  "messageReactionAdd": (data: Object) => void
 *  "messageReactionRemove": (data: Object) => void
 *  "webhooksUpdate": (data: Object) => void
 * }>}
 */
declare class Client extends TypedEmitter<{
    ready: (shardGuilds: string[]) => void;
    resumed: () => void;
    guildCreate: (guild: Guild) => void;
    guildDelete: (guild: Guild) => void;
    guildUpdate: (oldGuild: Guild, newGuild: Guild) => void;
    messageCreate: (message: Message) => void;
    messageUpdate: (oldMessage: Message, newMessage: Message) => void;
    messageDelete: (message: Message) => void;
    messageDeleteBulk: (messages: Message[]) => void;
    guildAuditLogEntryCreate: (auditLog: AuditLog) => void;
    guildBanAdd: (bannedUser: User) => void;
    guildBanRemove: (unbannedUser: User) => void;
    guildMemberAdd: (member: Member) => void;
    guildMemberUpdate: (oldMember: Member, newMember: Member) => void;
    guildMemberRemove: (member: Member) => void;
    buttonClick: (interaction: ButtonClick) => void;
    menuSelect: (interaction: OptionSelect) => void;
    modalResponse: (interaction: ModalResponse) => void;
    slashCommand: (interaction: SlashCommand) => void;
    slashCommandAutocomplete: (interaction: SlashCommand) => void;
    voiceStateUpdate: (oldVoiceState: VoiceState, newVoiceState: VoiceState) => void;
    voiceChannelStatusUpdate: (data: any) => void;
    channelCreate: (channel: TextChannel | VoiceChannel | CategoryChannel) => void;
    channelUpdate: (oldChannel: TextChannel | VoiceChannel | CategoryChannel, newChannel: TextChannel | VoiceChannel | CategoryChannel) => void;
    channelDelete: (channel: TextChannel | VoiceChannel | CategoryChannel) => void;
    channelPinsUpdate: (data: any) => void;
    threadCreate: (thread: Thread) => void;
    threadUpdate: (oldThread: Thread, newThread: Thread) => "threadDelete";
}> {
    /**
     * Creates the client and sets the default options.
     * @constructor
     * @param {Object?} options The options to pass to the client.
     * @param {Boolean?} options.cacheMessages Whether to cache messages.
     * @param {Boolean?} options.cacheUsers Whether to cache users.
     * @param {Boolean?} options.cacheMembers Whether to cache members.
     * @param {Boolean?} options.cacheChannels Whether to cache channels.
     * @param {Boolean?} options.cacheGuilds Whether to cache guilds.
     * @param {Boolean?} options.cacheVoiceStates Whether to cache voice states.
     * @param {Boolean?} options.cacheRoles Whether to cache roles.
     * @param {Boolean?} options.cacheScheduledEvents Whether to cache scheduled events.
     * @param {Boolean?} options.cacheEmojis Whether to cache emojis.
     * @param {Boolean?} options.cacheInvites Whether to cache invites.
     * @param {Number?} options.defaultMessageExpiry The default expiry time for messages.
     * @param {Number?} options.defaultUserExpiry The default expiry time for users.
     * @param {Number} options.intents The intents to use when connecting.
     * @param {Number?} options.totalShards The total number of shards to manage.
     * @param {Array<Number>?} options.shardIds The ids of the shards to manage.
     * @param {Object?} options.sessionData The session data for the client.
     * @param {Object?} options.initCache The initial cache data for the client.
     * @param {Function?} options.softRestartFunction The function to call when a soft restart is needed.
     * @throws {TypeError}
     * @public
     * @method
     */
    constructor({ cacheMessages, cacheUsers, cacheMembers, cacheChannels, cacheGuilds, cacheVoiceStates, cacheRoles, cacheScheduledEvents, cacheEmojis, cacheInvites, defaultMessageExpiry, defaultUserExpiry, intents, totalShards, shardIds, sessionData, initCache, softRestartFunction, }?: any | null);
    /**
     * The client user.
     * @type {User?}
     */
    user: User | null;
    /**
     * The ids of the shards that this client is managing.
     * @type {Array<Number>}
     * @readonly
     * @public
     */
    public readonly get shardIds(): number[];
    /**
     * The total number of shards that this client is managing.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get totalShards(): number;
    /**
     * The intents that this client is using.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get intents(): number;
    /**
     * The user manager for this client.
     * @type {UserManager}
     * @readonly
     * @public
     */
    public readonly get users(): UserManager;
    /**
     * The guild manager for this client.
     * @type {GuildManager}
     * @readonly
     * @public
     */
    public readonly get guilds(): GuildManager;
    /**
     * The session data for this client.
     * @type {Object}
     * @readonly
     * @public
     */
    public readonly get sessionData(): any;
    /**
     * The function to call when a soft restart is needed.
     * @public
     * @method
     * @returns {void}
     */
    public softRestartFunction(): void;
    /**
     * Stops all shards.
     * @public
     * @method
     * @returns {void}
     */
    public halt(): void;
    /**
     * Monitors the current process.
     * @public
     * @method
     * @returns {Object}
     */
    public checkProcess(): any;
    /**
     * Outputs a debug message if NODE_ENV=development.
     * @param {Number} status The debug status level.
     * @param {String} message The message to emit.
     * @returns {void}
     * @method
     * @public
     */
    public _emitDebug(status: number, message: string): void;
    /**
     * Counts how many items are in each cache.
     * @returns {Object}
     * @public
     * @method
     */
    public getCacheCounts(): any;
    /**
     * Returns the cache options for this client.
     * @type {GluonCacheOptions}
     * @readonly
     * @public
     */
    public readonly get _cacheOptions(): GluonCacheOptions;
    /**
     * Returns the global guild cache options for this client.
     * @type {GuildCacheOptions}
     * @readonly
     * @public
     */
    public readonly get _defaultGuildCacheOptions(): GuildCacheOptions;
    /**
     * Counts how many members are in all of Quark's servers.
     * @returns {Number}
     * @public
     * @method
     */
    public getMemberCount(): number;
    /**
     * Bundles all guilds.
     * @returns {Array<Object>}
     * @public
     * @method
     */
    public bundleCache(): Array<any>;
    /**
     * Registers commands, overwriting all previous ones.
     * @param {Array<Command>} commands Array of commands to register.
     * @returns {Array<Object>}
     * @see {@link https://discord.com/developers/docs/interactions/application-commands#registering-a-command}
     * @see {@link https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands}
     * @public
     * @method
     * @async
     * @throws {TypeError}
     */
    public registerCommands(commands: Array<Command>): Array<any>;
    /**
     * Sets the bot's status across all shards.
     * @param {Object} status Status options.
     * @param {String} status.name The bot's new status.
     * @param {Number} status.type The type of status.
     * @param {String} status.status The bot's status.
     * @param {Boolean} status.afk Whether the bot is afk.
     * @param {Number} status.since The time since the bot has been afk.
     * @returns {void}
     * @public
     * @method
     * @throws {TypeError}
     */
    public setStatus({ name, type, status, afk, since }?: {
        name: string;
        type: number;
        status: string;
        afk: boolean;
        since: number;
    }): void;
    /**
     * Initiates the login sequence
     * @param {String} token The authorization token
     * @returns {void}
     * @public
     * @method
     * @throws {TypeError}
     */
    public login(token: string): void;
    request: BetterRequestHandler;
    #private;
}
import Guild from "./structures/Guild.js";
import User from "./structures/User.js";
import { TypedEmitter } from "tiny-typed-emitter";
import UserManager from "./managers/UserManager.js";
import GuildManager from "./managers/GuildManager.js";
import GluonCacheOptions from "./managers/GluonCacheOptions.js";
import GuildCacheOptions from "./managers/GuildCacheOptions.js";
import Command from "./util/builder/commandBuilder.js";
import BetterRequestHandler from "./rest/betterRequestHandler.js";
//# sourceMappingURL=Client.d.ts.map