const erlpack = require("erlpack");

function _heartbeat(d) {
  return erlpack.pack({
    op: 1,
    d: d ? d : null,
  });
}

module.exports = _heartbeat;
