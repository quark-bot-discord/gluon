var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _Guild_instances,
  _Guild__client,
  _Guild__id,
  _Guild_unavailable,
  _Guild_name,
  _Guild_description,
  _Guild__icon,
  _Guild__owner_id,
  _Guild_joined_at,
  _Guild_member_count,
  _Guild_system_channel_id,
  _Guild_rules_channel_id,
  _Guild_preferred_locale,
  _Guild__attributes,
  _Guild_premium_subscription_count,
  _Guild__cacheOptions,
  _Guild_members,
  _Guild_channels,
  _Guild_voice_states,
  _Guild_roles,
  _Guild_emojis,
  _Guild_invites,
  _Guild_scheduled_events,
  _Guild_audit_logs,
  _Guild__formattedIconHash_get;
import { CDN_BASE_URL, NAME, PERMISSIONS } from "../constants.js";
import GuildChannelsManager from "../managers/GuildChannelsManager.js";
import GuildEmojisManager from "../managers/GuildEmojisManager.js";
import GuildInviteManager from "../managers/GuildInviteManager.js";
import GuildMemberManager from "../managers/GuildMemberManager.js";
import GuildRoleManager from "../managers/GuildRoleManager.js";
import GuildScheduledEventManager from "../managers/GuildScheduledEventManager.js";
import GuildVoiceStatesManager from "../managers/GuildVoiceStatesManager.js";
import { cacheChannel } from "../util/gluon/cacheChannel.js";
import checkPermission from "../util/discord/checkPermission.js";
import AuditLog from "./AuditLog.js";
import Emoji from "./Emoji.js";
import Invite from "./Invite.js";
import Member from "./Member.js";
import Role from "./Role.js";
import Thread from "./Thread.js";
import VoiceState from "./VoiceState.js";
import GuildCacheOptions from "../managers/GuildCacheOptions.js";
import Channel from "./GuildChannel.js";
import GluonCacheOptions from "../managers/GluonCacheOptions.js";
import util from "util";
import Message from "./Message.js";
import {
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildMFALevel,
  GuildNSFWLevel,
  GuildPremiumTier,
  GuildVerificationLevel,
  Locale,
} from "#typings/discord.js";
import { GluonDebugLevels, JsonTypes } from "#typings/enums.js";
import GuildAuditLogManager from "#src/managers/GuildAuditLogManager.js";
import { GluonPermissionsError } from "#typings/errors.js";
/**
 * Represents a Discord guild.
 * @see {@link https://discord.com/developers/docs/resources/guild}
 */
