import decryptText from "../general/decryptText.js";
import { getKeyIv } from "./getKeyIv.js";

/**
 * Decrypts a message and returns the message structure for it.
 * @param {String} encryptedMessage The encrypted message.
 * @param {...String} decryptionKeys The decryption keys to use.
 * @returns {Message}
 */
function decryptStructure(
  encryptedStructure: string,
  ...decryptionKeys: string[]
) {
  const { key, iv } = getKeyIv(...decryptionKeys);

  const decryptedStructure = decryptText(encryptedStructure, key, iv);

  return JSON.parse(decryptedStructure);
}

export default decryptStructure;
