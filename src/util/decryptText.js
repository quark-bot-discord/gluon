// credit: https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher
const { createDecipheriv } = require("crypto");

/**
 * Decrypts text and returns the plain text.
 * @param {String} text The text to decrypt.
 * @param {CipherKey} key The key used for encryption.
 * @param {BinaryLike} iv The iv used for encryption.
 * @returns {String}
 * @see {@link https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher}
 */
function decryptText(text, key, iv) {
  if (!text) return null;

  const decipher = createDecipheriv("aes-256-cbc", key, iv);

  return Buffer.concat([
    decipher.update(text, "base64"),
    decipher.final(),
  ]).toString();
}

module.exports = decryptText;
