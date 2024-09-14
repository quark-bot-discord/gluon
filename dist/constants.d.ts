export const BASE_URL: "https://discord.com";
export const API_BASE_URL: "https://discord.com/api";
export const CDN_BASE_URL: "https://cdn.discordapp.com";
export const INVITE_BASE_URL: "https://discord.gg";
export const VERSION: 10;
export const NAME: any;
export const GLUON_REPOSITORY_URL: any;
export namespace INTENTS {
    let GUILDS: number;
    let GUILD_MEMBERS: number;
    let GUILD_BANS: number;
    let GUILD_EMOJIS: number;
    let GUILD_INTEGRATIONS: number;
    let GUILD_WEBHOOKS: number;
    let GUILD_INVITES: number;
    let GUILD_VOICE_STATES: number;
    let GUILD_PRESENCES: number;
    let GUILD_MESSAGES: number;
    let GUILD_MESSAGE_REACTIONS: number;
    let GUILD_MESSAGE_TYPING: number;
    let DIRECT_MESSAGES: number;
    let DIRECT_MESSAGE_REACTIONS: number;
    let DIRECT_MESSAGE_TYPING: number;
    let MESSAGE_CONTENT: number;
    let GUILD_SCHEDULED_EVENTS: number;
    let AUTO_MODERATION_CONFIGURATION: number;
    let AUTO_MODERATION_EXECUTION: number;
    let GUILD_MESSAGE_POLLS: number;
    let DIRECT_MESSAGE_POLLS: number;
}
export namespace EVENTS {
    let READY: string;
    let RESUMED: string;
    let GUILD_CREATE: string;
    let GUILD_DELETE: string;
    let GUILD_UPDATE: string;
    let MESSAGE_CREATE: string;
    let MESSAGE_UPDATE: string;
    let MESSAGE_DELETE: string;
    let MESSAGE_DELETE_BULK: string;
    let GUILD_AUDIT_LOG_ENTRY_CREATE: string;
    let GUILD_BAN_ADD: string;
    let GUILD_BAN_REMOVE: string;
    let GUILD_MEMBER_ADD: string;
    let GUILD_MEMBER_UPDATE: string;
    let GUILD_MEMBER_REMOVE: string;
    let BUTTON_CLICK: string;
    let MENU_SELECT: string;
    let MODAL_RESPONSE: string;
    let SLASH_COMMAND: string;
    let SLASH_COMMAND_AUTOCOMPLETE: string;
    let VOICE_STATE_UPDATE: string;
    let VOICE_CHANNEL_STATUS_UPDATE: string;
    let CHANNEL_CREATE: string;
    let CHANNEL_UPDATE: string;
    let CHANNEL_DELETE: string;
    let CHANNEL_PINS_UPDATE: string;
    let THREAD_CREATE: string;
    let THREAD_UPDATE: string;
    let THREAD_DELETE: string;
    let THREAD_LIST_SYNC: string;
    let INVITE_CREATE: string;
    let INVITE_DELETE: string;
    let GUILD_ROLE_CREATE: string;
    let GUILD_ROLE_UPDATE: string;
    let GUILD_ROLE_DELETE: string;
    let GUILD_EMOJI_CREATE: string;
    let GUILD_EMOJI_UPDATE: string;
    let GUILD_EMOJI_DELETE: string;
    let ENTITLEMENT_CREATE: string;
    let ENTITLEMENT_UPDATE: string;
    let ENTITLEMENT_DELETE: string;
    let GUILD_SCHEDULED_EVENT_CREATE: string;
    let GUILD_SCHEDULED_EVENT_UPDATE: string;
    let GUILD_SCHEDULED_EVENT_DELETE: string;
    let GUILD_SCHEDULED_EVENT_USER_ADD: string;
    let GUILD_SCHEDULED_EVENT_USER_REMOVE: string;
    let INITIALISED: string;
    let MESSAGE_POLL_VOTE_ADD: string;
    let MESSAGE_POLL_VOTE_REMOVE: string;
    let MESSAGE_REACTION_ADD: string;
    let MESSAGE_REACTION_REMOVE: string;
    let WEBHOOKS_UPDATE: string;
}
export namespace CHANNEL_TYPES {
    let GUILD_TEXT: number;
    let GUILD_VOICE: number;
    let GUILD_CATEGORY: number;
    let GUILD_NEWS: number;
    let GUILD_NEWS_THREAD: number;
    let GUILD_PUBLIC_THREAD: number;
    let GUILD_PRIVATE_THREAD: number;
    let GUILD_STAGE_VOICE: number;
    let GUILD_DIRECTORY: number;
    let GUILD_FORUM: number;
    let GUILD_MEDIA: number;
}
export namespace USER_FLAGS {
    let DISCORD_EMPLOYEE: number;
    let DISCORD_PARTNER: number;
    let HYPESQUAD_EVENTS: number;
    let BUG_HUNTER_LEVEL_1: number;
    let HOUSE_BRAVERY: number;
    let HOUSE_BRILLIANCE: number;
    let HOUSE_BALANCE: number;
    let EARLY_SUPPORTER: number;
    let TEAM_USER: number;
    let SYSTEM: number;
    let BUG_HUNTER_LEVEL_2: number;
    let VERIFIED_BOT: number;
    let VERIFIED_BOT_DEVELOPER: number;
}
export namespace MEMBER_FLAGS {
    let DID_REJOIN: number;
    let COMPLETED_ONBOARDING: number;
    let BYPASSES_VERIFICATION: number;
    let STARTED_ONBOARDING: number;
}
export namespace MESSAGE_FLAGS {
    let CROSSPOSTED: number;
    let IS_CROSSPOST: number;
    let SUPPRESS_EMBEDS: number;
    let SOURCE_MESSAGE_DELETED: number;
    let URGENT: number;
    let HAS_THREAD: number;
    let EPHEMERAL: number;
    let LOADING: number;
    let FAILED_TO_MENTION_SOME_ROLES_IN_THREAD: number;
    let SUPPRESS_NOTIFICATIONS: number;
    let IS_VOICE_MESSAGE: number;
}
export namespace AUDIT_LOG_TYPES {
    let GUILD_UPDATE_1: number;
    export { GUILD_UPDATE_1 as GUILD_UPDATE };
    let CHANNEL_CREATE_1: number;
    export { CHANNEL_CREATE_1 as CHANNEL_CREATE };
    let CHANNEL_UPDATE_1: number;
    export { CHANNEL_UPDATE_1 as CHANNEL_UPDATE };
    let CHANNEL_DELETE_1: number;
    export { CHANNEL_DELETE_1 as CHANNEL_DELETE };
    export let CHANNEL_OVERWRITE_CREATE: number;
    export let CHANNEL_OVERWRITE_UPDATE: number;
    export let CHANNEL_OVERWRITE_DELETE: number;
    export let MEMBER_KICK: number;
    export let MEMBER_PRUNE: number;
    export let MEMBER_BAN_ADD: number;
    export let MEMBER_BAN_REMOVE: number;
    export let MEMBER_UPDATE: number;
    export let MEMBER_ROLE_UPDATE: number;
    export let MEMBER_MOVE: number;
    export let MEMBER_DISCONNECT: number;
    export let BOT_ADD: number;
    export let ROLE_CREATE: number;
    export let ROLE_UPDATE: number;
    export let ROLE_DELETE: number;
    let INVITE_CREATE_1: number;
    export { INVITE_CREATE_1 as INVITE_CREATE };
    export let INVITE_UPDATE: number;
    let INVITE_DELETE_1: number;
    export { INVITE_DELETE_1 as INVITE_DELETE };
    export let WEBHOOK_CREATE: number;
    export let WEBHOOK_UPDATE: number;
    export let WEBHOOK_DELETE: number;
    export let EMOJI_CREATE: number;
    export let EMOJI_UPDATE: number;
    export let EMOJI_DELETE: number;
    let MESSAGE_DELETE_1: number;
    export { MESSAGE_DELETE_1 as MESSAGE_DELETE };
    export let MESSAGE_BULK_DELETE: number;
    export let MESSAGE_PIN: number;
    export let MESSAGE_UNPIN: number;
    export let INTEGRATION_CREATE: number;
    export let INTEGRATION_UPDATE: number;
    export let INTEGRATION_DELETE: number;
    export let STAGE_INSTANCE_CREATE: number;
    export let STAGE_INSTANCE_UPDATE: number;
    export let STAGE_INSTANCE_DELETE: number;
    export let STICKER_CREATE: number;
    export let STICKER_UPDATE: number;
    export let STICKER_DELETE: number;
    let GUILD_SCHEDULED_EVENT_CREATE_1: number;
    export { GUILD_SCHEDULED_EVENT_CREATE_1 as GUILD_SCHEDULED_EVENT_CREATE };
    let GUILD_SCHEDULED_EVENT_UPDATE_1: number;
    export { GUILD_SCHEDULED_EVENT_UPDATE_1 as GUILD_SCHEDULED_EVENT_UPDATE };
    let GUILD_SCHEDULED_EVENT_DELETE_1: number;
    export { GUILD_SCHEDULED_EVENT_DELETE_1 as GUILD_SCHEDULED_EVENT_DELETE };
    let THREAD_CREATE_1: number;
    export { THREAD_CREATE_1 as THREAD_CREATE };
    let THREAD_UPDATE_1: number;
    export { THREAD_UPDATE_1 as THREAD_UPDATE };
    let THREAD_DELETE_1: number;
    export { THREAD_DELETE_1 as THREAD_DELETE };
    export let APPLICATION_COMMAND_PERMISSION_UPDATE: number;
    export let AUTO_MODERATION_RULE_CREATE: number;
    export let AUTO_MODERATION_RULE_UPDATE: number;
    export let AUTO_MODERATION_RULE_DELETE: number;
    export let AUTO_MODERATION_BLOCK_MESSAGE: number;
    export let AUTO_MODERATION_FLAG_TO_CHANNEL: number;
    export let AUTO_MODERATION_USER_COMMUNICATION_DISABLED: number;
    export let CREATOR_MONETIZATION_REQUEST_CREATED: number;
    export let CREATOR_MONETIZATION_TERMS_ACCEPTED: number;
    let VOICE_CHANNEL_STATUS_UPDATE_1: number;
    export { VOICE_CHANNEL_STATUS_UPDATE_1 as VOICE_CHANNEL_STATUS_UPDATE };
}
export namespace INTERACTION_TYPES {
    let COMMAND: number;
    let COMPONENT: number;
    let APPLICATION_COMMAND_AUTOCOMPLETE: number;
    let MODAL_SUBMIT: number;
}
export namespace COMPONENT_TYPES {
    let ACTION_ROW: number;
    let BUTTON: number;
    let SELECT_MENU: number;
    let TEXT_INPUT: number;
    let USER_SELECT_MENU: number;
    let ROLE_SELECT_MENU: number;
    let MENTIONABLE_SELECT_MENU: number;
    let CHANNEL_SELECT_MENU: number;
}
export namespace SELECT_MENU_TYPES {
    let TEXT: number;
    let USER: number;
    let ROLE: number;
    let MENTIONABLE: number;
    let CHANNEL: number;
}
export namespace BUTTON_STYLES {
    let PRIMARY: number;
    let SECONDARY: number;
    let SUCCESS: number;
    let DANGER: number;
    let LINK: number;
}
export namespace TEXT_INPUT_STYLES {
    let SHORT: number;
    let PARAGRAPH: number;
}
export namespace APPLICATION_COMMAND_TYPES {
    export let CHAT_INPUT: number;
    let USER_1: number;
    export { USER_1 as USER };
    export let MESSAGE: number;
}
export namespace APPLICATION_COMMAND_OPTION_TYPES {
    export let SUB_COMMAND: number;
    export let SUB_COMMAND_GROUP: number;
    export let STRING: number;
    export let INTEGER: number;
    export let BOOLEAN: number;
    let USER_2: number;
    export { USER_2 as USER };
    let CHANNEL_1: number;
    export { CHANNEL_1 as CHANNEL };
    let ROLE_1: number;
    export { ROLE_1 as ROLE };
    let MENTIONABLE_1: number;
    export { MENTIONABLE_1 as MENTIONABLE };
    export let NUMBER: number;
    export let ATTACHMENT: number;
}
export const DEFAULT_MESSAGE_EXPIRY_SECONDS: number;
export const DEFAULT_USER_EXPIRY_SECONDS: number;
export const DEFAULT_POLLING_TIME: number;
export const DEFAULT_INCREASE_CACHE_BY: 28;
export namespace PERMISSIONS {
    let CREATE_INSTANT_INVITE: string;
    let KICK_MEMBERS: string;
    let BAN_MEMBERS: string;
    let ADMINISTRATOR: string;
    let MANAGE_CHANNELS: string;
    let MANAGE_GUILD: string;
    let ADD_REACTIONS: string;
    let VIEW_AUDIT_LOG: string;
    let PRIORITY_SPEAKER: string;
    let STREAM: string;
    let VIEW_CHANNEL: string;
    let SEND_MESSAGES: string;
    let SEND_TTS_MESSAGES: string;
    let MANAGE_MESSAGES: string;
    let EMBED_LINKS: string;
    let ATTACH_FILES: string;
    let READ_MESSAGE_HISTORY: string;
    let MENTION_EVERYONE: string;
    let USE_EXTERNAL_EMOJIS: string;
    let VIEW_GUILD_INSIGHTS: string;
    let CONNECT: string;
    let SPEAK: string;
    let MUTE_MEMBERS: string;
    let DEAFEN_MEMBERS: string;
    let MOVE_MEMBERS: string;
    let USE_VAD: string;
    let CHANGE_NICKNAME: string;
    let MANAGE_NICKNAMES: string;
    let MANAGE_ROLES: string;
    let MANAGE_WEBHOOKS: string;
    let MANAGE_EMOJIS: string;
    let USE_SLASH_COMMANDS: string;
    let REQUEST_TO_SPEAK: string;
    let MANAGE_THREADS: string;
    let USE_PUBLIC_THREADS: string;
    let USE_PRIVATE_THREADS: string;
    let USE_EXTERNAL_STICKERS: string;
    let SEND_MESSAGES_IN_THREADS: string;
    let USE_EMBEDDED_ACTIVITIES: string;
    let MODERATE_MEMBERS: string;
    let VIEW_CREATOR_MONETIZATION_ANALYTICS: string;
    let USE_SOUNDBOARD: string;
    let CREATE_GUILD_EXPRESSIONS: string;
    let CREATE_EVENTS: string;
    let USE_EXTERNAL_SOUNDS: string;
    let SEND_VOICE_MESSAGES: string;
    let SEND_POLLS: string;
}
export const STICKER_FORMATS: string[];
export namespace STICKER_FORMATS_ENUM {
    let PNG: number;
    let APNG: number;
    let LOTTIE: number;
}
export namespace WEBSOCKET_STATES {
    let CONNECTING: number;
    let OPEN: number;
    let CLOSING: number;
    let CLOSED: number;
}
export namespace GLUON_GLOBAL_CACHE_ENUM {
    let GUILDS_1: number;
    export { GUILDS_1 as GUILDS };
    export let USERS: number;
    export let CHANNELS: number;
    export let MESSAGES: number;
    export let ROLES: number;
    export let EMOJIS: number;
    export let INVITES: number;
    export let VOICE_STATES: number;
    export let MEMBERS: number;
    export let SCHEDULED_EVENTS: number;
}
export namespace GLUON_CACHING_OPTIONS {
    let NO_MESSAGES: number;
    let FILES_ONLY: number;
    let NO_VOICE_STATE: number;
}
export namespace GLUON_GUILD_CACHING_OPTIONS {
    let MESSAGES_1: number;
    export { MESSAGES_1 as MESSAGES };
    export let FILES: number;
    let VOICE_STATES_1: number;
    export { VOICE_STATES_1 as VOICE_STATES };
    let ROLES_1: number;
    export { ROLES_1 as ROLES };
    let EMOJIS_1: number;
    export { EMOJIS_1 as EMOJIS };
    let INVITES_1: number;
    export { INVITES_1 as INVITES };
    let CHANNELS_1: number;
    export { CHANNELS_1 as CHANNELS };
    let MEMBERS_1: number;
    export { MEMBERS_1 as MEMBERS };
    export let THREADS: number;
    let SCHEDULED_EVENTS_1: number;
    export { SCHEDULED_EVENTS_1 as SCHEDULED_EVENTS };
}
export namespace GLUON_CHANNEL_CACHING_OPTIONS {
    let MESSAGES_2: number;
    export { MESSAGES_2 as MESSAGES };
    let FILES_1: number;
    export { FILES_1 as FILES };
    export let CONTENT: number;
    export let POLL: number;
    export let REACTIONS: number;
    export let EMBEDS: number;
    export let ATTRIBUTES: number;
    export let REFERENCE: number;
    export let WEBHOOK: number;
    export let STICKER: number;
}
export namespace PERMISSION_OVERWRITE_TYPES {
    let ROLE_2: number;
    export { ROLE_2 as ROLE };
    export let MEMBER: number;
}
export namespace GLUON_DEBUG_LEVELS {
    export let NONE: number;
    export let ERROR: number;
    export let WARN: number;
    let DANGER_1: number;
    export { DANGER_1 as DANGER };
    export let INFO: number;
}
export namespace AUTO_MODERATION_TRIGGER_TYPES {
    let KEYWORD: number;
    let SPAM: number;
    let KEYWORD_PRESET: number;
    let MENTION_SPAM: number;
}
export namespace AUTO_MODERATION_EVENT_TYPES {
    let MESSAGE_SEND: number;
}
export namespace AUTO_MODERATION_KEYWORD_PRESET_TYPES {
    let PROFANITY: number;
    let SEXUAL_CONTENT: number;
    let SLURS: number;
}
export namespace AUTO_MODERATION_ACTION_TYPES {
    let BLOCK_MESSAGE: number;
    let SEND_ALERT_MESSAGE: number;
    let TIMEOUT: number;
}
export const GATEWAY_RECONNECT_CLOSE_CODES: number[];
export namespace LIMITS {
    let MAX_ACTION_ROW_BUTTONS: number;
    let MAX_EMBED_SIZE: number;
    let MAX_EMBED_DESCRIPTION: number;
    let MAX_EMBED_TITLE: number;
    let MAX_EMBED_FIELDS: number;
    let MAX_EMBED_FIELD_NAME: number;
    let MAX_EMBED_FIELD_VALUE: number;
    let MAX_EMBED_FOOTER_TEXT: number;
    let MAX_EMBED_AUTHOR_NAME: number;
    let MAX_COMMAND_NAME: number;
    let MIN_COMMAND_NAME: number;
    let MAX_COMMAND_DESCRIPTION: number;
    let MIN_COMMAND_DESCRIPTION: number;
    let MAX_COMMAND_OPTIONS: number;
    let MAX_COMMAND_OPTION_NAME: number;
    let MIN_COMMAND_OPTION_NAME: number;
    let MAX_COMMAND_OPTION_DESCRIPTION: number;
    let MIN_COMMAND_OPTION_DESCRIPTION: number;
    let MAX_COMMAND_OPTION_CHOICES: number;
    let MAX_COMMAND_OPTION_CHOICE_NAME: number;
    let MIN_COMMAND_OPTION_CHOICE_NAME: number;
    let MAX_COMMAND_OPTION_CHOICE_VALUE: number;
    let MIN_COMMAND_OPTION_CHOICE_VALUE: number;
    let MAX_BUTTON_LABEL: number;
    let MAX_BUTTON_CUSTOM_ID: number;
    let MAX_DROPDOWN_CUSTOM_ID: number;
    let MAX_DROPDOWN_OPTIONS: number;
    let MAX_DROPDOWN_PLACEHOLDER: number;
    let MIN_MIN_DROPDOWN_VALUES: number;
    let MAX_MIN_DROPDOWN_VALUES: number;
    let MIN_MAX_DROPDOWN_VALUES: number;
    let MAX_MAX_DROPDOWN_VALUES: number;
    let MAX_ACTION_ROWS: number;
    let MAX_TEXT_INPUT_LABEL: number;
    let MAX_TEXT_INPUT_CUSTOM_ID: number;
    let MAX_TEXT_INPUT_PLACEHOLDER: number;
    let MAX_TEXT_INPUT_VALUE: number;
    let MAX_DROPDOWN_OPTION_LABEL: number;
    let MAX_DROPDOWN_OPTION_VALUE: number;
    let MAX_DROPDOWN_OPTION_DESCRIPTION: number;
    let MIN_MIN_TEXT_INPUT_LENGTH: number;
    let MAX_MIN_TEXT_INPUT_LENGTH: number;
    let MIN_MAX_TEXT_INPUT_LENGTH: number;
    let MAX_MAX_TEXT_INPUT_LENGTH: number;
    let MAX_FILE_NAME_LENGTH: number;
    let MIN_MIN_COMMAND_OPTION_LENGTH: number;
    let MAX_MIN_COMMAND_OPTION_LENGTH: number;
    let MIN_MAX_COMMAND_OPTION_LENGTH: number;
    let MAX_MAX_COMMAND_OPTION_LENGTH: number;
    let MAX_MESSAGE_CONTENT: number;
    let MAX_NITRO_MESSAGE_CONTENT: number;
    let MAX_MESSAGE_EMBEDS: number;
    let MAX_MESSAGE_FILES: number;
    let MIN_MESSAGES_FETCH_LIMIT: number;
    let MAX_MESSAGES_FETCH_LIMIT: number;
}
export const COMMAND_NAME_REGEX: RegExp;
export namespace TO_JSON_TYPES_ENUM {
    let DISCORD_FORMAT: number;
    let CACHE_FORMAT: number;
    let STORAGE_FORMAT: number;
}
export const GLUON_VERSION: any;
//# sourceMappingURL=constants.d.ts.map