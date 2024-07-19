const { GLUON_GUILD_CACHING_OPTIONS } = require("../constants");

class GuildCacheOptions {
  constructor() {
    this._cache_options = 0;
  }

  setMessageCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true) this._cache_options |= GLUON_GUILD_CACHING_OPTIONS.MESSAGES;
    else if (option === false)
      this._cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.MESSAGES;
    return this;
  }

  setFileCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true) this._cache_options |= GLUON_GUILD_CACHING_OPTIONS.FILES;
    else if (option === false)
      this._cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.FILES;
    return this;
  }

  setVoiceStateCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true)
      this._cache_options |= GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES;
    else if (option === false)
      this._cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.VOICE_STATES;
    return this;
  }

  setMemberCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true) this._cache_options |= GLUON_GUILD_CACHING_OPTIONS.MEMBERS;
    else if (option === false)
      this._cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.MEMBERS;
    return this;
  }

  setRoleCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true) this._cache_options |= GLUON_GUILD_CACHING_OPTIONS.ROLES;
    else if (option === false)
      this._cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.ROLES;
    return this;
  }

  setChannelCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true) this._cache_options |= GLUON_GUILD_CACHING_OPTIONS.CHANNELS;
    else if (option === false)
      this._cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.CHANNELS;
    return this;
  }

  setEmojiCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true) this._cache_options |= GLUON_GUILD_CACHING_OPTIONS.EMOJIS;
    else if (option === false)
      this._cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.EMOJIS;
    return this;
  }

  setThreadCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true) this._cache_options |= GLUON_GUILD_CACHING_OPTIONS.THREADS;
    else if (option === false)
      this._cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.THREADS;
    return this;
  }

  setInviteCaching(option) {
    if (typeof option !== "boolean")
      throw new TypeError("GLUON: Setting must be a boolean");

    if (option === true) this._cache_options |= GLUON_GUILD_CACHING_OPTIONS.INVITES;
    else if (option === false)
      this._cache_options &= ~GLUON_GUILD_CACHING_OPTIONS.INVITES;
    return this;
  }
}

module.exports = GuildCacheOptions;
