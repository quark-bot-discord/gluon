import { AUDIT_LOG_TYPES, PERMISSIONS } from "../constants.js";
import GuildChannelsManager from "../managers/GuildChannelsManager.js";
import GuildEmojisManager from "../managers/GuildEmojisManager.js";
import GuildInviteManager from "../managers/GuildInviteManager.js";
import GuildMemberManager from "../managers/GuildMemberManager.js";
import GuildRoleManager from "../managers/GuildRoleManager.js";
import GuildScheduledEventManager from "../managers/GuildScheduledEventManager.js";
import GuildVoiceStatesManager from "../managers/GuildVoiceStatesManager.js";
import cacheChannel from "../util/gluon/cacheChannel.js";
import checkPermission from "../util/discord/checkPermission.js";
import getGuildIcon from "../util/image/getGuildIcon.js";
import AuditLog from "./AuditLog.js";
import Emoji from "./Emoji.js";
import Invite from "./Invite.js";
import Member from "./Member.js";
import Role from "./Role.js";
import Thread from "./Thread.js";
import VoiceState from "./VoiceState.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";

/**
 * Represents a Discord guild.
 * @see {@link https://discord.com/developers/docs/resources/guild}
 */
class Guild {
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
  /**
   * Creates the structure for a guild.
   * @param {Client} client The client instance.
   * @param {Object} data Raw guild data.
   * @param {Boolean?} nocache Whether this guild should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object}
   */
  constructor(client, data, { nocache = false } = { nocache: false }) {
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

    if (data.unavailable == true) {
      this.#unavailable = true;

      if (nocache == false && this.#_client.cacheGuilds == true)
        this.#_client.guilds.set(data.id, this);
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
    this.#description = data.description;
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

    if (data.joined_at)
      /**
       * UNIX (seconds) timestamp for when the bot user was added to this guild.
       * @type {Number?}
       * @private
       */
      this.#joined_at = (new Date(data.joined_at).getTime() / 1000) | 0;
    else if (existing?.joinedAt) this.#joined_at = existing.joinedAt;

    if (data.member_count)
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
      : new GuildVoiceStatesManager(this.#_client, data.voice_states);

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

    this.scheduled_events = existing
      ? existing.scheduled_events
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
    this.#_attributes = data._attributes ?? data.system_channel_flags;

    if (
      typeof data.mfa_level == "number" ||
      (existing && typeof existing.mfaLevel == "number")
    ) {
      const mfaLevel =
        typeof data.mfa_level == "number" ? data.mfa_level : existing.mfaLevel;
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
      typeof data.verification_level == "number" ||
      (existing && typeof existing.verificationLevel == "number")
    ) {
      const verificationLevel =
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
      typeof data.default_message_notifications == "number" ||
      (existing && typeof existing.defaultMessageNotifications == "number")
    ) {
      const defaultMessageNotifications =
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
      typeof data.explicit_content_filter == "number" ||
      (existing && typeof existing.explicitContentFilter == "number")
    ) {
      const explicitContentFilter =
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
      typeof data.nsfw_level == "number" ||
      (existing && typeof existing.nsfwLevel == "number")
    ) {
      const nsfwLevel =
        typeof data.nsfw_level == "number"
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
    this.#_cacheOptions = new GuildCacheOptions(data._cacheOptions);

    if (nocache == false && this.#_client.cacheGuilds == true)
      this.#_client.guilds.set(data.id, this);

    if (data.members)
      for (
        let i = 0;
        i < data.members.length && this.#_client.cacheMembers == true;
        i++
      )
        new Member(this.#_client, data.members[i], {
          user_id: data.members[i].user.id,
          guild_id: data.id,
          user: data.members[i].user,
          nocache,
        });

    if (data.channels)
      for (
        let i = 0;
        i < data.channels.length && this.#_client.cacheChannels == true;
        i++
      )
        cacheChannel(this.#_client, data.channels[i], data.id, nocache);

    if (data.threads)
      for (
        let i = 0;
        i < data.threads.length && this.#_client.cacheChannels == true;
        i++
      )
        new Thread(this.#_client, data.threads[i], {
          guild_id: data.id,
          nocache,
        });

    if (data.voice_states)
      for (
        let i = 0;
        i < data.voice_states.length && this.#_client.cacheVoiceStates == true;
        i++
      )
        new VoiceState(this.#_client, data.voice_states[i], {
          guild_id: data.id,
          nocache,
        });

    if (data.roles)
      for (
        let i = 0;
        i < data.roles.length && this.#_client.cacheRoles == true;
        i++
      )
        new Role(this.#_client, data.roles[i], { guild_id: data.id, nocache });

    if (data.emojis)
      for (
        let i = 0;
        i < data.emojis.length && this.#_client.cacheEmojis == true;
        i++
      )
        new Emoji(this.#_client, data.emojis[i], {
          guild_id: data.id,
          nocache,
        });

    if (data.invites)
      for (
        let i = 0;
        i < data.invites.length && this.#_client.cacheInvites == true;
        i++
      )
        new Invite(this.#_client, data.invites[i], {
          guild_id: data.id,
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
   * @private
   */
  get #_originalIconHash() {
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
    return getGuildIcon(this.id, this.#_originalIconHash);
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
   * Server boost level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier}
   * @readonly
   * @type {Number}
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
   * Returns the client member for this guild.
   * @returns {Promise<Member>}
   * @public
   * @async
   * @method
   * @throws {Error}
   */
  me() {
    const cached = this.members.get(this.#_client.user.id);

    if (cached) return cached;

    return this.members.fetch(this.#_client.user.id);
  }

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
  async ban(user_id, { reason, seconds } = {}) {
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

    if (reason) body["X-Audit-Log-Reason"] = reason;
    // number of seconds to delete messages for (0-604800)
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
   * @param {Object?} options Unban options.
   * @returns {Promise<void?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  async unban(user_id, { reason } = {}) {
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
   * @param {Object?} options Kick options.
   * @returns {Promise<void?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  async kick(user_id, { reason } = {}) {
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
   * @param {Object?} options Remove role options.
   * @returns {Promise<void?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  async removeMemberRole(user_id, role_id, { reason } = {}) {
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

    if (reason) body["X-Audit-Log-Reason"] = reason;

    await this.#_client.request.makeRequest(
      "deleteRemoveMemberRole",
      [this.id, user_id, role_id],
      body,
    );
  }

  /**
   * Fetches audit logs.
   * @param {Object?} options Audit log fetch options.
   * @returns {Promise<AuditLog[]?>}
   * @async
   * @public
   * @method
   * @throws {Error | TypeError}
   */
  async fetchAuditLogs({ limit, type, user_id, before, after } = {}) {
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

    if (typeof type !== "undefined" && typeof type !== "number")
      throw new TypeError("GLUON: INVALID_TYPE: type");

    if (typeof user_id !== "undefined" && typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");

    if (typeof before !== "undefined" && typeof before !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: before");

    if (typeof after !== "undefined" && typeof after !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: after");

    const body = {};

    if (limit) body.limit = limit;
    else body.limit = 1;

    if (type) body.action_type = AUDIT_LOG_TYPES[type];

    if (user_id) body.user_id = user_id;

    if (before) body.before = before;

    if (after) body.after = after;

    const data = await this.#_client.request.makeRequest(
      "getGuildAuditLog",
      [this.id],
      body,
    );

    if (
      type &&
      AUDIT_LOG_TYPES[type] &&
      data &&
      data.audit_log_entries[0] &&
      data.audit_log_entries[0].action_type != AUDIT_LOG_TYPES[type]
    )
      return null;

    if (!data || data.audit_log_entries.length == 0) return null;

    return data.audit_log_entries.map(
      (e) => new AuditLog(this.#_client, e, { users: data.users }),
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
  async fetchBan(user_id) {
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
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      icon: this.#_originalIconHash,
      owner_id: this.ownerId,
      joined_at: this.joinedAt * 1000,
      premium_tier: this.premiumTier,
      unavailable: this.unavailable,
      member_count: this.memberCount,
      preferred_locale: this.preferredLocale,
      _cache_options: this._cacheOptions,
      _attributes: this.#_attributes,
      system_channel_id: this.systemChannelId ?? undefined,
      rules_channel_id: this.rulesChannelId ?? undefined,
      premium_subscription_count: this.premiumSubscriptionCount,
      members: this.members,
      channels: this.channels,
      voice_states: this.voiceStates,
      roles: this.roles,
      emojis: this.emojis,
      invites: this.invites,
    };
  }
}

export default Guild;
