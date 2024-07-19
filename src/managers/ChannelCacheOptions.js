const { GLUON_CHANNEL_CACHING_OPTIONS } = require("../constants");

class ChannelCacheOptions {
    constructor() {
        this._cache_options = 0;
    }

    setMessageCaching(option) {
        if (typeof option !== "boolean") throw new TypeError("GLUON: Setting must be a boolean");

        if (option === true) this._cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES;
        else if (option === false) this._cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.MESSAGES;
        return this;
    }

    setFileCaching(option) {
        if (typeof option !== "boolean") throw new TypeError("GLUON: Setting must be a boolean");

        if (option === true) this._cache_options |= GLUON_CHANNEL_CACHING_OPTIONS.FILES;
        else if (option === false) this._cache_options &= ~GLUON_CHANNEL_CACHING_OPTIONS.FILES;
        return this;
    }
};

module.exports = ChannelCacheOptions;