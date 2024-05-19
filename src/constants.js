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
    AUTO_MODERATION_EXECUTION:  (1 << 21),
    GUILD_MESSAGE_POLLS:        (1 << 24),
    DIRECT_MESSAGE_POLLS:       (1 << 25)
};
module.exports.CALCULATED_INTENTS = this.INTENTS.GUILDS |
                                    this.INTENTS.GUILD_MEMBERS |
                                    this.INTENTS.GUILD_BANS |
                                    this.INTENTS.GUILD_INVITES |
                                    this.INTENTS.GUILD_VOICE_STATES |
                                    this.INTENTS.GUILD_MESSAGES |
                                    this.INTENTS.MESSAGE_CONTENT |
                                    this.INTENTS.GUILD_MESSAGE_POLLS;
module.exports.EVENTS = {
    READY:                          ("ready"),
    GUILD_CREATE:                   ("guildCreate"),
    GUILD_DELETE:                   ("guildDelete"),
    GUILD_UPDATE:                   ("guildUpdate"),
    MESSAGE_CREATE:                 ("messageCreate"),
    MESSAGE_UPDATE:                 ("messageUpdate"),
    MESSAGE_DELETE:                 ("messageDelete"),
    MESSAGE_DELETE_BULK:            ("messageDeleteBulk"),
    GUILD_AUDIT_LOG_ENTRY_CREATE:   ("guildAuditLogEntryCreate"),
    GUILD_BAN_ADD:                  ("guildBanAdd"),
    GUILD_BAN_REMOVE:               ("guildBanRemove"),
    GUILD_MEMBER_ADD:               ("guildMemberAdd"),
    GUILD_MEMBER_UPDATE:            ("guildMemberUpdate"),
    GUILD_MEMBER_REMOVE:            ("guildMemberRemove"),
    BUTTON_CLICK:                   ("buttonClick"),
    MENU_SELECT:                    ("menuSelect"),
    SLASH_COMMAND:                  ("slashCommand"),
    VOICE_STATE_UPDATE:             ("voiceStateUpdate"),
    VOICE_CHANNEL_STATUS_UPDATE:    ("voiceChannelStatusUpdate"),
    CHANNEL_CREATE:                 ("channelCreate"),
    CHANNEL_UPDATE:                 ("channelUpdate"),
    CHANNEL_DELETE:                 ("channelDelete"),
    CHANNEL_PINS_UPDATE:            ("channelPinsUpdate"),
    THREAD_CREATE:                  ("threadCreate"),
    THREAD_UPDATE:                  ("threadUpdate"),
    THREAD_DELETE:                  ("threadDelete"),
    THREAD_LIST_SYNC:               ("threadListSync"),
    INVITE_CREATE:                  ("inviteCreate"),
    INVITE_DELETE:                  ("inviteDelete"),
    GUILD_ROLE_CREATE:              ("roleCreate"),
    GUILD_ROLE_UPDATE:              ("roleUpdate"),
    GUILD_ROLE_DELETE:              ("roleDelete"),
    GUILD_EMOJI_CREATE:             ("emojiCreate"),
    GUILD_EMOJI_UPDATE:             ("emojiUpdate"),
    GUILD_EMOJI_DELETE:             ("emojiDelete"),
    ENTITLEMENT_CREATE:             ("entitlementCreate"),
    ENTITLEMENT_UPDATE:             ("entitlementUpdate"),
    ENTITLEMENT_DELETE:             ("entitlementDelete"),
    GUILD_SCHEDULED_EVENT_CREATE:   ("guildScheduledEventCreate"),
    GUILD_SCHEDULED_EVENT_UPDATE:   ("guildScheduledEventUpdate"),
    GUILD_SCHEDULED_EVENT_DELETE:   ("guildScheduledEventDelete"),
    GUILD_SCHEDULED_EVENT_USER_ADD: ("guildScheduledEventUserAdd"),
    GUILD_SCHEDULED_EVENT_USER_REMOVE: ("guildScheduledEventUserRemove"),
    INITIALISED:                    ("initialised"),
    MESSAGE_POLL_VOTE_ADD:          ("messagePollVoteAdd"),
    MESSAGE_POLL_VOTE_REMOVE:       ("messagePollVoteRemove"),
    MESSAGE_REACTION_REMOVE:        ("messageReactionRemove")
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
module.exports.MEMBER_FLAGS = {
    DID_REJOIN:                 (1 << 0),
    COMPLETED_ONBOARDING:       (1 << 1),
    BYPASSES_VERIFICATION:      (1 << 2),
    STARTED_ONBOARDING:         (1 << 3)
};
module.exports.AUDIT_LOG_TYPES = {
    GUILD_UPDATE:               (1),
    CHANNEL_CREATE:             (10),
    CHANNEL_UPDATE:             (11),
    CHANNEL_DELETE:             (12),
    CHANNEL_OVERWRITE_CREATE:   (13),
    CHANNEL_OVERWRITE_UPDATE:   (14),
    CHANNEL_OVERWRITE_DELETE:   (15),
    MEMBER_KICK:                (20),
    MEMBER_PRUNE:               (21),
    MEMBER_BAN_ADD:             (22),
    MEMBER_BAN_REMOVE:          (23),
    MEMBER_UPDATE:              (24),
    MEMBER_ROLE_UPDATE:         (25),
    MEMBER_MOVE:                (26),
    MEMBER_DISCONNECT:          (27),
    BOT_ADD:                    (28),
    ROLE_CREATE:                (30),
    ROLE_UPDATE:                (31),
    ROLE_DELETE:                (32),
    INVITE_CREATE:              (40),
    INVITE_UPDATE:              (41),
    INVITE_DELETE:              (42),
    WEBHOOK_CREATE:             (50),
    WEBHOOK_UPDATE:             (51),
    WEBHOOK_DELETE:             (52),
    EMOJI_CREATE:               (60),
    EMOJI_UPDATE:               (61),
    EMOJI_DELETE:               (62),
    MESSAGE_DELETE:             (72),
    MESSAGE_BULK_DELETE:        (73),
    MESSAGE_PIN:                (74),
    MESSAGE_UNPIN:              (75),
    INTEGRATION_CREATE:         (80),
    INTEGRATION_UPDATE:         (81),
    INTEGRATION_DELETE:         (82),
    STAGE_INSTANCE_CREATE:      (83),
    STAGE_INSTANCE_UPDATE:      (84),
    STAGE_INSTANCE_DELETE:      (85),
    STICKER_CREATE:             (90),
    STICKER_UPDATE:             (91),
    STICKER_DELETE:             (92),
    GUILD_SCHEDULED_EVENT_CREATE: (100),
    GUILD_SCHEDULED_EVENT_UPDATE: (101),
    GUILD_SCHEDULED_EVENT_DELETE: (102),
    THREAD_CREATE:              (110),
    THREAD_UPDATE:              (111),
    THREAD_DELETE:              (112),
    APPLICATION_COMMAND_PERMISSION_UPDATE: (121),
    AUTO_MODERATION_RULE_CREATE: (140),
    AUTO_MODERATION_RULE_UPDATE: (141),
    AUTO_MODERATION_RULE_DELETE: (142),
    AUTO_MODERATION_BLOCK_MESSAGE: (143),
    AUTO_MODERATION_FLAG_TO_CHANNEL: (144),
    AUTO_MODERATION_USER_COMMUNICATION_DISABLED: (145),
    CREATOR_MONETIZATION_REQUEST_CREATED: (150),
    CREATOR_MONETIZATION_TERMS_ACCEPTED: (151),
    VOICE_CHANNEL_STATUS_UPDATE: (192)
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
module.exports.APPLICATION_COMMAND_TYPES = {
    CHAT_INPUT:                 (1),
    USER:                       (2),
    MESSAGE:                    (3)
};
module.exports.APPLICATION_COMMAND_OPTION_TYPES = {
    SUB_COMMAND:                (1),
    SUB_COMMAND_GROUP:          (2),
    STRING:                     (3),
    INTEGER:                    (4),
    BOOLEAN:                    (5),
    USER:                       (6),
    CHANNEL:                    (7),
    ROLE:                       (8),
    MENTIONABLE:                (9),
    NUMBER:                     (10),
    ATTACHMENT:                 (11)
};
module.exports.DEFAULT_MESSAGE_EXPIRY_SECONDS = 3600 * 12; // 12 hours
module.exports.DEFAULT_USER_EXPIRY_SECONDS = 3600 * 1; // 1 hour
module.exports.DEFAULT_CACHE_CHECK_PERIOD = 3600 * 1 * 1000; // 1 hour, in MILLISECONDS
module.exports.DEFAULT_INCREASE_CACHE_BY = 28;
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
    MODERATE_MEMBERS:           (1n << 40n),
    VIEW_CREATOR_MONETIZATION_ANALYTICS: (1n << 41n),
    USE_SOUNDBOARD:             (1n << 42n),
    CREATE_GUILD_EXPRESSIONS:   (1n << 43n),
    CREATE_EVENTS:              (1n << 44n),
    USE_EXTERNAL_SOUNDS:        (1n << 45n),
    SEND_VOICE_MESSAGES:        (1n << 46n),
    SEND_POLLS:                 (1n << 49n)
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
module.exports.GLUON_CACHING_OPTIONS = {
    NO_MESSAGES:        (1 << 0),
    FILES_ONLY:         (1 << 1),
    NO_VOICE_STATE:     (1 << 2)
};
module.exports.AUTO_MODERATION_TRIGGER_TYPES = {
    KEYWORD:            (1),
    SPAM:               (3),
    KEYWORD_PRESET:     (4),
    MENTION_SPAM:       (5)
};
module.exports.AUTO_MODERATION_EVENT_TYPES = {
    MESSAGE_SEND:       (1)
};
module.exports.AUTO_MODERATION_KEYWORD_PRESET_TYPES = {
    PROFANITY:          (1),
    SEXUAL_CONTENT:     (2),
    SLURS:              (3)
};
module.exports.AUTO_MODERATION_ACTION_TYPES = {
    BLOCK_MESSAGE:      (1),
    SEND_ALERT_MESSAGE: (2),
    TIMEOUT:            (3)
};
module.exports.GATEWAY_RECONNECT_CLOSE_CODES = [4000, 4001, 4002, 4003, 4005, 4007, 4008, 4009];