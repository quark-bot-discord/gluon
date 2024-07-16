// credit: https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher
const { createCipheriv } = require("crypto");

/**
 * Encrypts text and returns the plain text.
 * @param {String} text The text to encrypt.
 * @param {CipherKey} key The key to use for encryption.
 * @param {BinaryLike} iv The iv to use for encryption.
 * @returns {String}
 * @see {@link https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher}
 */
function encryptText(text, key, iv) {
  const cipher = createCipheriv("aes-256-cbc", key, iv);

  return Buffer.concat([cipher.update(text), cipher.final()]).toString(
    "base64"
  );
}

module.exports = encryptText;
