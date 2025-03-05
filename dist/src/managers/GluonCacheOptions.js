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
var _GluonCacheOptions__cache_options,
  _GluonCacheOptions_userTTL,
  _GluonCacheOptions_messageTTL;
import {
  DEFAULT_USER_EXPIRY_SECONDS,
  DEFAULT_MESSAGE_EXPIRY_SECONDS,
} from "../constants.js";
import { GluonGlobalCache } from "#typings/enums.js";
class GluonCacheOptions {
  constructor({
    userTTL,
    messageTTL,
    cacheMessages,
    cacheUsers,
    cacheMembers,
    cacheChannels,
    cacheGuilds,
    cacheRoles,
    cacheVoiceStates,
    cacheEmojis,
    cacheInvites,
    cacheScheduledEvents,
  } = {}) {
    _GluonCacheOptions__cache_options.set(this, void 0);
    _GluonCacheOptions_userTTL.set(this, void 0);
    _GluonCacheOptions_messageTTL.set(this, void 0);
    __classPrivateFieldSet(this, _GluonCacheOptions__cache_options, 0, "f");
    __classPrivateFieldSet(
      this,
      _GluonCacheOptions_userTTL,
      DEFAULT_USER_EXPIRY_SECONDS,
      "f",
    );
    __classPrivateFieldSet(
      this,
      _GluonCacheOptions_messageTTL,
      DEFAULT_MESSAGE_EXPIRY_SECONDS,
      "f",
    );
    if (userTTL) this.setUserTTL(userTTL);
    if (messageTTL) this.setMessageTTL(messageTTL);
    if (cacheMessages) this.setCacheMessages(cacheMessages);
    if (cacheUsers) this.setCacheUsers(cacheUsers);
    if (cacheMembers) this.setCacheMembers(cacheMembers);
    if (cacheChannels) this.setCacheChannels(cacheChannels);
    if (cacheGuilds) this.setCacheGuilds(cacheGuilds);
    if (cacheRoles) this.setCacheRoles(cacheRoles);
    if (cacheVoiceStates) this.setCacheVoiceStates(cacheVoiceStates);
    if (cacheEmojis) this.setCacheEmojis(cacheEmojis);
    if (cacheInvites) this.setCacheInvites(cacheInvites);
    if (cacheScheduledEvents)
      this.setCacheScheduledEvents(cacheScheduledEvents);
  }
  setCacheMessages(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache messages must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GluonGlobalCache.Messages,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GluonGlobalCache.Messages,
        "f",
      );
    return this;
  }
  get cacheMessages() {
    return (
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GluonGlobalCache.Messages) ===
      GluonGlobalCache.Messages
    );
  }
  setCacheUsers(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache users must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GluonGlobalCache.Users,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GluonGlobalCache.Users,
        "f",
      );
    return this;
  }
  get cacheUsers() {
    return (
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GluonGlobalCache.Users) ===
      GluonGlobalCache.Users
    );
  }
  setCacheMembers(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache members must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GluonGlobalCache.Members,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GluonGlobalCache.Members,
        "f",
      );
    return this;
  }
  get cacheMembers() {
    return (
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GluonGlobalCache.Members) ===
      GluonGlobalCache.Members
    );
  }
  setCacheChannels(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache channels must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GluonGlobalCache.Channels,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GluonGlobalCache.Channels,
        "f",
      );
    return this;
  }
  get cacheChannels() {
    return (
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GluonGlobalCache.Channels) ===
      GluonGlobalCache.Channels
    );
  }
  setCacheGuilds(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache guilds must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GluonGlobalCache.Guilds,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GluonGlobalCache.Guilds,
        "f",
      );
    return this;
  }
  get cacheGuilds() {
    return (
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GluonGlobalCache.Guilds) ===
      GluonGlobalCache.Guilds
    );
  }
  setCacheRoles(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache roles must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GluonGlobalCache.Roles,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GluonGlobalCache.Roles,
        "f",
      );
    return this;
  }
  get cacheRoles() {
    return (
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GluonGlobalCache.Roles) ===
      GluonGlobalCache.Roles
    );
  }
  setCacheVoiceStates(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache voice states must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GluonGlobalCache.VoiceStates,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GluonGlobalCache.VoiceStates,
        "f",
      );
    return this;
  }
  get cacheVoiceStates() {
    return (
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GluonGlobalCache.VoiceStates) ===
      GluonGlobalCache.VoiceStates
    );
  }
  setCacheEmojis(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache emojis must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GluonGlobalCache.Emojis,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GluonGlobalCache.Emojis,
        "f",
      );
    return this;
  }
  get cacheEmojis() {
    return (
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GluonGlobalCache.Emojis) ===
      GluonGlobalCache.Emojis
    );
  }
  setCacheInvites(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache invites must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GluonGlobalCache.Invites,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GluonGlobalCache.Invites,
        "f",
      );
    return this;
  }
  get cacheInvites() {
    return (
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GluonGlobalCache.Invites) ===
      GluonGlobalCache.Invites
    );
  }
  setCacheScheduledEvents(value) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache scheduled events must be a boolean.");
    if (value === true)
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") |
          GluonGlobalCache.ScheduledEvents,
        "f",
      );
    else
      __classPrivateFieldSet(
        this,
        _GluonCacheOptions__cache_options,
        __classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
          ~GluonGlobalCache.ScheduledEvents,
        "f",
      );
    return this;
  }
  get cacheScheduledEvents() {
    return (
      (__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") &
        GluonGlobalCache.ScheduledEvents) ===
      GluonGlobalCache.ScheduledEvents
    );
  }
  setUserTTL(seconds) {
    if (typeof seconds != "number")
      throw new TypeError("GLUON: User TTL must be a number.");
    __classPrivateFieldSet(this, _GluonCacheOptions_userTTL, seconds, "f");
    return this;
  }
  get userTTL() {
    return __classPrivateFieldGet(this, _GluonCacheOptions_userTTL, "f");
  }
  setMessageTTL(seconds) {
    if (typeof seconds != "number")
      throw new TypeError("GLUON: Message TTL must be a number.");
    __classPrivateFieldSet(this, _GluonCacheOptions_messageTTL, seconds, "f");
    return this;
  }
  get messageTTL() {
    return __classPrivateFieldGet(this, _GluonCacheOptions_messageTTL, "f");
  }
  toString() {
    return `GluonCacheOptions { ${Object.entries(GluonGlobalCache)
      .map(
        ([key, value]) =>
          `${key}: ${(__classPrivateFieldGet(this, _GluonCacheOptions__cache_options, "f") & Number(value)) === Number(value)}`,
      )
      .join(
        ", ",
      )}, USER_TTL: ${__classPrivateFieldGet(this, _GluonCacheOptions_userTTL, "f")}, MESSAGE_TTL: ${__classPrivateFieldGet(this, _GluonCacheOptions_messageTTL, "f")} }`;
  }
}
(_GluonCacheOptions__cache_options = new WeakMap()),
  (_GluonCacheOptions_userTTL = new WeakMap()),
  (_GluonCacheOptions_messageTTL = new WeakMap());
export default GluonCacheOptions;
//# sourceMappingURL=GluonCacheOptions.js.map
