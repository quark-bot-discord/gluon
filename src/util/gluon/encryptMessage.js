const hash = require("hash.js");
const encryptText = require("../general/encryptText");

/**
 * Encrypts a message and returns an encrypted string.
 * @param {Message} message The message to encrypt.
 * @returns {String}
 */
function encryptMessage(message) {

  if (!message)
    throw new TypeError("GLUON: Message must be provided.");

  if (!message.id || !message._channel_id || !message._guild_id)
    throw new TypeError("GLUON: Message must have an id, channel id and guild id.");

  const messageString = JSON.stringify(message);

  const key = hash
    .sha512()
    .update(
      `${hash
        .sha512()
        .update(
          `${String(message.id)}_${
            String(message._channel_id)
          }_${String(message._guild_id)}`,
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
          `${String(message.id)}_${
            String(message._channel_id)
          }_${String(message._guild_id)}`,
        )
        .digest("hex")}${String(message.id)}`,
    )
    .digest("hex")
    .slice(0, 16);

  return encryptText(messageString, key, iv);
}

module.exports = encryptMessage;
