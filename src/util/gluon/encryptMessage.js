const hash = require("hash.js");
const encryptText = require("../general/encryptText");

/**
 * Encrypts a message and returns an encrypted string.
 * @param {Message} message The message to encrypt.
 * @returns {String}
 */
function encryptMessage(message) {
  const messageString = JSON.stringify(message);

  const key = hash
    .sha512()
    .update(
      `${hash
        .sha512()
        .update(
          `${String(message.id)}_${String(
            message._channel_id,
          )}_${String(message._guild_id)}`,
        )
        .digest("hex")}satoshiNakamoto`,
    )
    .digest("hex")
    .slice(0, 32);

  const iv = hash
    .sha512()
    .update(
      `${hash
        .sha512()
        .update(
          `${String(message.id)}_${String(
            message._channel_id,
          )}_${String(message._guild_id)}`,
        )
        .digest("hex")}${String(message.id)}`,
    )
    .digest("hex")
    .slice(0, 16);

  return encryptText(messageString, key, iv);
}

module.exports = encryptMessage;
