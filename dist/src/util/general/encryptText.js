// credit: https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher
import { createCipheriv } from "crypto";
/**
 * Encrypts text and returns the plain text.
 * @param {String} text The text to encrypt.
 * @param {CipherKey} key The key to use for encryption.
 * @param {BinaryLike} iv The iv to use for encryption.
 * @returns {String}
 * @see {@link https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher}
 */
export function encryptText(text, key, iv) {
  if (key.length !== 32)
    throw new RangeError("GLUON: Encryption key must be 32 characters long.");
  if (iv.length !== 16)
    throw new RangeError("GLUON: Encryption IV must be 16 characters long.");
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  return Buffer.concat([cipher.update(text), cipher.final()]).toString(
    "base64",
  );
}
//# sourceMappingURL=encryptText.js.map
