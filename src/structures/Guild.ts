import {
  AUDIT_LOG_TYPES,
  CDN_BASE_URL,
  GLUON_DEBUG_LEVELS,
  NAME,
  PERMISSIONS,
  TO_JSON_TYPES_ENUM,
} from "../constants.js";
import GuildChannelsManager from "../managers/GuildChannelsManager.js";
import GuildEmojisManager from "../managers/GuildEmojisManager.js";
import GuildInviteManager from "../managers/GuildInviteManager.js";
import GuildMemberManager from "../managers/GuildMemberManager.js";
import GuildRoleManager from "../managers/GuildRoleManager.js";
import GuildScheduledEventManager from "../managers/GuildScheduledEventManager.js";
import GuildVoiceStatesManager from "../managers/GuildVoiceStatesManager.js";
import cacheChannel from "../util/gluon/cacheChannel.js";
import checkPermission from "../util/discord/checkPermission.js";
import AuditLog from "./AuditLog.js";
import Emoji from "./Emoji.js";
import Invite from "./Invite.js";
import Member from "./Member.js";
import Role from "./Role.js";
import Thread from "./Thread.js";
import VoiceState from "./VoiceState.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Channel from "./Channel.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import util from "util";
import Message from "./Message.js";
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
class Guild implements GuildType {
  #_client;
  #_id;
  #unavailable;
  #name;
  #description;
  #_icon;
  #_owner_id;
  #joined_at;
  #member_count;
  #system_channel_id;
  #rules_channel_id;
  #preferred_locale;
  #_attributes;
  #premium_subscription_count;
  #_cacheOptions;
  #members;
  #channels;
  #voice_states;
  #roles;
  #emojis;
  #invites;
  #scheduled_events;
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
    { nocache = false } = { nocache: false },
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof nocache !== "boolean")
      throw new TypeError("GLUON: No cache must be a boolean");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The id of the guild.
     * @type {BigInt}
     * @private
     */
    this.#_id = BigInt(data.id);

    if ("unavailable" in data && data.unavailable == true) {
      this.#unavailable = true;

      const shouldCache = Guild.shouldCache(this.#_client._cacheOptions);

      if (nocache === false && shouldCache) {
        this.#_client.guilds.set(data.id, this);
        this.#_client._emitDebug(
          GLUON_DEBUG_LEVELS.INFO,
          `CACHE GUILD ${data.id} (UNAVAILABLE)`,
        );
      } else {
        this.#_client._emitDebug(
          GLUON_DEBUG_LEVELS.INFO,
          `NO CACHE GUILD ${data.id} (UNAVAILABLE) (${nocache} ${shouldCache})`,
        );
      }
      return;
    }

    const existing = this.#_client.guilds.get(data.id) || null;

    // needed for join/leave logging
    /**
     * The name of the guild.
     * @type {String}
     * @private
     */
    this.#name = data.name;
    if (this.#name === undefined && existing && existing.name)
      this.#name = existing.name;
    else if (!this.#name) this.#name = null;

    /**
     * The description of the guild.
     * @type {String?}
     * @private
     */
    if ("description" in data) {
      this.#description = data.description;
    }
    if (this.#description === undefined && existing && existing.description)
      this.#description = existing.description;
    else if (!this.#description) this.#description = null;

    /**
     * The guild icon hash.
     * @type {BigInt?}
     * @private
     */
    if (data.icon !== undefined)
      this.#_icon = data.icon
        ? BigInt(`0x${data.icon.replace("a_", "")}`)
        : null;
    else if (data.icon === undefined && existing && existing._icon)
      this.#_icon = existing._icon;

    /**
     * The id of the guild owner.
     * @type {BigInt}
     * @private
     */
    this.#_owner_id = BigInt(data.owner_id);

    if ("joined_at" in data && data.joined_at)
      /**
       * UNIX (seconds) timestamp for when the bot user was added to this guild.
       * @type {Number?}
       * @private
       */
      this.#joined_at = (new Date(data.joined_at).getTime() / 1000) | 0;
    else if (existing?.joinedAt) this.#joined_at = existing.joinedAt;

    if ("member_count" in data)
      /**
       * The member count of this guild.
       * @type {Number}
       * @private
       */
      this.#member_count = data.member_count;
    else if (existing?.memberCount) this.#member_count = existing.member_count;
    else this.#member_count = 2;

    /**
     * The voice state manager of this guild.
     * @type {GuildVoiceStatesManager}
     * @private
     */
    this.#voice_states = existing
      ? existing.voiceStates
      : // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
        new GuildVoiceStatesManager(this.#_client, data.voice_states);

    /**
     * The member manager of this guild.
     * @type {GuildMemberManager}
     * @private
     */
    this.#members = existing
      ? existing.members
      : new GuildMemberManager(this.#_client, this);

    /**
     * The channel manager of this guild.
     * @type {GuildChannelsManager}
     * @private
     */
    this.#channels = existing
      ? existing.channels
      : new GuildChannelsManager(this.#_client, this);

    /**
     * The role manager of this guild.
     * @type {GuildRoleManager}
     * @private
     */
    this.#roles = existing
      ? existing.roles
      : new GuildRoleManager(this.#_client, this);

    this.#scheduled_events = existing
      ? existing.scheduledEvents
      : new GuildScheduledEventManager(this.#_client, this);

    /**
     * The emoji manager of this guild.
     * @type {GuildEmojisManager}
     * @private
     */
    this.#emojis = existing
      ? existing.emojis
      : new GuildEmojisManager(this.#_client, this);

    /**
     * The invite manager of this guild.
     * @type {GuildInviteManager}
     * @private
     */
    this.#invites = existing
      ? existing.invites
      : new GuildInviteManager(this.#_client, this);

    /**
     * The system channel id of the guild.
     * @type {BigInt}
     * @private
     */
    if (data.system_channel_id !== undefined)
      this.#system_channel_id = data.system_channel_id
        ? BigInt(data.system_channel_id)
        : null;
    else if (
      data.system_channel_id === undefined &&
      existing &&
      existing.systemChannelId
    )
      this.#system_channel_id = BigInt(existing.systemChannelId);

    /**
     * The rules channel id of the guild.
     * @type {BigInt}
     * @private
     */
    if (data.rules_channel_id !== undefined)
      this.#rules_channel_id = data.rules_channel_id
        ? BigInt(data.rules_channel_id)
        : null;
    else if (
      data.rules_channel_id === undefined &&
      existing &&
      existing.rulesChannelId
    )
      this.#rules_channel_id = BigInt(existing.rulesChannelId);

    /**
     * The premium subscription count of the guild.
     * @type {Number}
     * @private
     */
    if (typeof data.premium_subscription_count == "number")
      this.#premium_subscription_count = data.premium_subscription_count;
    else if (
      typeof data.premium_subscription_count != "number" &&
      existing &&
      existing.premiumSubscriptionCount
    )
      this.#premium_subscription_count = existing.premiumSubscriptionCount;
    else this.#premium_subscription_count = 0;

    /**
     * The attributes of the guild.
     * @type {Number}
     * @private
     */
    this.#_attributes =
      "_attributes" in data ? data._attributes : data.system_channel_flags;

    if (
      ("mfa_level" in data && typeof data.mfa_level == "number") ||
      (existing && typeof existing.mfaLevel == "number")
    ) {
      const mfaLevel =
        "mfa_level" in data && typeof data.mfa_level == "number"
          ? data.mfa_level
          : existing.mfaLevel;
      switch (mfaLevel) {
        case 0:
          // none
          this.#_attributes |= 0b1 << 6;
          break;
        case 1:
          // elevated
          this.#_attributes |= 0b1 << 7;
          break;
        default:
          break;
      }
    }

    if (
      ("verification_level" in data &&
        typeof data.verification_level == "number") ||
      (existing && typeof existing.verificationLevel == "number")
    ) {
      const verificationLevel =
        "verification_level" in data &&
        typeof data.verification_level == "number"
          ? data.verification_level
          : existing.verificationLevel;
      switch (verificationLevel) {
        case 0:
          // none
          this.#_attributes |= 0b1 << 8;
          break;
        case 1:
          // low
          this.#_attributes |= 0b1 << 9;
          break;
        case 2:
          // medium
          this.#_attributes |= 0b1 << 10;
          break;
        case 3:
          // high
          this.#_attributes |= 0b1 << 11;
          break;
        case 4:
          // very high
          this.#_attributes |= 0b1 << 12;
          break;
        default:
          break;
      }
    }

    if (
      ("default_message_notifications" in data &&
        typeof data.default_message_notifications == "number") ||
      (existing && typeof existing.defaultMessageNotifications == "number")
    ) {
      const defaultMessageNotifications =
        "default_message_notifications" in data &&
        typeof data.default_message_notifications == "number"
          ? data.default_message_notifications
          : existing.defaultMessageNotifications;
      switch (defaultMessageNotifications) {
        case 0:
          // all messages
          this.#_attributes |= 0b1 << 13;
          break;
        case 1:
          // only mentions
          this.#_attributes |= 0b1 << 14;
          break;
        default:
          break;
      }
    }

    if (
      ("explicit_content_filter" in data &&
        typeof data.explicit_content_filter == "number") ||
      (existing && typeof existing.explicitContentFilter == "number")
    ) {
      const explicitContentFilter =
        "explicit_content_filter" in data &&
        typeof data.explicit_content_filter == "number"
          ? data.explicit_content_filter
          : existing.explicitContentFilter;
      switch (explicitContentFilter) {
        case 0:
          // disabled
          this.#_attributes |= 0b1 << 15;
          break;
        case 1:
          // members without roles
          this.#_attributes |= 0b1 << 16;
          break;
        case 2:
          // all members
          this.#_attributes |= 0b1 << 17;
          break;
        default:
          break;
      }
    }

    if (
      ("nsfw_level" in data && typeof data.nsfw_level == "number") ||
      (existing && typeof existing.nsfwLevel == "number")
    ) {
      const nsfwLevel =
        "nsfw_level" in data && typeof data.nsfw_level == "number"
          ? data.nsfw_level
          : existing.nsfwLevel;
      switch (nsfwLevel) {
        case 0:
          // default
          this.#_attributes |= 0b1 << 18;
          break;
        case 1:
          // explicit
          this.#_attributes |= 0b1 << 19;
          break;
        case 2:
          // safe
          this.#_attributes |= 0b1 << 20;
          break;
        case 3:
          // age restricted
          this.#_attributes |= 0b1 << 21;
          break;
        default:
          break;
      }
    }

    if (
      (data && typeof data.premium_tier == "number") ||
      (existing && typeof existing.premiumTier == "number")
    ) {
      const premiumTier =
        typeof data.premium_tier == "number"
          ? data.premium_tier
          : existing.premiumTier;
      switch (premiumTier) {
        case 0:
          // none
          this.#_attributes |= 0b1 << 22;
          break;
        case 1:
          // tier 1
          this.#_attributes |= 0b1 << 23;
          break;
        case 2:
          // tier 2
          this.#_attributes |= 0b1 << 24;
          break;
        case 3:
          // tier 3
          this.#_attributes |= 0b1 << 25;
          break;
        default:
          break;
      }
    }

    if (
      "premium_progress_bar_enabled" in data &&
      typeof data.premium_progress_bar_enabled == "boolean" &&
      data.premium_progress_bar_enabled == true
    )
      this.#_attributes |= 0b1 << 26;
    else if (
      existing &&
      typeof existing.premiumProgressBarEnabled == "boolean" &&
      existing.premiumProgressBarEnabled == true
    )
      this.#_attributes |= 0b1 << 26;

    /**
     * The locale of this guild, if set up as a community.
     * @type {String}
     * @private
     */
    this.#preferred_locale = data.preferred_locale;
    if (!this.#preferred_locale && existing && existing.preferredLocale)
      this.#preferred_locale = existing.preferredLocale;
    else if (!this.#preferred_locale) this.#preferred_locale = null;

    /**
     * The cache options for this guild.
     * @type {GuildCacheOptions}
     * @private
     */
    this.#_cacheOptions = new GuildCacheOptions(
      // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
      data._cacheOptions || this.#_client._defaultGuildCacheOptions.toJSON(),
    );

    const shouldCache = Guild.shouldCache(this.#_client._cacheOptions);

    if (nocache === false && shouldCache) {
      this.#_client.guilds.set(data.id, this);
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE GUILD ${data.id}`,
      );
    } else {
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE GUILD ${data.id} (${nocache} ${shouldCache})`,
      );
    }

    if (
      "members" in data &&
      Member.shouldCache(this.#_client._cacheOptions, this._cacheOptions) ===
        true
    )
      for (let i = 0; i < data.members.length; i++)
        new Member(this.#_client, data.members[i], {
          userId: data.members[i].user.id,
          guildId: data.id,
          nocache,
        });

    if (
      "channels" in data &&
      Channel.shouldCache(this.#_client._cacheOptions, this._cacheOptions) ===
        true
    )
      for (let i = 0; i < data.channels.length; i++)
        cacheChannel(this.#_client, data.channels[i], data.id, nocache);

    if (
      "threads" in data &&
      Thread.shouldCache(this.#_client._cacheOptions, this._cacheOptions) ===
        true
    )
      for (let i = 0; i < data.threads.length; i++)
        new Thread(this.#_client, data.threads[i], {
          guildId: data.id,
          nocache,
        });

    if (
      "voice_states" in data &&
      VoiceState.shouldCache(
        this.#_client._cacheOptions,
        this._cacheOptions,
      ) === true
    )
      for (let i = 0; i < data.voice_states.length; i++)
        new VoiceState(this.#_client, data.voice_states[i], {
          guildId: data.id,
          nocache,
        });

    if (
      data.roles &&
      Role.shouldCache(this.#_client._cacheOptions, this._cacheOptions) === true
    )
      for (let i = 0; i < data.roles.length; i++)
        new Role(this.#_client, data.roles[i], { guildId: data.id, nocache });

    if (
      data.emojis &&
      Emoji.shouldCache(this.#_client._cacheOptions, this._cacheOptions) ===
        true
    )
      for (let i = 0; i < data.emojis.length; i++)
        new Emoji(this.#_client, data.emojis[i], {
          guildId: data.id,
          nocache,
        });

    if (
      "invites" in data &&
      Invite.shouldCache(this.#_client._cacheOptions, this._cacheOptions) ===
        true
    )
      for (let i = 0; i < data.invites.length; i++)
        new Invite(this.#_client, data.invites[i], {
          guildId: data.id,
          nocache,
        });
  }

  /**
   * The id of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(this.#_id);
  }

  /**
   * The hash of the guild's icon, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalIconHash() {
    return this.#_icon
      ? // eslint-disable-next-line quotes
        `${this.#_formattedIconHash}`
      : null;
  }

  /**
   * The hash of the guild icon as a string.
   * @readonly
   * @type {String}
   * @private
   */
  get #_formattedIconHash() {
    if (!this.#_icon) return null;

    let formattedHash = this.#_icon.toString(16);

    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = `0${formattedHash}`;

    return formattedHash;
  }

  /**
   * The icon URL of the guild.
   * @readonly
   * @type {String?}
   * @public
   */
  get displayIconURL() {
    return Guild.getIcon(this.id, this._originalIconHash);
  }

  /**
   * The owner of the guild.
   * @type {Member}
   * @readonly
   * @public
   */
  get owner() {
    return this.members.get(this.ownerId);
  }

  /**
   * System channel flags.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
   * @readonly
   * @type {String[]}
   * @public
   */
  get systemChannelFlags() {
    const flags = [];

    if ((this.#_attributes & (0b1 << 0)) == 0b1 << 0)
      flags.push("SUPPRESS_JOIN_NOTIFICATIONS");
    if ((this.#_attributes & (0b1 << 1)) == 0b1 << 1)
      flags.push("SUPPRESS_PREMIUM_SUBSCRIPTIONS");
    if ((this.#_attributes & (0b1 << 2)) == 0b1 << 2)
      flags.push("SUPPRESS_GUILD_REMINDER_NOTIFICATIONS");
    if ((this.#_attributes & (0b1 << 3)) == 0b1 << 3)
      flags.push("SUPPRESS_JOIN_NOTIFICATION_REPLIES");
    if ((this.#_attributes & (0b1 << 4)) == 0b1 << 4)
      flags.push("SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS");
    if ((this.#_attributes & (0b1 << 5)) == 0b1 << 5)
      flags.push("SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES");

    return flags;
  }

  /**
   * Raw system channel flags.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawSystemChannelFlags() {
    let rawFlags = 0;

    if ((this.#_attributes & (0b1 << 0)) == 0b1 << 0) rawFlags |= 0b1 << 0;
    if ((this.#_attributes & (0b1 << 1)) == 0b1 << 1) rawFlags |= 0b1 << 1;
    if ((this.#_attributes & (0b1 << 2)) == 0b1 << 2) rawFlags |= 0b1 << 2;
    if ((this.#_attributes & (0b1 << 3)) == 0b1 << 3) rawFlags |= 0b1 << 3;
    if ((this.#_attributes & (0b1 << 4)) == 0b1 << 4) rawFlags |= 0b1 << 4;
    if ((this.#_attributes & (0b1 << 5)) == 0b1 << 5) rawFlags |= 0b1 << 5;

    return rawFlags;
  }

  /**
   * Server MFA level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
   * @readonly
   * @type {String}
   * @public
   */
  get mfaLevel() {
    if ((this.#_attributes & (0b1 << 6)) == 0b1 << 6) return "NONE";
    else if ((this.#_attributes & (0b1 << 7)) == 0b1 << 7) return "ELEVATED";
    else return null;
  }

  /**
   * Server MFA level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawMfaLevel() {
    if ((this.#_attributes & (0b1 << 6)) == 0b1 << 6) return 0;
    else if ((this.#_attributes & (0b1 << 7)) == 0b1 << 7) return 1;
    else return null;
  }

  /**
   * Server verification level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
   * @readonly
   * @type {String}
   * @public
   */
  get verificationLevel() {
    if ((this.#_attributes & (0b1 << 8)) == 0b1 << 8) return "NONE";
    else if ((this.#_attributes & (0b1 << 9)) == 0b1 << 9) return "LOW";
    else if ((this.#_attributes & (0b1 << 10)) == 0b1 << 10) return "MEDIUM";
    else if ((this.#_attributes & (0b1 << 11)) == 0b1 << 11) return "HIGH";
    else if ((this.#_attributes & (0b1 << 12)) == 0b1 << 12) return "VERY_HIGH";
    else return null;
  }

  /**
   * Server verification level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawVerificationLevel() {
    if ((this.#_attributes & (0b1 << 8)) == 0b1 << 8) return 0;
    else if ((this.#_attributes & (0b1 << 9)) == 0b1 << 9) return 1;
    else if ((this.#_attributes & (0b1 << 10)) == 0b1 << 10) return 2;
    else if ((this.#_attributes & (0b1 << 11)) == 0b1 << 11) return 3;
    else if ((this.#_attributes & (0b1 << 12)) == 0b1 << 12) return 4;
    else return null;
  }

  /**
   * Default notification setting.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
   * @readonly
   * @type {String}
   * @public
   */
  get defaultMessageNotifications() {
    if ((this.#_attributes & (0b1 << 13)) == 0b1 << 13) return "ALL_MESSAGES";
    else if ((this.#_attributes & (0b1 << 14)) == 0b1 << 14)
      return "ONLY_MENTIONS";
    else return null;
  }

  /**
   * Default notification setting.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawDefaultMessageNotifications() {
    if ((this.#_attributes & (0b1 << 13)) == 0b1 << 13) return 0;
    else if ((this.#_attributes & (0b1 << 14)) == 0b1 << 14) return 1;
    else return null;
  }

  /**
   * Explicit content filter level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
   * @readonly
   * @type {String}
   * @public
   */
  get explicitContentFilter() {
    if ((this.#_attributes & (0b1 << 15)) == 0b1 << 15) return "DISABLED";
    else if ((this.#_attributes & (0b1 << 16)) == 0b1 << 16)
      return "MEMBERS_WITHOUT_ROLES";
    else if ((this.#_attributes & (0b1 << 17)) == 0b1 << 17)
      return "ALL_MEMBERS";
    else return null;
  }

  /**
   * Explicit content filter level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawExplicitContentFilter() {
    if ((this.#_attributes & (0b1 << 15)) == 0b1 << 15) return 0;
    else if ((this.#_attributes & (0b1 << 16)) == 0b1 << 16) return 1;
    else if ((this.#_attributes & (0b1 << 17)) == 0b1 << 17) return 2;
    else return null;
  }

  /**
   * Server NSFW level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
   * @readonly
   * @type {String}
   * @public
   */
  get nsfwLevel() {
    if ((this.#_attributes & (0b1 << 18)) == 0b1 << 18) return "DEFAULT";
    else if ((this.#_attributes & (0b1 << 19)) == 0b1 << 19) return "EXPLICIT";
    else if ((this.#_attributes & (0b1 << 20)) == 0b1 << 20) return "SAFE";
    else if ((this.#_attributes & (0b1 << 21)) == 0b1 << 21)
      return "AGE_RESTRICTED";
    else return null;
  }

  /**
   * Server NSFW level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
   * @readonly
   * @type {Number}
   * @public
   */
  get rawNsfwLevel() {
    if ((this.#_attributes & (0b1 << 18)) == 0b1 << 18) return 0;
    else if ((this.#_attributes & (0b1 << 19)) == 0b1 << 19) return 1;
    else if ((this.#_attributes & (0b1 << 20)) == 0b1 << 20) return 2;
    else if ((this.#_attributes & (0b1 << 21)) == 0b1 << 21) return 3;
    else return null;
  }

  /**
   * Server boost level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier}
   * @readonly
   * @public
   */
  get premiumTier() {
    if ((this.#_attributes & (0b1 << 22)) == 0b1 << 22) return 0;
    else if ((this.#_attributes & (0b1 << 23)) == 0b1 << 23) return 1;
    else if ((this.#_attributes & (0b1 << 24)) == 0b1 << 24) return 2;
    else if ((this.#_attributes & (0b1 << 25)) == 0b1 << 25) return 3;
    else return null;
  }

  /**
   * Whether the guild has the boost progress bar enabled.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get premiumProgressBarEnabled() {
    return (this.#_attributes & (0b1 << 26)) == 0b1 << 26;
  }

  /**
   * Whether the guild is unavailable.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get unavailable() {
    return this.#unavailable ?? false;
  }

  /**
   * The name of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return this.#name;
  }

  /**
   * The description of the guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get description() {
    return this.#description;
  }

  /**
   * The icon hash of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get ownerId() {
    return String(this.#_owner_id);
  }

  /**
   * The id of the guild owner.
   * @type {Number}
   * @readonly
   * @public
   */
  get joinedAt() {
    return this.#joined_at;
  }

  /**
   * The member count of the guild.
   * @type {Number}
   * @readonly
   * @public
   */
  get memberCount() {
    return this.#member_count;
  }

  /**
   * The system channel id of the guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get systemChannelId() {
    return this.#system_channel_id ? String(this.#system_channel_id) : null;
  }

  /**
   * The system channel of the guild.
   * @type {TextChannel?}
   * @readonly
   * @public
   */
  get systemChannel() {
    return this.systemChannelId
      ? this.channels.get(this.systemChannelId)
      : null;
  }

  /**
   * The rules channel id of the guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get rulesChannelId() {
    return this.#rules_channel_id ? String(this.#rules_channel_id) : null;
  }

  /**
   * The rules channel of the guild.
   * @type {TextChannel?}
   * @readonly
   * @public
   */
  get rulesChannel() {
    return this.rulesChannelId ? this.channels.get(this.rulesChannelId) : null;
  }

  /**
   * The preferred locale of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get preferredLocale() {
    return this.#preferred_locale;
  }

  /**
   * The premium subscription count of the guild.
   * @type {Number}
   * @readonly
   * @public
   */
  get premiumSubscriptionCount() {
    return this.#premium_subscription_count;
  }

  /**
   * The cache options for this guild.
   * @type {GuildCacheOptions}
   * @readonly
   * @public
   */
  get _cacheOptions() {
    return this.#_cacheOptions;
  }

  /**
   * The members in the guild.
   * @type {GuildMemberManager}
   * @readonly
   * @public
   */
  get members() {
    return this.#members;
  }

  /**
   * The channels in the guild.
   * @type {GuildChannelsManager}
   * @readonly
   * @public
   */
  get channels() {
    return this.#channels;
  }

  /**
   * The voice states in the guild.
   * @type {GuildVoiceStatesManager}
   * @readonly
   * @public
   */
  get voiceStates() {
    return this.#voice_states;
  }

  /**
   * The roles in the guild.
   * @type {GuildRoleManager}
   * @readonly
   * @public
   */
  get roles() {
    return this.#roles;
  }

  /**
   * The scheduled events in the guild.
   * @type {GuildScheduledEventManager}
   * @readonly
   * @public
   */
  get scheduledEvents() {
    return this.#scheduled_events;
  }

  /**
   * The emojis in the guild.
   * @type {GuildEmojisManager}
   * @readonly
   * @public
   */
  get emojis() {
    return this.#emojis;
  }

  /**
   * The invites in the guild.
   * @type {GuildInviteManager}
   * @readonly
   * @public
   */
  get invites() {
    return this.#invites;
  }

  /**
   * Increases the member count of the guild.
   * @method
   * @public
   */
  _incrementMemberCount() {
    this.#member_count++;
  }

  /**
   * Decreases the member count of the guild.
   * @method
   * @public
   */
  _decrementMemberCount() {
    this.#member_count--;
  }

  /**
   * Returns the client member for this guild.
   * @returns {Promise<Member>}
   * @public
   * @async
   * @method
   * @throws {Error}
   */
  async me() {
    const cached = this.members.get(this.#_client.user.id);

    if (cached) return cached;

    return this.members.fetch(this.#_client.user.id);
  }

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
  async ban(user_id: any, { reason, seconds }: any = {}) {
    if (
      !checkPermission((await this.me()).permissions, PERMISSIONS.BAN_MEMBERS)
    )
      throw new Error("MISSING PERMISSIONS: BAN_MEMBERS");

    if (typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");

    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: reason");

    if (typeof reason === "string" && reason.length > 512)
      throw new RangeError("GLUON: VALUE_OUT_OF_RANGE: reason");

    if (typeof seconds !== "undefined" && typeof seconds !== "number")
      throw new TypeError("GLUON: INVALID_TYPE: seconds");

    if (typeof seconds === "number" && (seconds < 0 || seconds > 604800))
      throw new RangeError("GLUON: VALUE_OUT_OF_RANGE: seconds");

    const body = {};

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    // number of seconds to delete messages for (0-604800)
    // @ts-expect-error TS(2339): Property 'delete_message_seconds' does not exist o... Remove this comment to see the full error message
    if (seconds) body.delete_message_seconds = seconds;

    await this.#_client.request.makeRequest(
      "putCreateGuildBan",
      [this.id, user_id],
      body,
    );
  }

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
  async unban(user_id: any, { reason }: any = {}) {
    if (
      !checkPermission((await this.me()).permissions, PERMISSIONS.BAN_MEMBERS)
    )
      throw new Error("MISSING PERMISSIONS: BAN_MEMBERS");

    if (typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");

    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: reason");

    if (typeof reason === "string" && reason.length > 512)
      throw new RangeError("GLUON: VALUE_OUT_OF_RANGE: reason");

    const body = {};

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;

    await this.#_client.request.makeRequest(
      "deleteRemoveGuildBan",
      [this.id, user_id],
      body,
    );
  }

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
  async kick(user_id: any, { reason }: any = {}) {
    if (
      !checkPermission((await this.me()).permissions, PERMISSIONS.KICK_MEMBERS)
    )
      throw new Error("MISSING PERMISSIONS: KICK_MEMBERS");

    if (typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");

    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: reason");

    if (typeof reason === "string" && reason.length > 512)
      throw new RangeError("GLUON: VALUE_OUT_OF_RANGE: reason");

    const body = {};

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;

    await this.#_client.request.makeRequest(
      "deleteGuildMember",
      [this.id, user_id],
      body,
    );
  }

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
  async removeMemberRole(user_id: any, role_id: any, { reason }: any = {}) {
    if (
      !checkPermission((await this.me()).permissions, PERMISSIONS.MANAGE_ROLES)
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_ROLES");

    if (typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");

    if (typeof role_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: role_id");

    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: reason");

    if (typeof reason === "string" && reason.length > 512)
      throw new RangeError("GLUON: VALUE_OUT_OF_RANGE: reason");

    const body = {};

    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;

    await this.#_client.request.makeRequest(
      "deleteRemoveMemberRole",
      [this.id, user_id, role_id],
      body,
    );
  }

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
  async fetchAuditLogs({ limit, type, user_id, before, after }: any = {}) {
    if (
      !checkPermission(
        (await this.me()).permissions,
        PERMISSIONS.VIEW_AUDIT_LOG,
      )
    )
      throw new Error("MISSING PERMISSIONS: VIEW_AUDIT_LOG");

    if (typeof limit !== "undefined" && typeof limit !== "number")
      throw new TypeError("GLUON: INVALID_TYPE: limit");

    if (typeof limit === "number" && (limit < 1 || limit > 100))
      throw new RangeError("GLUON: VALUE_OUT_OF_RANGE: limit");

    if (typeof type !== "undefined" && typeof type !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: type");

    if (typeof user_id !== "undefined" && typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");

    if (typeof before !== "undefined" && typeof before !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: before");

    if (typeof after !== "undefined" && typeof after !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: after");

    const body = {};

    // @ts-expect-error TS(2339): Property 'limit' does not exist on type '{}'.
    if (limit) body.limit = limit;
    // @ts-expect-error TS(2339): Property 'limit' does not exist on type '{}'.
    else body.limit = 1;

    // @ts-expect-error TS(2339): Property 'action_type' does not exist on type '{}'... Remove this comment to see the full error message
    if (type) body.action_type = AUDIT_LOG_TYPES[type];

    // @ts-expect-error TS(2339): Property 'user_id' does not exist on type '{}'.
    if (user_id) body.user_id = user_id;

    // @ts-expect-error TS(2339): Property 'before' does not exist on type '{}'.
    if (before) body.before = before;

    // @ts-expect-error TS(2339): Property 'after' does not exist on type '{}'.
    if (after) body.after = after;

    const data = await this.#_client.request.makeRequest(
      "getGuildAuditLog",
      [this.id],
      body,
    );

    if (
      type &&
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      AUDIT_LOG_TYPES[type] &&
      data &&
      data.audit_log_entries[0] &&
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      data.audit_log_entries[0].action_type != AUDIT_LOG_TYPES[type]
    )
      return null;

    if (!data || data.audit_log_entries.length == 0) return null;

    return data.audit_log_entries.map(
      (e: any) =>
        new AuditLog(this.#_client, e, {
          users: data.users,
          guildId: this.id,
        }),
    );
  }

  /**
   * Fetches the guild invites.
   * @returns {Promise<Object[]?>}
   * @async
   * @public
   * @method
   * @throws {Error}
   */
  async fetchInvites() {
    if (
      !checkPermission((await this.me()).permissions, PERMISSIONS.MANAGE_GUILD)
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_GUILD");

    return this.#_client.request.makeRequest("getGuildInvites", [this.id]);
  }

  /**
   * Fetches all the guild channels.
   * @returns {Promise<Array<TextChannel | VoiceState>>}
   * @async
   * @public
   * @method
   * @throws {Error}
   */
  async fetchChannels() {
    const data = await this.#_client.request.makeRequest("getGuildChannels", [
      this.id,
    ]);

    const channels = [];
    for (let i = 0; i < data.length; i++)
      channels.push(cacheChannel(this.#_client, data[i], this.id));

    return channels;
  }

  /**
   * Fetches the ban for the provided user id.
   * @param {String} user_id The id of the user to fetch the ban of.
   * @returns {Promise<Object?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  async fetchBan(user_id: any) {
    if (
      !checkPermission((await this.me()).permissions, PERMISSIONS.BAN_MEMBERS)
    )
      throw new Error("MISSING PERMISSIONS: BAN_MEMBERS");

    if (typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");

    return this.#_client.request.makeRequest("getGuildBan", [this.id, user_id]);
  }

  /**
   * Leaves the guild.
   * @returns {Promise<void?>}
   * @async
   * @public
   * @method
   * @throws {Error}
   */
  async leave() {
    await this.#_client.request.makeRequest("deleteLeaveGuild", [this.id]);
  }

  /**
   * Calculates the number of messages that should be cached per channel for this guild.
   * @returns {Number}
   * @public
   * @method
   */
  calculateMessageCacheCount() {
    const x = (this.memberCount < 500000 ? this.memberCount : 499999) / 500000;
    /* creates an "S-Curve" for how many messages should be cached */
    /* more members => assume more activity => therefore more messages to be cached */
    /* minimum of 50 messages to be cached, and a maximum of 1000 */
    /* having greater than 500000 members has no effect */
    const shouldCacheCount =
      Math.floor((1 / (1 + Math.pow(x / (1 - x), -2))) * 1000) + 50;

    return shouldCacheCount;
  }

  /**
   * Calculates the number of members that should be cached for this guild.
   * @returns {Number}
   * @public
   * @method
   */
  calculateMemberCacheCount() {
    const x = this.memberCount < 500000 ? this.memberCount : 499999;
    /* creates a slope for how many members should stay cached */
    /* more members => smaller percentage of users active => a smaller percentage of users should be cached */
    /* a maximum of 500 seems suitable */
    const shouldCacheCount = Math.floor(0.5 * Math.exp((-x + 1) / 500000) * x);

    return shouldCacheCount;
  }

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
  static async deleteWebhook(client: ClientType, webhookId: any) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof webhookId !== "string")
      throw new TypeError("GLUON: Webhook ID is not a string.");
    await client.request.makeRequest("deleteWebhook", [webhookId]);
  }

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
    { name = NAME } = { name: NAME },
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");
    if (typeof name !== "string")
      throw new TypeError("GLUON: Name must be a string.");

    const body = {};

    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    body.name = name;

    return client.request.makeRequest("postCreateWebhook", [channelId], body);
  }

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
    { channelId }: any = {},
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof webhookId !== "string")
      throw new TypeError("GLUON: Webhook ID is not a string.");
    if (typeof channelId !== "string")
      throw new TypeError("GLUON: Channel ID is not a string.");

    const body = {};

    // @ts-expect-error TS(2339): Property 'channel_id' does not exist on type '{}'.
    body.channel_id = channelId;

    return client.request.makeRequest("patchModifyWebhook", [webhookId], body);
  }

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
  static fetchWebhook(client: ClientType, webhookId: any) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof webhookId !== "string")
      throw new TypeError("GLUON: Webhook ID is not a string.");
    return client.request.makeRequest("getWebhook", [webhookId]);
  }

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
  static async postWebhook(
    client: ClientType,
    { id, token }: any,
    { content, embeds, components, files }: any = {},
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof id !== "string")
      throw new TypeError("GLUON: Webhook ID is not a string.");
    if (typeof token !== "string")
      throw new TypeError("GLUON: Webhook token is not a string.");

    Message.sendValidation({ content, embeds, components, files });

    const body = {};

    // @ts-expect-error TS(2339): Property 'content' does not exist on type '{}'.
    if (content) body.content = content;
    // @ts-expect-error TS(2339): Property 'embeds' does not exist on type '{}'.
    if (embeds) body.embeds = embeds;
    // @ts-expect-error TS(2339): Property 'components' does not exist on type '{}'.
    if (components) body.components;
    // @ts-expect-error TS(2339): Property 'files' does not exist on type '{}'.
    if (files) body.files = files;

    await client.request.makeRequest("postExecuteWebhook", [id, token], body);
  }

  /**
   * Returns the icon URL of the guild.
   * @param {String} id The id of the guild.
   * @param {String?} hash The hash of the guild icon.
   * @returns {String}
   * @public
   * @static
   * @method
   */
  static getIcon(id: any, hash: any) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Guild id must be a string.");
    if (hash && typeof hash !== "string")
      throw new TypeError("GLUON: Guild icon hash must be a string.");
    return hash
      ? `${CDN_BASE_URL}/icons/${id}/${hash}.${
          hash.startsWith("a_") ? "gif" : "png"
        }`
      : null;
  }

  /**
   * @method
   * @public
   */
  _intervalCallback() {
    this.#voice_states._intervalCallback();
    this.#members._intervalCallback();
    this.#channels._intervalCallback();
    this.#roles._intervalCallback();
    this.#scheduled_events._intervalCallback();
    this.#emojis._intervalCallback();
    this.#invites._intervalCallback();
    this.#channels.forEach((c: any) => c.messages?._intervalCallback());
  }

  /**
   * Determines whether the emoji should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions: any) {
    if (!(gluonCacheOptions instanceof GluonCacheOptions))
      throw new TypeError(
        "GLUON: Gluon cache options must be a GluonCacheOptions.",
      );
    if (gluonCacheOptions.cacheGuilds === false) return false;
    return true;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Guild: ${this.id}>`;
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
   * @public
   * @method
   */
  toJSON(format: TO_JSON_TYPES_ENUM) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        return {
          id: this.id,
          name: this.name,
          icon: this._originalIconHash,
          owner_id: this.ownerId,
          joined_at: this.joinedAt * 1000,
          unavailable: this.unavailable,
          member_count: this.memberCount,
          premium_tier: this.premiumTier,
          preferred_locale: this.preferredLocale,
          _cache_options: this._cacheOptions,
          _attributes: this.#_attributes,
          system_channel_id: this.systemChannelId ?? null,
          rules_channel_id: this.rulesChannelId ?? null,
          premium_subscription_count: this.premiumSubscriptionCount,
          members: this.members.toJSON(format),
          channels: this.channels.toJSON(format),
          voice_states: this.voiceStates.toJSON(format),
          roles: this.roles.toJSON(format),
          emojis: this.emojis.toJSON(format),
          invites: this.invites.toJSON(format),
        };
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          name: this.name,
          icon: this._originalIconHash,
          owner_id: this.ownerId,
          joined_at: new Date(this.joinedAt * 1000).toISOString(),
          premium_tier: this.premiumTier,
          unavailable: this.unavailable,
          member_count: this.memberCount,
          preferred_locale: this.preferredLocale,
          system_channel_flags: this.rawSystemChannelFlags,
          system_channel_id: this.systemChannelId ?? null,
          rules_channel_id: this.rulesChannelId ?? null,
          premium_subscription_count: this.premiumSubscriptionCount,
          premium_progress_bar_enabled: this.premiumProgressBarEnabled,
          default_message_notifications: this.rawDefaultMessageNotifications,
          explicit_content_filter: this.rawExplicitContentFilter,
          verification_level: this.rawVerificationLevel,
          nsfw_level: this.rawNsfwLevel,
          mfa_level: this.rawMfaLevel,
          members: this.members.toJSON(format),
          channels: this.channels.toJSON(format),
          voice_states: this.voiceStates.toJSON(format),
          roles: this.roles.toJSON(format),
          emojis: this.emojis.toJSON(format),
          invites: this.invites.toJSON(format),
        };
      }
    }
  }
}

export default Guild;