class Guild {
  /**
   * Creates the structure for a guild.
   * @param {Client} client The client instance.
   * @param {Object} data Raw guild data.
   * @param {Object?} options The additional options for this structure.
   * @param {Boolean?} [options.nocache] Whether this guild should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object}
   */
  constructor(client, data, { nocache = false } = { nocache: false }) {
    _Guild_instances.add(this);
    _Guild__client.set(this, void 0);
    _Guild__id.set(this, void 0);
    _Guild_unavailable.set(this, true);
    _Guild_name.set(this, "Unavailable");
    _Guild_description.set(this, null);
    _Guild__icon.set(this, null);
    _Guild__owner_id.set(this, BigInt(0));
    _Guild_joined_at.set(this, null);
    _Guild_member_count.set(this, 0);
    _Guild_system_channel_id.set(this, null);
    _Guild_rules_channel_id.set(this, null);
    _Guild_preferred_locale.set(this, Locale.EnglishUS);
    _Guild__attributes.set(this, 0);
    _Guild_premium_subscription_count.set(this, 0);
    _Guild__cacheOptions.set(this, new GuildCacheOptions(0));
    _Guild_members.set(this, void 0);
    _Guild_channels.set(this, void 0);
    _Guild_voice_states.set(this, void 0);
    _Guild_roles.set(this, void 0);
    _Guild_emojis.set(this, void 0);
    _Guild_invites.set(this, void 0);
    _Guild_scheduled_events.set(this, void 0);
    _Guild_audit_logs.set(this, void 0);
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
    __classPrivateFieldSet(this, _Guild__client, client, "f");
    /**
     * The id of the guild.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Guild__id, BigInt(data.id), "f");
    if ("unavailable" in data && data.unavailable === true) {
      __classPrivateFieldSet(this, _Guild_unavailable, true, "f");
      const shouldCache = Guild.shouldCache(
        __classPrivateFieldGet(this, _Guild__client, "f")._cacheOptions,
      );
      if (nocache === false && shouldCache) {
        __classPrivateFieldGet(this, _Guild__client, "f").guilds.set(
          data.id,
          this,
        );
        __classPrivateFieldGet(this, _Guild__client, "f")._emitDebug(
          GluonDebugLevels.Info,
          `CACHE GUILD ${data.id} (UNAVAILABLE)`,
        );
      } else {
        __classPrivateFieldGet(this, _Guild__client, "f")._emitDebug(
          GluonDebugLevels.Info,
          `NO CACHE GUILD ${data.id} (UNAVAILABLE) (${nocache} ${shouldCache})`,
        );
      }
      return;
    } else {
      __classPrivateFieldSet(this, _Guild_unavailable, false, "f");
    }
    const existing =
      __classPrivateFieldGet(this, _Guild__client, "f").guilds.get(data.id) ||
      null;
    // needed for join/leave logging
    /**
     * The name of the guild.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(this, _Guild_name, data.name ?? existing?.name, "f");
    /**
     * The description of the guild.
     * @type {String?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild_description,
      "description" in data
        ? data.description
        : (existing?.description ?? null),
      "f",
    );
    /**
     * The guild icon hash.
     * @type {BigInt?}
     * @private
     */
    if (data.icon !== undefined) {
      __classPrivateFieldSet(
        this,
        _Guild__icon,
        data.icon ? BigInt(`0x${data.icon.replace("a_", "")}`) : null,
        "f",
      );
    } else if (
      data.icon === undefined &&
      existing &&
      existing._originalIconHash
    ) {
      __classPrivateFieldSet(
        this,
        _Guild__icon,
        existing._originalIconHash
          ? BigInt(`0x${existing._originalIconHash.replace("a_", "")}`)
          : null,
        "f",
      );
    }
    /**
     * The id of the guild owner.
     * @type {BigInt}
     * @private
     */
    __classPrivateFieldSet(this, _Guild__owner_id, BigInt(data.owner_id), "f");
    /**
     * UNIX (seconds) timestamp for when the bot user was added to this guild.
     * @type {Number?}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild_joined_at,
      "joined_at" in data && data.joined_at
        ? (new Date(data.joined_at).getTime() / 1000) | 0
        : (existing?.joinedAt ?? null),
      "f",
    );
    if ("member_count" in data)
      /**
       * The member count of this guild.
       * @type {Number}
       * @private
       */
      __classPrivateFieldSet(this, _Guild_member_count, data.member_count, "f");
    else if (existing?.memberCount)
      __classPrivateFieldSet(
        this,
        _Guild_member_count,
        existing.memberCount,
        "f",
      );
    else __classPrivateFieldSet(this, _Guild_member_count, 2, "f");
    /**
     * The voice state manager of this guild.
     * @type {GuildVoiceStatesManager}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild_voice_states,
      existing
        ? existing.voiceStates
        : // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
          new GuildVoiceStatesManager(
            __classPrivateFieldGet(this, _Guild__client, "f"),
            data.voice_states,
          ),
      "f",
    );
    /**
     * The member manager of this guild.
     * @type {GuildMemberManager}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild_members,
      existing
        ? existing.members
        : new GuildMemberManager(
            __classPrivateFieldGet(this, _Guild__client, "f"),
            this,
          ),
      "f",
    );
    /**
     * The channel manager of this guild.
     * @type {GuildChannelsManager}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild_channels,
      existing
        ? existing.channels
        : new GuildChannelsManager(
            __classPrivateFieldGet(this, _Guild__client, "f"),
            this,
          ),
      "f",
    );
    /**
     * The role manager of this guild.
     * @type {GuildRoleManager}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild_roles,
      existing
        ? existing.roles
        : new GuildRoleManager(
            __classPrivateFieldGet(this, _Guild__client, "f"),
            this,
          ),
      "f",
    );
    __classPrivateFieldSet(
      this,
      _Guild_scheduled_events,
      existing
        ? existing.scheduledEvents
        : new GuildScheduledEventManager(
            __classPrivateFieldGet(this, _Guild__client, "f"),
            this,
          ),
      "f",
    );
    /**
     * The emoji manager of this guild.
     * @type {GuildEmojisManager}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild_emojis,
      existing
        ? existing.emojis
        : new GuildEmojisManager(
            __classPrivateFieldGet(this, _Guild__client, "f"),
            this,
          ),
      "f",
    );
    /**
     * The invite manager of this guild.
     * @type {GuildInviteManager}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild_invites,
      existing
        ? existing.invites
        : new GuildInviteManager(
            __classPrivateFieldGet(this, _Guild__client, "f"),
            this,
          ),
      "f",
    );
    __classPrivateFieldSet(
      this,
      _Guild_audit_logs,
      existing
        ? existing.auditLogs
        : new GuildAuditLogManager(
            __classPrivateFieldGet(this, _Guild__client, "f"),
            this,
          ),
      "f",
    );
    /**
     * The system channel id of the guild.
     * @type {BigInt}
     * @private
     */
    if (data.system_channel_id !== undefined)
      __classPrivateFieldSet(
        this,
        _Guild_system_channel_id,
        data.system_channel_id ? BigInt(data.system_channel_id) : null,
        "f",
      );
    else if (
      data.system_channel_id === undefined &&
      existing &&
      existing.systemChannelId
    )
      __classPrivateFieldSet(
        this,
        _Guild_system_channel_id,
        BigInt(existing.systemChannelId),
        "f",
      );
    /**
     * The rules channel id of the guild.
     * @type {BigInt}
     * @private
     */
    if (data.rules_channel_id !== undefined)
      __classPrivateFieldSet(
        this,
        _Guild_rules_channel_id,
        data.rules_channel_id ? BigInt(data.rules_channel_id) : null,
        "f",
      );
    else if (
      data.rules_channel_id === undefined &&
      existing &&
      existing.rulesChannelId
    )
      __classPrivateFieldSet(
        this,
        _Guild_rules_channel_id,
        BigInt(existing.rulesChannelId),
        "f",
      );
    /**
     * The premium subscription count of the guild.
     * @type {Number}
     * @private
     */
    if (typeof data.premium_subscription_count == "number")
      __classPrivateFieldSet(
        this,
        _Guild_premium_subscription_count,
        data.premium_subscription_count,
        "f",
      );
    else if (
      typeof data.premium_subscription_count != "number" &&
      existing &&
      existing.premiumSubscriptionCount
    )
      __classPrivateFieldSet(
        this,
        _Guild_premium_subscription_count,
        existing.premiumSubscriptionCount,
        "f",
      );
    else
      __classPrivateFieldSet(this, _Guild_premium_subscription_count, 0, "f");
    /**
     * The attributes of the guild.
     * @type {Number}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild__attributes,
      "_attributes" in data ? data._attributes : data.system_channel_flags,
      "f",
    );
    if (
      ("mfa_level" in data && typeof data.mfa_level == "number") ||
      (existing && typeof existing.mfaLevel == "number")
    ) {
      const mfaLevel =
        "mfa_level" in data && typeof data.mfa_level == "number"
          ? data.mfa_level
          : existing?.mfaLevel;
      switch (mfaLevel) {
        case 0:
          // none
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 6),
            "f",
          );
          break;
        case 1:
          // elevated
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 7),
            "f",
          );
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
          : existing?.verificationLevel;
      switch (verificationLevel) {
        case 0:
          // none
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 8),
            "f",
          );
          break;
        case 1:
          // low
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 9),
            "f",
          );
          break;
        case 2:
          // medium
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 10),
            "f",
          );
          break;
        case 3:
          // high
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 11),
            "f",
          );
          break;
        case 4:
          // very high
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 12),
            "f",
          );
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
          : existing?.defaultMessageNotifications;
      switch (defaultMessageNotifications) {
        case 0:
          // all messages
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 13),
            "f",
          );
          break;
        case 1:
          // only mentions
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 14),
            "f",
          );
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
          : existing?.explicitContentFilter;
      switch (explicitContentFilter) {
        case 0:
          // disabled
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 15),
            "f",
          );
          break;
        case 1:
          // members without roles
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 16),
            "f",
          );
          break;
        case 2:
          // all members
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 17),
            "f",
          );
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
          : existing?.nsfwLevel;
      switch (nsfwLevel) {
        case 0:
          // default
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 18),
            "f",
          );
          break;
        case 1:
          // explicit
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 19),
            "f",
          );
          break;
        case 2:
          // safe
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 20),
            "f",
          );
          break;
        case 3:
          // age restricted
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 21),
            "f",
          );
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
          : existing?.premiumTier;
      switch (premiumTier) {
        case 0:
          // none
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 22),
            "f",
          );
          break;
        case 1:
          // tier 1
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 23),
            "f",
          );
          break;
        case 2:
          // tier 2
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 24),
            "f",
          );
          break;
        case 3:
          // tier 3
          __classPrivateFieldSet(
            this,
            _Guild__attributes,
            __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 25),
            "f",
          );
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
      __classPrivateFieldSet(
        this,
        _Guild__attributes,
        __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 26),
        "f",
      );
    else if (
      existing &&
      typeof existing.premiumProgressBarEnabled == "boolean" &&
      existing.premiumProgressBarEnabled == true
    )
      __classPrivateFieldSet(
        this,
        _Guild__attributes,
        __classPrivateFieldGet(this, _Guild__attributes, "f") | (0b1 << 26),
        "f",
      );
    /**
     * The locale of this guild, if set up as a community.
     * @type {String}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild_preferred_locale,
      data.preferred_locale,
      "f",
    );
    /**
     * The cache options for this guild.
     * @type {GuildCacheOptions}
     * @private
     */
    __classPrivateFieldSet(
      this,
      _Guild__cacheOptions,
      new GuildCacheOptions(
        "_cache_options" in data
          ? data._cache_options
          : __classPrivateFieldGet(
              this,
              _Guild__client,
              "f",
            )._defaultGuildCacheOptions.toJSON(),
      ),
      "f",
    );
    const shouldCache = Guild.shouldCache(
      __classPrivateFieldGet(this, _Guild__client, "f")._cacheOptions,
    );
    if (nocache === false && shouldCache) {
      __classPrivateFieldGet(this, _Guild__client, "f").guilds.set(
        data.id,
        this,
      );
      __classPrivateFieldGet(this, _Guild__client, "f")._emitDebug(
        GluonDebugLevels.Info,
        `CACHE GUILD ${data.id}`,
      );
    } else {
      __classPrivateFieldGet(this, _Guild__client, "f")._emitDebug(
        GluonDebugLevels.Info,
        `NO CACHE GUILD ${data.id} (${nocache} ${shouldCache})`,
      );
    }
    if (
      "members" in data &&
      Member.shouldCache(
        __classPrivateFieldGet(this, _Guild__client, "f")._cacheOptions,
        this._cacheOptions,
      ) === true
    )
      for (let i = 0; i < data.members.length; i++) {
        const member = data.members[i];
        if (member && member.user && typeof member.user.id === "string") {
          new Member(
            __classPrivateFieldGet(this, _Guild__client, "f"),
            member,
            {
              userId: member.user.id,
              guildId: data.id,
              nocache,
            },
          );
        }
      }
    if (
      "channels" in data &&
      Channel.shouldCache(
        __classPrivateFieldGet(this, _Guild__client, "f")._cacheOptions,
        this._cacheOptions,
      ) === true
    )
      for (let i = 0; i < data.channels.length; i++)
        cacheChannel(
          __classPrivateFieldGet(this, _Guild__client, "f"),
          data.channels[i],
          data.id,
          nocache,
        );
    if (
      "threads" in data &&
      Thread.shouldCache(
        __classPrivateFieldGet(this, _Guild__client, "f")._cacheOptions,
        this._cacheOptions,
      ) === true
    )
      for (let i = 0; i < data.threads.length; i++)
        new Thread(
          __classPrivateFieldGet(this, _Guild__client, "f"),
          data.threads[i],
          {
            guildId: data.id,
            nocache,
          },
        );
    if (
      "audit_logs" in data &&
      AuditLog.shouldCache(
        __classPrivateFieldGet(this, _Guild__client, "f")._cacheOptions,
        this._cacheOptions,
      ) == true
    ) {
      for (let i = 0; i < data.audit_logs.length; i++) {
        const auditLog = data.audit_logs[i];
        new AuditLog(
          __classPrivateFieldGet(this, _Guild__client, "f"),
          auditLog,
          {
            guildId: data.id,
            nocache,
          },
        );
      }
    }
    if (
      "voice_states" in data &&
      VoiceState.shouldCache(
        __classPrivateFieldGet(this, _Guild__client, "f")._cacheOptions,
        this._cacheOptions,
      ) === true
    )
      for (let i = 0; i < data.voice_states.length; i++)
        new VoiceState(
          __classPrivateFieldGet(this, _Guild__client, "f"),
          data.voice_states[i],
          {
            guildId: data.id,
            nocache,
          },
        );
    if (
      data.roles &&
      Role.shouldCache(
        __classPrivateFieldGet(this, _Guild__client, "f")._cacheOptions,
        this._cacheOptions,
      ) === true
    )
      for (let i = 0; i < data.roles.length; i++)
        new Role(
          __classPrivateFieldGet(this, _Guild__client, "f"),
          data.roles[i],
          { guildId: data.id, nocache },
        );
    if (
      data.emojis &&
      Emoji.shouldCache(
        __classPrivateFieldGet(this, _Guild__client, "f")._cacheOptions,
        this._cacheOptions,
      ) === true
    )
      for (let i = 0; i < data.emojis.length; i++)
        new Emoji(
          __classPrivateFieldGet(this, _Guild__client, "f"),
          data.emojis[i],
          {
            guildId: data.id,
            nocache,
          },
        );
    if (
      "invites" in data &&
      Invite.shouldCache(
        __classPrivateFieldGet(this, _Guild__client, "f")._cacheOptions,
        this._cacheOptions,
      ) === true
    )
      for (let i = 0; i < data.invites.length; i++)
        new Invite(
          __classPrivateFieldGet(this, _Guild__client, "f"),
          data.invites[i],
          {
            guildId: data.id,
            nocache,
          },
        );
  }
  /**
   * The id of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get id() {
    return String(__classPrivateFieldGet(this, _Guild__id, "f"));
  }
  /**
   * The hash of the guild's icon, as it was received from Discord.
   * @readonly
   * @type {String?}
   * @public
   */
  get _originalIconHash() {
    return __classPrivateFieldGet(this, _Guild__icon, "f")
      ? // eslint-disable-next-line quotes
        `${__classPrivateFieldGet(this, _Guild_instances, "a", _Guild__formattedIconHash_get)}`
      : null;
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
    let rawFlags = 0;
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 0)) ==
      0b1 << 0
    )
      rawFlags |= 0b1 << 0;
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 1)) ==
      0b1 << 1
    )
      rawFlags |= 0b1 << 1;
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 2)) ==
      0b1 << 2
    )
      rawFlags |= 0b1 << 2;
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 3)) ==
      0b1 << 3
    )
      rawFlags |= 0b1 << 3;
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 4)) ==
      0b1 << 4
    )
      rawFlags |= 0b1 << 4;
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 5)) ==
      0b1 << 5
    )
      rawFlags |= 0b1 << 5;
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
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 6)) ==
      0b1 << 6
    )
      return GuildMFALevel.None;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 7)) ==
      0b1 << 7
    )
      return GuildMFALevel.Elevated;
    throw new Error("GLUON: Unknown MFA level");
  }
  /**
   * Server verification level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
   * @readonly
   * @type {String}
   * @public
   */
  get verificationLevel() {
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 8)) ==
      0b1 << 8
    )
      return GuildVerificationLevel.None;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 9)) ==
      0b1 << 9
    )
      return GuildVerificationLevel.Low;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 10)) ==
      0b1 << 10
    )
      return GuildVerificationLevel.Medium;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 11)) ==
      0b1 << 11
    )
      return GuildVerificationLevel.High;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 12)) ==
      0b1 << 12
    )
      return GuildVerificationLevel.VeryHigh;
    throw new Error("GLUON: Unknown verification level");
  }
  /**
   * Default notification setting.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
   * @readonly
   * @type {String}
   * @public
   */
  get defaultMessageNotifications() {
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 13)) ==
      0b1 << 13
    )
      return GuildDefaultMessageNotifications.AllMessages;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 14)) ==
      0b1 << 14
    )
      return GuildDefaultMessageNotifications.OnlyMentions;
    throw new Error("GLUON: Unknown default message notification level");
  }
  /**
   * Explicit content filter level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
   * @readonly
   * @type {String}
   * @public
   */
  get explicitContentFilter() {
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 15)) ==
      0b1 << 15
    )
      return GuildExplicitContentFilter.Disabled;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 16)) ==
      0b1 << 16
    )
      return GuildExplicitContentFilter.MembersWithoutRoles;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 17)) ==
      0b1 << 17
    )
      return GuildExplicitContentFilter.AllMembers;
    throw new Error("GLUON: Unknown explicit content filter level");
  }
  /**
   * Server NSFW level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
   * @readonly
   * @type {String}
   * @public
   */
  get nsfwLevel() {
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 18)) ==
      0b1 << 18
    )
      return GuildNSFWLevel.Default;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 19)) ==
      0b1 << 19
    )
      return GuildNSFWLevel.Explicit;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 20)) ==
      0b1 << 20
    )
      return GuildNSFWLevel.Safe;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 21)) ==
      0b1 << 21
    )
      return GuildNSFWLevel.AgeRestricted;
    throw new Error("GLUON: Unknown NSFW level");
  }
  /**
   * Server boost level.
   * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier}
   * @readonly
   * @public
   */
  get premiumTier() {
    if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 22)) ==
      0b1 << 22
    )
      return GuildPremiumTier.None;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 23)) ==
      0b1 << 23
    )
      return GuildPremiumTier.Tier1;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 24)) ==
      0b1 << 24
    )
      return GuildPremiumTier.Tier2;
    else if (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 25)) ==
      0b1 << 25
    )
      return GuildPremiumTier.Tier3;
    throw new Error("GLUON: Unknown premium tier");
  }
  /**
   * Whether the guild has the boost progress bar enabled.
   * @readonly
   * @type {Boolean}
   * @public
   */
  get premiumProgressBarEnabled() {
    return (
      (__classPrivateFieldGet(this, _Guild__attributes, "f") & (0b1 << 26)) ==
      0b1 << 26
    );
  }
  /**
   * Whether the guild is unavailable.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get unavailable() {
    return __classPrivateFieldGet(this, _Guild_unavailable, "f") ?? false;
  }
  /**
   * The name of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get name() {
    return __classPrivateFieldGet(this, _Guild_name, "f");
  }
  /**
   * The description of the guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get description() {
    return __classPrivateFieldGet(this, _Guild_description, "f");
  }
  /**
   * The icon hash of the guild.
   * @type {String}
   * @readonly
   * @public
   */
  get ownerId() {
    return String(__classPrivateFieldGet(this, _Guild__owner_id, "f"));
  }
  /**
   * The id of the guild owner.
   * @type {Number}
   * @readonly
   * @public
   */
  get joinedAt() {
    return __classPrivateFieldGet(this, _Guild_joined_at, "f") ?? undefined;
  }
  /**
   * The member count of the guild.
   * @type {Number}
   * @readonly
   * @public
   */
  get memberCount() {
    return __classPrivateFieldGet(this, _Guild_member_count, "f");
  }
  /**
   * The system channel id of the guild.
   * @type {String?}
   * @readonly
   * @public
   */
  get systemChannelId() {
    return __classPrivateFieldGet(this, _Guild_system_channel_id, "f")
      ? String(__classPrivateFieldGet(this, _Guild_system_channel_id, "f"))
      : null;
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
    return __classPrivateFieldGet(this, _Guild_rules_channel_id, "f")
      ? String(__classPrivateFieldGet(this, _Guild_rules_channel_id, "f"))
      : null;
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
    return __classPrivateFieldGet(this, _Guild_preferred_locale, "f");
  }
  /**
   * The premium subscription count of the guild.
   * @type {Number}
   * @readonly
   * @public
   */
  get premiumSubscriptionCount() {
    return __classPrivateFieldGet(this, _Guild_premium_subscription_count, "f");
  }
  /**
   * The cache options for this guild.
   * @readonly
   * @public
   */
  get _cacheOptions() {
    return __classPrivateFieldGet(this, _Guild__cacheOptions, "f");
  }
  /**
   * The members in the guild.
   * @type {GuildMemberManager}
   * @readonly
   * @public
   */
  get members() {
    return __classPrivateFieldGet(this, _Guild_members, "f");
  }
  /**
   * The channels in the guild.
   * @type {GuildChannelsManager}
   * @readonly
   * @public
   */
  get channels() {
    return __classPrivateFieldGet(this, _Guild_channels, "f");
  }
  /**
   * The voice states in the guild.
   * @type {GuildVoiceStatesManager}
   * @readonly
   * @public
   */
  get voiceStates() {
    return __classPrivateFieldGet(this, _Guild_voice_states, "f");
  }
  /**
   * The roles in the guild.
   * @type {GuildRoleManager}
   * @readonly
   * @public
   */
  get roles() {
    return __classPrivateFieldGet(this, _Guild_roles, "f");
  }
  /**
   * The scheduled events in the guild.
   * @type {GuildScheduledEventManager}
   * @readonly
   * @public
   */
  get scheduledEvents() {
    return __classPrivateFieldGet(this, _Guild_scheduled_events, "f");
  }
  get auditLogs() {
    return __classPrivateFieldGet(this, _Guild_audit_logs, "f");
  }
  /**
   * The emojis in the guild.
   * @type {GuildEmojisManager}
   * @readonly
   * @public
   */
  get emojis() {
    return __classPrivateFieldGet(this, _Guild_emojis, "f");
  }
  /**
   * The invites in the guild.
   * @type {GuildInviteManager}
   * @readonly
   * @public
   */
  get invites() {
    return __classPrivateFieldGet(this, _Guild_invites, "f");
  }
  /**
   * Increases the member count of the guild.
   * @method
   * @public
   */
  _incrementMemberCount() {
    var _a;
    __classPrivateFieldSet(
      this,
      _Guild_member_count,
      ((_a = __classPrivateFieldGet(this, _Guild_member_count, "f")), _a++, _a),
      "f",
    );
  }
  /**
   * Decreases the member count of the guild.
   * @method
   * @public
   */
  _decrementMemberCount() {
    var _a;
    __classPrivateFieldSet(
      this,
      _Guild_member_count,
      ((_a = __classPrivateFieldGet(this, _Guild_member_count, "f")), _a--, _a),
      "f",
    );
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
    const cached = this.members.get(
      __classPrivateFieldGet(this, _Guild__client, "f").user.id,
    );
    if (cached) return cached;
    const fetched = await this.members.fetch(
      __classPrivateFieldGet(this, _Guild__client, "f").user.id,
    );
    if (!fetched) throw new Error("GLUON: ME NOT FOUND");
    return fetched;
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
  async ban(user_id, { reason, seconds } = {}) {
    if (
      !checkPermission((await this.me()).permissions, PERMISSIONS.BAN_MEMBERS)
    ) {
      throw new GluonPermissionsError("BanMembers");
    }
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
    await __classPrivateFieldGet(this, _Guild__client, "f").request.makeRequest(
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
  async unban(user_id, { reason } = {}) {
    if (
      !checkPermission((await this.me()).permissions, PERMISSIONS.BAN_MEMBERS)
    ) {
      throw new GluonPermissionsError("BanMembers");
    }
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: reason");
    if (typeof reason === "string" && reason.length > 512)
      throw new RangeError("GLUON: VALUE_OUT_OF_RANGE: reason");
    const body = {};
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    await __classPrivateFieldGet(this, _Guild__client, "f").request.makeRequest(
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
  async kick(user_id, { reason } = {}) {
    if (
      !checkPermission((await this.me()).permissions, PERMISSIONS.KICK_MEMBERS)
    ) {
      throw new GluonPermissionsError("KickMembers");
    }
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");
    if (typeof reason !== "undefined" && typeof reason !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: reason");
    if (typeof reason === "string" && reason.length > 512)
      throw new RangeError("GLUON: VALUE_OUT_OF_RANGE: reason");
    const body = {};
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (reason) body["X-Audit-Log-Reason"] = reason;
    await __classPrivateFieldGet(this, _Guild__client, "f").request.makeRequest(
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
  async removeMemberRole(user_id, role_id, { reason } = {}) {
    if (
      !checkPermission((await this.me()).permissions, PERMISSIONS.MANAGE_ROLES)
    ) {
      throw new GluonPermissionsError("ManageRoles");
    }
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
    await __classPrivateFieldGet(this, _Guild__client, "f").request.makeRequest(
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
  async fetchAuditLogs({ limit, type, user_id, before, after } = {}) {
    if (
      !checkPermission(
        (await this.me()).permissions,
        PERMISSIONS.VIEW_AUDIT_LOG,
      )
    ) {
      throw new GluonPermissionsError("ViewAuditLog");
    }
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
    if (type) body.action_type = type;
    // @ts-expect-error TS(2339): Property 'user_id' does not exist on type '{}'.
    if (user_id) body.user_id = user_id;
    // @ts-expect-error TS(2339): Property 'before' does not exist on type '{}'.
    if (before) body.before = before;
    // @ts-expect-error TS(2339): Property 'after' does not exist on type '{}'.
    if (after) body.after = after;
    const data = await __classPrivateFieldGet(
      this,
      _Guild__client,
      "f",
    ).request.makeRequest("getGuildAuditLog", [this.id], body);
    if (
      type &&
      data &&
      data.audit_log_entries[0] &&
      data.audit_log_entries[0].action_type != type
    )
      return null;
    if (!data || data.audit_log_entries.length == 0) return null;
    return data.audit_log_entries.map(
      (e) =>
        new AuditLog(__classPrivateFieldGet(this, _Guild__client, "f"), e, {
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
    ) {
      throw new GluonPermissionsError("ManageGuild");
    }
    return __classPrivateFieldGet(
      this,
      _Guild__client,
      "f",
    ).request.makeRequest("getGuildInvites", [this.id]);
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
    const data = await __classPrivateFieldGet(
      this,
      _Guild__client,
      "f",
    ).request.makeRequest("getGuildChannels", [this.id]);
    const channels = [];
    for (let i = 0; i < data.length; i++)
      channels.push(
        cacheChannel(
          __classPrivateFieldGet(this, _Guild__client, "f"),
          data[i],
          this.id,
        ),
      );
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
    ) {
      throw new GluonPermissionsError("BanMembers");
    }
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: INVALID_TYPE: user_id");
    return __classPrivateFieldGet(
      this,
      _Guild__client,
      "f",
    ).request.makeRequest("getGuildBan", [this.id, user_id]);
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
    await __classPrivateFieldGet(this, _Guild__client, "f").request.makeRequest(
      "deleteLeaveGuild",
      [this.id],
    );
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
  static async deleteWebhook(client, webhookId) {
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
  static createWebhook(client, channelId, { name = NAME } = { name: NAME }) {
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
  static modifyWebhook(client, webhookId, { channelId }) {
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
  static fetchWebhook(client, webhookId) {
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
    client,
    { id, token },
    { content, embeds, components, files } = {},
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
    if (components) body.components = components;
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
  static getIcon(id, hash) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: Guild id must be a string.");
    if (hash && typeof hash !== "string")
      throw new TypeError("GLUON: Guild icon hash must be a string.");
    return hash
      ? `${CDN_BASE_URL}/icons/${id}/${hash}.${hash.startsWith("a_") ? "gif" : "png"}`
      : null;
  }
  /**
   * @method
   * @public
   */
  _intervalCallback() {
    __classPrivateFieldGet(this, _Guild_voice_states, "f")._intervalCallback();
    __classPrivateFieldGet(this, _Guild_members, "f")._intervalCallback();
    __classPrivateFieldGet(this, _Guild_channels, "f")._intervalCallback();
    __classPrivateFieldGet(this, _Guild_roles, "f")._intervalCallback();
    __classPrivateFieldGet(
      this,
      _Guild_scheduled_events,
      "f",
    )._intervalCallback();
    __classPrivateFieldGet(this, _Guild_emojis, "f")._intervalCallback();
    __classPrivateFieldGet(this, _Guild_invites, "f")._intervalCallback();
    __classPrivateFieldGet(this, _Guild_channels, "f").forEach((c) => {
      if ("messages" in c) {
        c.messages._intervalCallback();
      }
    });
  }
  /**
   * Determines whether the emoji should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions) {
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
  [((_Guild__client = new WeakMap()),
  (_Guild__id = new WeakMap()),
  (_Guild_unavailable = new WeakMap()),
  (_Guild_name = new WeakMap()),
  (_Guild_description = new WeakMap()),
  (_Guild__icon = new WeakMap()),
  (_Guild__owner_id = new WeakMap()),
  (_Guild_joined_at = new WeakMap()),
  (_Guild_member_count = new WeakMap()),
  (_Guild_system_channel_id = new WeakMap()),
  (_Guild_rules_channel_id = new WeakMap()),
  (_Guild_preferred_locale = new WeakMap()),
  (_Guild__attributes = new WeakMap()),
  (_Guild_premium_subscription_count = new WeakMap()),
  (_Guild__cacheOptions = new WeakMap()),
  (_Guild_members = new WeakMap()),
  (_Guild_channels = new WeakMap()),
  (_Guild_voice_states = new WeakMap()),
  (_Guild_roles = new WeakMap()),
  (_Guild_emojis = new WeakMap()),
  (_Guild_invites = new WeakMap()),
  (_Guild_scheduled_events = new WeakMap()),
  (_Guild_audit_logs = new WeakMap()),
  (_Guild_instances = new WeakSet()),
  (_Guild__formattedIconHash_get = function _Guild__formattedIconHash_get() {
    if (!__classPrivateFieldGet(this, _Guild__icon, "f")) return null;
    let formattedHash = __classPrivateFieldGet(
      this,
      _Guild__icon,
      "f",
    ).toString(16);
    while (formattedHash.length != 32)
      // eslint-disable-next-line quotes
      formattedHash = `0${formattedHash}`;
    return formattedHash;
  }),
  util.inspect.custom)]() {
    return this.toString();
  }
  /**
   * Returns the JSON representation of this structure.
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          id: this.id,
          name: this.name,
          icon: this._originalIconHash,
          owner_id: this.ownerId,
          joined_at: this.joinedAt ? this.joinedAt * 1000 : undefined,
          unavailable: this.unavailable,
          member_count: this.memberCount,
          premium_tier: this.premiumTier,
          preferred_locale: this.preferredLocale,
          _cache_options: this._cacheOptions.toJSON(format),
          _attributes: __classPrivateFieldGet(this, _Guild__attributes, "f"),
          system_channel_id: this.systemChannelId ?? null,
          rules_channel_id: this.rulesChannelId ?? null,
          premium_subscription_count: this.premiumSubscriptionCount,
          members: this.members.toJSON(format),
          channels: this.channels.toJSON(format),
          voice_states: this.voiceStates.toJSON(format),
          roles: this.roles.toJSON(format),
          emojis: this.emojis.toJSON(format),
          invites: this.invites.toJSON(format),
          audit_logs: this.auditLogs?.toJSON(format),
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          id: this.id,
          name: this.name,
          icon: this._originalIconHash,
          owner_id: this.ownerId,
          joined_at: this.joinedAt
            ? new Date(this.joinedAt * 1000).toISOString()
            : undefined,
          premium_tier: this.premiumTier,
          unavailable: this.unavailable,
          member_count: this.memberCount,
          preferred_locale: this.preferredLocale,
          system_channel_flags: this.systemChannelFlags,
          system_channel_id: this.systemChannelId ?? null,
          rules_channel_id: this.rulesChannelId ?? null,
          premium_subscription_count: this.premiumSubscriptionCount,
          premium_progress_bar_enabled: this.premiumProgressBarEnabled,
          default_message_notifications: this.defaultMessageNotifications,
          explicit_content_filter: this.explicitContentFilter,
          verification_level: this.verificationLevel,
          nsfw_level: this.nsfwLevel,
          mfa_level: this.mfaLevel,
          members: this.members.toJSON(format),
          channels: this.channels.toJSON(format),
          voice_states: this.voiceStates.toJSON(format),
          roles: this.roles.toJSON(format),
          emojis: this.emojis.toJSON(format),
          invites: this.invites.toJSON(format),
          audit_logs: this.auditLogs?.toJSON(format),
        };
      }
    }
  }
}
export default Guild;
//# sourceMappingURL=Guild.js.map
