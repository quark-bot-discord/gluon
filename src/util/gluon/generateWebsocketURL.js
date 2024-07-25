const { VERSION } = require("../../constants");

function generateWebsocketURL(url) {
  if (!url) throw new TypeError("GLUON: Websocket URL must be provided.");

  return `${url}?v=${VERSION}&encoding=etf&compress=zlib-stream`;
}

module.exports = generateWebsocketURL;
