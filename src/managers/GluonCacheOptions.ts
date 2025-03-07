import {
  DEFAULT_USER_EXPIRY_SECONDS,
  DEFAULT_MESSAGE_EXPIRY_SECONDS,
} from "../constants.js";
import { GluonCacheOptions as GluonCacheOptionsType } from "../../typings/index.d.js";
import { GluonGlobalCache } from "#typings/enums.js";

class GluonCacheOptions implements GluonCacheOptionsType {
  #_cache_options;
  #userTTL;
  #messageTTL;
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
  }: {
    userTTL?: number;
    messageTTL?: number;
    cacheMessages?: boolean;
    cacheUsers?: boolean;
    cacheMembers?: boolean;
    cacheChannels?: boolean;
    cacheGuilds?: boolean;
    cacheRoles?: boolean;
    cacheVoiceStates?: boolean;
    cacheEmojis?: boolean;
    cacheInvites?: boolean;
    cacheScheduledEvents?: boolean;
  } = {}) {
    this.#_cache_options = 0;

    this.#userTTL = DEFAULT_USER_EXPIRY_SECONDS;
    this.#messageTTL = DEFAULT_MESSAGE_EXPIRY_SECONDS;

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

  setCacheMessages(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache messages must be a boolean.");

    if (value === true) this.#_cache_options |= GluonGlobalCache.Messages;
    else this.#_cache_options &= ~GluonGlobalCache.Messages;

    return this;
  }

  get cacheMessages() {
    return (
      (this.#_cache_options & GluonGlobalCache.Messages) ===
      GluonGlobalCache.Messages
    );
  }

  setCacheUsers(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache users must be a boolean.");

    if (value === true) this.#_cache_options |= GluonGlobalCache.Users;
    else this.#_cache_options &= ~GluonGlobalCache.Users;

    return this;
  }

  get cacheUsers() {
    return (
      (this.#_cache_options & GluonGlobalCache.Users) === GluonGlobalCache.Users
    );
  }

  setCacheMembers(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache members must be a boolean.");

    if (value === true) this.#_cache_options |= GluonGlobalCache.Members;
    else this.#_cache_options &= ~GluonGlobalCache.Members;

    return this;
  }

  get cacheMembers() {
    return (
      (this.#_cache_options & GluonGlobalCache.Members) ===
      GluonGlobalCache.Members
    );
  }

  setCacheChannels(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache channels must be a boolean.");

    if (value === true) this.#_cache_options |= GluonGlobalCache.Channels;
    else this.#_cache_options &= ~GluonGlobalCache.Channels;

    return this;
  }

  get cacheChannels() {
    return (
      (this.#_cache_options & GluonGlobalCache.Channels) ===
      GluonGlobalCache.Channels
    );
  }

  setCacheGuilds(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache guilds must be a boolean.");

    if (value === true) this.#_cache_options |= GluonGlobalCache.Guilds;
    else this.#_cache_options &= ~GluonGlobalCache.Guilds;

    return this;
  }

  get cacheGuilds() {
    return (
      (this.#_cache_options & GluonGlobalCache.Guilds) ===
      GluonGlobalCache.Guilds
    );
  }

  setCacheRoles(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache roles must be a boolean.");

    if (value === true) this.#_cache_options |= GluonGlobalCache.Roles;
    else this.#_cache_options &= ~GluonGlobalCache.Roles;

    return this;
  }

  get cacheRoles() {
    return (
      (this.#_cache_options & GluonGlobalCache.Roles) === GluonGlobalCache.Roles
    );
  }

  setCacheVoiceStates(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache voice states must be a boolean.");

    if (value === true) this.#_cache_options |= GluonGlobalCache.VoiceStates;
    else this.#_cache_options &= ~GluonGlobalCache.VoiceStates;

    return this;
  }

  get cacheVoiceStates() {
    return (
      (this.#_cache_options & GluonGlobalCache.VoiceStates) ===
      GluonGlobalCache.VoiceStates
    );
  }

  setCacheEmojis(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache emojis must be a boolean.");

    if (value === true) this.#_cache_options |= GluonGlobalCache.Emojis;
    else this.#_cache_options &= ~GluonGlobalCache.Emojis;

    return this;
  }

  get cacheEmojis() {
    return (
      (this.#_cache_options & GluonGlobalCache.Emojis) ===
      GluonGlobalCache.Emojis
    );
  }

  setCacheInvites(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache invites must be a boolean.");

    if (value === true) this.#_cache_options |= GluonGlobalCache.Invites;
    else this.#_cache_options &= ~GluonGlobalCache.Invites;

    return this;
  }

  get cacheInvites() {
    return (
      (this.#_cache_options & GluonGlobalCache.Invites) ===
      GluonGlobalCache.Invites
    );
  }

  setCacheScheduledEvents(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache scheduled events must be a boolean.");

    if (value === true)
      this.#_cache_options |= GluonGlobalCache.ScheduledEvents;
    else this.#_cache_options &= ~GluonGlobalCache.ScheduledEvents;

    return this;
  }

  get cacheScheduledEvents() {
    return (
      (this.#_cache_options & GluonGlobalCache.ScheduledEvents) ===
      GluonGlobalCache.ScheduledEvents
    );
  }

  setCacheAuditLogs(value: boolean) {
    if (typeof value != "boolean")
      throw new TypeError("GLUON: Cache audit logs must be a boolean.");

    if (value === true) this.#_cache_options |= GluonGlobalCache.AuditLogs;
    else this.#_cache_options &= ~GluonGlobalCache.AuditLogs;

    return this;
  }

  get cacheAuditLogs() {
    return (
      (this.#_cache_options & GluonGlobalCache.AuditLogs) ===
      GluonGlobalCache.AuditLogs
    );
  }

  setUserTTL(seconds: number) {
    if (typeof seconds != "number")
      throw new TypeError("GLUON: User TTL must be a number.");

    this.#userTTL = seconds;

    return this;
  }

  get userTTL() {
    return this.#userTTL;
  }

  setMessageTTL(seconds: number) {
    if (typeof seconds != "number")
      throw new TypeError("GLUON: Message TTL must be a number.");

    this.#messageTTL = seconds;

    return this;
  }

  get messageTTL() {
    return this.#messageTTL;
  }

  toString() {
    return `GluonCacheOptions { ${Object.entries(GluonGlobalCache)
      .filter(([key]) => !isNaN(Number(key)))
      .map(
        ([key, value]: [string, string | GluonGlobalCache]) =>
          `${value.toString().toUpperCase()}: ${(this.#_cache_options & Number(key)) === Number(key)}`,
      )
      .join(
        ", ",
      )}, USER_TTL: ${this.#userTTL}, MESSAGE_TTL: ${this.#messageTTL} }`;
  }
}

export default GluonCacheOptions;
