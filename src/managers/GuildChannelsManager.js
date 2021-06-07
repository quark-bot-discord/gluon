const ChannelMessageManager = require("./ChannelMessageManager");

class GuildChannelsManager {

    constructor(channels) {

        this.cache = {};

        for (let i = 0; i < channels.length; i++) {

            switch (channels[i].type) {
                /* text channel */
                case 0: {

                    this.cache[channels[i].id] = {
                        id: channels[i].id,
                        name: channels[i].name,
                        permissions: channels[i].permission_overwrites,
                        messages: new ChannelMessageManager(),
                        type: 0
                    };

                    break;

                }
                /* voice channel */
                case 2: {

                    this.cache[channels[i].id] = {
                        id: channels[i].id,
                        name: channels[i].name,
                        // voice states perhaps?
                        type: 2
                    };

                    break;
                }
                /* guild news */
                case 5: {

                    this.cache[channels[i].id] = {
                        id: channels[i].id,
                        name: channels[i].name,
                        permissions: channels[i].permission_overwrites,
                        messages: new ChannelMessageManager(),
                        type: 5
                    };

                    break;
                }
                /* news thread */
                case 10: {

                    this.cache[channels[i].id] = {
                        id: channels[i].id,
                        name: channels[i].name,
                        // might need to add additional fields
                        // need to look into threads a little more
                        messages: new ChannelMessageManager(),
                        type: 10
                    };

                    break;
                }
                /* public thread */
                case 11: {

                    this.cache[channels[i].id] = {
                        id: channels[i].id,
                        name: channels[i].name,
                        // might need to add additional fields
                        // need to look into threads a little more
                        messages: new ChannelMessageManager(),
                        type: 11
                    };

                    break;
                }
                /* private thread */
                case 12: {

                    this.cache[channels[i].id] = {
                        id: channels[i].id,
                        name: channels[i].name,
                        // might need to add additional fields
                        // need to look into threads a little more
                        messages: new ChannelMessageManager(),
                        type: 12
                    };

                    break;
                }
                /* stage voice */
                case 13: {

                    this.cache[channels[i].id] = {
                        id: channels[i].id,
                        name: channels[i].name,
                        // voice states perhaps?
                        type: 13
                    };

                    break;
                }
            }

        }

        return this;

    }

    async fetch() {

    }

}

module.exports = GuildChannelsManager;