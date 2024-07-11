const hash = require("hash.js");
const bundleMessage = require("./bundleMessage");
const encryptText = require("./encryptText");

/**
 * Encrypts a message and returns an encrypted string.
 * @param {Message} message The message to encrypt.
 * @returns {String}
 */
function encryptMessage(message) {
  const bundledMessage = bundleMessage(message);

  const messageString = JSON.stringify(bundledMessage);

  const key = hash
    .sha512()
    .update(
      `${hash
        .sha512()
        .update(
          `${message.id}_${
            message.channel ? message.channel.id : message.channel_id
          }_${message.guild ? message.guild.id : message.guild_id}`
        )
        .digest("hex")}satoshiNakamoto`
    )
    .digest("hex")
    .slice(0, 32);

  const iv = hash
    .sha512()
    .update(
      `${hash
        .sha512()
        .update(
          `${message.id}_${
            message.channel ? message.channel.id : message.channel_id
          }_${message.guild ? message.guild.id : message.guild_id}`
        )
        .digest("hex")}${message.id}`
    )
    .digest("hex")
    .slice(0, 16);

  return encryptText(messageString, key, iv);
}

module.exports = encryptMessage;
