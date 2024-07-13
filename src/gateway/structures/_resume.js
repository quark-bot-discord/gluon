const erlpack = require("erlpack");

function _resume(token, session_id, seq) {
  return erlpack.pack({
    op: 6,
    d: {
      token,
      session_id,
      seq,
    },
  });
}

module.exports = _resume;
