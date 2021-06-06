const { BASE_URL, VERSION } = require('./constants');

const EventsEmitter = require("events");

const Request = require("./rest/requestHandler");
const WS = require("./gateway/index");

const UserManager = require("./managers/UserManager");


class Client extends EventsEmitter {

    constructor() {

        super();

        this.baseURL = BASE_URL;
        this.version = VERSION;

        this.user = null;

        this.users = new UserManager(this);

    }

    /**
     * Initiates the login sequence
     * @param {string} token The authorization token
     */
    login(token) {
        /* sets the token and starts logging the bot in to the gateway, shard by shard */
        this.token = token;

        this.request = new Request(this.baseURL, this.version, this.token);

        this.request.makeRequest("getGatewayBot")
            .then(gatewayInfo => {
                console.log(gatewayInfo);
                let remainingSessionStarts = gatewayInfo.session_start_limit.remaining;

                for (let i = 0; i < gatewayInfo.shards; i++, remainingSessionStarts--) {

                    for (let n = 0; n < gatewayInfo.session_start_limit.max_concurrency; n++) {

                        new WS(this.request, `${gatewayInfo.url}?v=${VERSION}&encoding=etf`, [i, gatewayInfo.shards], this.token);

                    }

                }

            });

    }

}

module.exports = Client;