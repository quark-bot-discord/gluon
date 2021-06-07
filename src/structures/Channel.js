const ChannelMessageManager = require("../managers/ChannelMessageManager");

class Channel {

    constructor(client, data, guild_id) {

        this.id = data.id;

        this.name = data.name;

        this.permission_overwrites = data.permission_overwrites;

        // need permissions overwrites too

        switch (data.type) {
            /* text channel */
            case 0: {

                this.messages = new ChannelMessageManager();

                this.type = 0;

                break;

            }
            /* voice channel */
            case 2: {

                    // voice states perhaps, or could combine that with members?

                    this.type = 2;

                break;
            }
            /* guild news */
            case 5: {

                this.messages = new ChannelMessageManager();

                this.type = 5;

                break;
            }
            /* news thread */
            case 10: {

                // might need to add additional fields
                // need to look into threads a little more

                this.messages = new ChannelMessageManager();

                this.type = 10;

                break;
            }
            /* public thread */
            case 11: {

                // might need to add additional fields
                // need to look into threads a little more

                this.messages = new ChannelMessageManager();
                
                this.type = 11;

                break;
            }
            /* private thread */
            case 12: {

                // might need to add additional fields
                // need to look into threads a little more

                this.messages = new ChannelMessageManager();
                
                this.type = 12;

                break;
            }
            /* stage voice */
            case 13: {

                // voice states too???

                this.type = 13;

                break;
            }
        }

        this.guild = client.guilds.cache[guild_id];

        client.guilds.cache[guild_id].channels.cache[this.id] = this;

    }

}

module.exports = Channel;