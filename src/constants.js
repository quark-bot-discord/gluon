module.exports.BASE_URL = 'https://discord.com/api';
module.exports.CDN_BASE_URL = "https://cdn.discordapp.com";
module.exports.VERSION = 9;
module.exports.NAME = "gluon";
module.exports.INTENTS = {
    GUILDS: 0,
    GUILD_MEMBERS: 1,
    GUILD_BANS: 2,
    GUILD_EMOJIS: 3,
    GUILD_INTEGRATIONS: 4,
    GUILD_WEBHOOKS: 5,
    GUILD_INVITES: 6,
    GUILD_VOICE_STATES: 7,
    GUILD_PRESENCES: 8,
    GUILD_MESSAGES: 9,
    GUILD_MESSAGE_REACTIONS: 10,
    GUILD_MESSAGE_TYPING: 11,
    DIRECT_MESSAGES: 12,
    DIRECT_MESSAGE_REACTIONS: 13,
    DIRECT_MESSAGE_TYPING: 14
};
module.exports.CALCULATED_INTENTS = (0b1 << this.INTENTS.GUILDS) |
    (0b1 << this.INTENTS.GUILD_MEMBERS) |
    (0b1 << this.INTENTS.GUILD_BANS) |
    (0b1 << this.INTENTS.GUILD_INVITES) |
    (0b1 << this.INTENTS.GUILD_VOICE_STATES) |
    (0b1 << this.INTENTS.GUILD_MESSAGES);
module.exports.EVENTS = {
    READY: "ready",
    GUILD_CREATE: "guildCreate",
    GUILD_DELETE: "guildDelete",
    MESSAGE_CREATE: "messageCreate",
    MESSAGE_UPDATE: "messageUpdate",
    MESSAGE_DELETE: "messageDelete",
    MESSAGE_DELETE_BULK: "messageDeleteBulk",
    GUILD_BAN_ADD: "guildBanAdd",
    GUILD_MEMBER_ADD: "guildMemberAdd",
    GUILD_MEMBER_UPDATE: "guildMemberUpdate",
    GUILD_MEMBER_REMOVE: "guildMemberRemove",
    BUTTON_CLICK: "buttonClick",
    SLASH_COMMAND: "slashCommand",
    VOICE_STATE_UPDATE: "voiceStateUpdate",
    CHANNEL_CREATE: "channelCreate",
    CHANNEL_UPDATE: "channelUpdate",
    CHANNEL_DELETE: "channelDelete",
    THREAD_CREATE: "threadCreate",
    INVITE_CREATE: "inviteCreate"
};
module.exports.CHANNEL_TYPES = {
    GUILD_TEXT: 0,
    GUILD_VOICE: 2,
    GUILD_NEWS: 5,
    GUILD_NEWS_THREAD: 10,
    GUILD_PUBLIC_THREAD: 11,
    GUILD_PRIVATE_THREAD: 12,
    GUILD_STAGE_VOICE: 13
};
module.exports.USER_FLAGS = {
    NONE:                   0,
    DISCORD_EMPLOYEE:       1 << 0,
    DISCORD_PARTNER:        1 << 1,
    HYPESQUAD_EVENTS:       1 << 2,
    BUG_HUNTER_LEVEL_1:     1 << 3,
    HOUSE_BRAVERY:          1 << 6,
    HOUSE_BRILLIANCE:       1 << 7,
    HOUSE_BALANCE:          1 << 8,
    EARLY_SUPPORTER:        1 << 9,
    TEAM_USER:              1 << 10,
    SYSTEM:                 1 << 12,
    BUG_HUNTER_LEVEL_2:     1 << 14,
    VERIFIED_BOT:           1 << 16,
    VERIFIED_BOT_DEVELOPER: 1 << 17
};
module.exports.AUDIT_LOG_TYPES = {
    MEMBER_KICK: 20,
    MEMBER_BAN_ADD: 22,
    MEMBER_BAN_REMOVE: 23,
    MEMBER_UPDATE: 24,
    MEMBER_MOVE: 26,
    MEMBER_DISCONNECT: 27,
    BOT_ADD: 28,
    MESSAGE_DELETE: 72,
    MESSAGE_BULK_DELETE: 73
};
module.exports.INTERACTION_TYPES = {
    COMMAND: 2,
    COMPONENT: 3
};
module.exports.DEFAULT_MESSAGE_EXPIRY_SECONDS = 3600 * 8; // 8 hours