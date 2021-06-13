/* i think one process should be able to handle multiple shards (ideally max_concurrency's worth) */
const { BASE_URL, VERSION, NAME } = require('./constants');

const EventsEmitter = require("events");

const Request = require("./rest/requestHandler");
const WS = require("./gateway/index");

const UserManager = require("./managers/UserManager");
const GuildManager = require('./managers/GuildManager');


class Client extends EventsEmitter {

    constructor() {

        super();

        this.baseURL = BASE_URL;
        this.version = VERSION;
        this.name = NAME;

        this.user = null;

        this.users = new UserManager(this);
        this.guilds = new GuildManager(this);

    }

    /**
     * Initiates the login sequence
     * @param {string} token The authorization token
     */
    login(token) {
        /* sets the token and starts logging the bot in to the gateway, shard by shard */
        this.token = token;

        this.request = new Request(this.baseURL, this.name, this.version, this.token);

        this.request.makeRequest("getGatewayBot")
            .then(gatewayInfo => {
                // console.log(gatewayInfo);
                let remainingSessionStarts = gatewayInfo.session_start_limit.remaining;

                for (let i = 0; i < gatewayInfo.shards && remainingSessionStarts != 0; i++, remainingSessionStarts--) {

                    setTimeout(() => {

                        for (let n = 0; n < gatewayInfo.session_start_limit.max_concurrency; n++) {

                            new WS(this, `${gatewayInfo.url}?v=${VERSION}&encoding=etf&compress=zlib-stream`, [i, gatewayInfo.shards]);
    
                        }

                    }, 5000 * i);

                }

            })
            .catch(error => {
                console.log(`error: ${error}`);
            });

    }

}

module.exports = Client;