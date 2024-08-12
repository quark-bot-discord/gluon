import decryptText from "../general/decryptText.js";
import Message from "../../structures/Message.js";
import getKeyIv from "./getKeyIv.js";

/**
 * Decrypts a message and returns the message structure for it.
 * @param {String} encryptedMessage The encrypted message.
 * @param {...String} decryptionKeys The decryption keys to use.
 * @returns {Message}
 */
function decryptStructure(encryptedStructure, ...decryptionKeys) {
  if (typeof encryptedStructure !== "string")
    throw new TypeError("GLUON: Encrypted structure must be provided.");

  if (
    !decryptionKeys ||
    decryptionKeys.length === 0 ||
    !decryptionKeys.every((key) => typeof key === "string")
  )
    throw new TypeError("GLUON: A decryption key must be provided.");

  const { key, iv } = getKeyIv(...decryptionKeys);

  const decryptedStructure = decryptText(encryptedStructure, key, iv);

  return JSON.parse(decryptedStructure);
}

export default decryptStructure;
