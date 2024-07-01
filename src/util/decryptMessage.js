const hash = require("hash.js");
const decryptText = require("./decryptText");
const Message = require("../structures/Message");

/**
 * Decrypts a message and returns the message structure for it.
 * @param {Client} client The client instance.
 * @param {String} encryptedMessage The encrypted message.
 * @param {String | BigInt} id The id of the encrypted message.
 * @param {String | BigInt} channelId The id of the channel the encrypted message belongs to.
 * @param {String | BigInt} guildId The id of the guild the encrypted message belongs to.
 * @returns {Message}
 */
function decryptMessage(client, encryptedMessage, id, channelId, guildId) {
  const key = hash
    .sha512()
    .update(
      `${hash.sha512().update(`${id}_${channelId}_${guildId}`).digest("hex")}satoshiNakamoto`,
    )
    .digest("hex")
    .slice(0, 32);

  const iv = hash
    .sha512()
    .update(
      `${hash.sha512().update(`${id}_${channelId}_${guildId}`).digest("hex")}${id}`,
    )
    .digest("hex")
    .slice(0, 16);

  const decryptedMessage = decryptText(encryptedMessage, key, iv);

  const messageObject = JSON.parse(decryptedMessage);

  return new Message(client, messageObject, channelId, guildId);
}

module.exports = decryptMessage;
