module.exports.BASE_URL = ("https://discord.com/api");
module.exports.CDN_BASE_URL = ("https://cdn.discordapp.com");
module.exports.VERSION = (10);
module.exports.NAME = ("gluon");
module.exports.INTENTS = {
    GUILDS:                     (1 << 0),
    GUILD_MEMBERS:              (1 << 1),
    GUILD_BANS:                 (1 << 2),
    GUILD_EMOJIS:               (1 << 3),
    GUILD_INTEGRATIONS:         (1 << 4),
    GUILD_WEBHOOKS:             (1 << 5),
    GUILD_INVITES:              (1 << 6),
    GUILD_VOICE_STATES:         (1 << 7),
    GUILD_PRESENCES:            (1 << 8),
    GUILD_MESSAGES:             (1 << 9),
    GUILD_MESSAGE_REACTIONS:    (1 << 10),
    GUILD_MESSAGE_TYPING:       (1 << 11),
    DIRECT_MESSAGES:            (1 << 12),
    DIRECT_MESSAGE_REACTIONS:   (1 << 13),
    DIRECT_MESSAGE_TYPING:      (1 << 14),
    MESSAGE_CONTENT:            (1 << 15),
    GUILD_SCHEDULED_EVENTS:     (1 << 16),
    AUTO_MODERATION_CONFIGURATION: (1 << 20),
    AUTO_MODERATION_EXECUTION:  (1 << 21)
};
module.exports.CALCULATED_INTENTS = this.INTENTS.GUILDS |
                                    this.INTENTS.GUILD_MEMBERS |
                                    this.INTENTS.GUILD_BANS |
                                    this.INTENTS.GUILD_INVITES |
                                    this.INTENTS.GUILD_VOICE_STATES |
                                    this.INTENTS.GUILD_MESSAGES;
