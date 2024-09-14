import { VERSION } from "../../constants.js";

function generateWebsocketURL(url) {
  if (!url) throw new TypeError("GLUON: Websocket URL must be provided.");

  return `${url}?v=${VERSION}&encoding=etf&compress=zlib-stream`;
}

export default generateWebsocketURL;
