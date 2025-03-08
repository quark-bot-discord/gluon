// credit: https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher
import { createDecipheriv } from "crypto";
/**
 * Decrypts text and returns the plain text.
 * @param {String} text The text to decrypt.
 * @param {CipherKey} key The key used for encryption, must be 32 characters in length.
 * @param {BinaryLike} iv The iv used for encryption, must be 16 characters in length.
 * @returns {String}
 * @see {@link https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher}
 */
function decryptText(text, key, iv) {
  if (key.length !== 32)
    throw new RangeError("GLUON: Decryption key must be 32 characters long.");
  if (iv.length !== 16)
    throw new RangeError("GLUON: Decryption IV must be 16 characters long.");
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  return Buffer.concat([
    decipher.update(text, "base64"),
    decipher.final(),
  ]).toString();
}
export default decryptText;
//# sourceMappingURL=decryptText.js.map