module.exports.EVENTS = {
    READY:                      ("ready"),
    GUILD_CREATE:               ("guildCreate"),
    GUILD_DELETE:               ("guildDelete"),
    MESSAGE_CREATE:             ("messageCreate"),
    MESSAGE_UPDATE:             ("messageUpdate"),
    MESSAGE_DELETE:             ("messageDelete"),
    MESSAGE_DELETE_BULK:        ("messageDeleteBulk"),
    GUILD_BAN_ADD:              ("guildBanAdd"),
    GUILD_BAN_REMOVE:           ("guildBanRemove"),
    GUILD_MEMBER_ADD:           ("guildMemberAdd"),
    GUILD_MEMBER_UPDATE:        ("guildMemberUpdate"),
    GUILD_MEMBER_REMOVE:        ("guildMemberRemove"),
    BUTTON_CLICK:               ("buttonClick"),
    MENU_SELECT:                ("menuSelect"),
    SLASH_COMMAND:              ("slashCommand"),
    VOICE_STATE_UPDATE:         ("voiceStateUpdate"),
    CHANNEL_CREATE:             ("channelCreate"),
    CHANNEL_UPDATE:             ("channelUpdate"),
    CHANNEL_DELETE:             ("channelDelete"),
    THREAD_CREATE:              ("threadCreate"),
    THREAD_UPDATE:              ("threadUpdate"),
    THREAD_DELETE:              ("threadDelete"),
    INVITE_CREATE:              ("inviteCreate"),
    INVITE_DELETE:              ("inviteDelete"),
    GUILD_ROLE_CREATE:          ("roleCreate"),
    GUILD_ROLE_UPDATE:          ("roleUpdate"),
    GUILD_ROLE_DELETE:          ("roleDelete")
};
module.exports.CHANNEL_TYPES = {
    GUILD_TEXT:                 (0),
    GUILD_VOICE:                (2),
    GUILD_NEWS:                 (5),
    GUILD_NEWS_THREAD:          (10),
    GUILD_PUBLIC_THREAD:        (11),
    GUILD_PRIVATE_THREAD:       (12),
    GUILD_STAGE_VOICE:          (13),
    GUILD_DIRECTORY:            (14),
    GUILD_FORUM:                (15)
};
module.exports.USER_FLAGS = {
    DISCORD_EMPLOYEE:           (1 << 0),
    DISCORD_PARTNER:            (1 << 1),
    HYPESQUAD_EVENTS:           (1 << 2),
    BUG_HUNTER_LEVEL_1:         (1 << 3),
    HOUSE_BRAVERY:              (1 << 6),
    HOUSE_BRILLIANCE:           (1 << 7),
    HOUSE_BALANCE:              (1 << 8),
    EARLY_SUPPORTER:            (1 << 9),
    TEAM_USER:                  (1 << 10),
    SYSTEM:                     (1 << 12),
    BUG_HUNTER_LEVEL_2:         (1 << 14),
    VERIFIED_BOT:               (1 << 16),
    VERIFIED_BOT_DEVELOPER:     (1 << 17)
};
module.exports.AUDIT_LOG_TYPES = {
    MEMBER_KICK:                (20),
    MEMBER_BAN_ADD:             (22),
    MEMBER_BAN_REMOVE:          (23),
    MEMBER_UPDATE:              (24),
    MEMBER_ROLE_UPDATE:         (25),
    MEMBER_MOVE:                (26),
    MEMBER_DISCONNECT:          (27),
    BOT_ADD:                    (28),
    MESSAGE_DELETE:             (72),
    MESSAGE_BULK_DELETE:        (73),
    THREAD_UPDATE:              (111),
    THREAD_DELETE:              (112)
};
module.exports.INTERACTION_TYPES = {
    COMMAND:                    (2),
    COMPONENT:                  (3)
};
module.exports.COMPONENT_TYPES = {
    ACTION_ROW:                 (1),
    BUTTON:                     (2),
    SELECT_MENU:                (3),
    TEXT_INPUT:                 (4),
    USER_SELECT_MENU:           (5),
    ROLE_SELECT_MENU:           (6),
    MENTIONABLE_SELECT_MENU:    (7),
    CHANNEL_SELECT_MENU:        (8)
};
module.exports.DEFAULT_MESSAGE_EXPIRY_SECONDS = 3600 * 6; // 6 hours
module.exports.DEFAULT_USER_EXPIRY_SECONDS = 3600 * 1; // 1 hour
module.exports.PERMISSIONS = {
    CREATE_INSTANT_INVITE:      (1n << 0n),
    KICK_MEMBERS:               (1n << 1n),
    BAN_MEMBERS:                (1n << 2n),
    ADMINISTRATOR:              (1n << 3n),
    MANAGE_CHANNELS:            (1n << 4n),
    MANAGE_GUILD:               (1n << 5n),
    ADD_REACTIONS:              (1n << 6n),
    VIEW_AUDIT_LOG:             (1n << 7n),
    PRIORITY_SPEAKER:           (1n << 8n),
    STREAM:                     (1n << 9n),
    VIEW_CHANNEL:               (1n << 10n),
    SEND_MESSAGES:              (1n << 11n),
    SEND_TTS_MESSAGES:          (1n << 12n),
    MANAGE_MESSAGES:            (1n << 13n),
    EMBED_LINKS:                (1n << 14n),
    ATTACH_FILES:               (1n << 15n),
    READ_MESSAGE_HISTORY:       (1n << 16n),
    MENTION_EVERYONE:           (1n << 17n),
    USE_EXTERNAL_EMOJIS:        (1n << 18n),
    VIEW_GUILD_INSIGHTS:        (1n << 19n),
    CONNECT:                    (1n << 20n),
    SPEAK:                      (1n << 21n),
    MUTE_MEMBERS:               (1n << 22n),
    DEAFEN_MEMBERS:             (1n << 23n),
    MOVE_MEMBERS:               (1n << 24n),
    USE_VAD:                    (1n << 25n),
    CHANGE_NICKNAME:            (1n << 26n),
    MANAGE_NICKNAMES:           (1n << 27n),
    MANAGE_ROLES:               (1n << 28n),
    MANAGE_WEBHOOKS:            (1n << 29n),
    MANAGE_EMOJIS:              (1n << 30n),
    USE_SLASH_COMMANDS:         (1n << 31n),
    REQUEST_TO_SPEAK:           (1n << 32n),
    MANAGE_THREADS:             (1n << 34n),
    USE_PUBLIC_THREADS:         (1n << 35n),
    USE_PRIVATE_THREADS:        (1n << 36n),
    USE_EXTERNAL_STICKERS:      (1n << 37n),
    SEND_MESSAGES_IN_THREADS:   (1n << 38n),
    USE_EMBEDDED_ACTIVITIES:    (1n << 39n),
    MODERATE_MEMBERS:           (1n << 40n)
};
module.exports.STICKER_FORMATS = [null, "PNG", "APNG", "LOTTIE"];
module.exports.STICKER_FORMATS_ENUM = {
    PNG: 1,
    APNG: 2,
    LOTTIE: 3
};
module.exports.WEBSOCKET_STATES = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
};