const hash = require("hash.js");
const decryptText = require("../general/decryptText");
const Message = require("../../structures/Message");

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
  if (!client) throw new TypeError("GLUON: Client must be provided.");

  if (!encryptedMessage)
    throw new TypeError("GLUON: Encrypted message must be provided.");

  if (!id || !channelId || !guildId)
    throw new TypeError(
      "GLUON: Message must have an id, channel id and guild id."
    );

  const key = hash
    .sha512()
    .update(
      `${hash
        .sha512()
        .update(`${String(id)}_${String(channelId)}_${String(guildId)}`)
        .digest("hex")}satoshiNakamoto`
    )
    .digest("hex")
    .slice(0, 32);

  const iv = hash
    .sha512()
    .update(
      `${hash
        .sha512()
        .update(`${String(id)}_${String(channelId)}_${String(guildId)}`)
        .digest("hex")}${String(id)}`
    )
    .digest("hex")
    .slice(0, 16);

  const decryptedMessage = decryptText(encryptedMessage, key, iv);

  const messageObject = JSON.parse(decryptedMessage);

  return new Message(client, messageObject, {
    channel_id: channelId,
    guild_id: guildId,
  });
}

module.exports = decryptMessage;
