const { VERSION } = require("../constants");

function generateWebsocketURL(url) {

    return `${url}?v=${VERSION}&encoding=etf&compress=zlib-stream`;

}

module.exports = generateWebsocketURL;