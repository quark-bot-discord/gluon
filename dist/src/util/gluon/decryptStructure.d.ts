/**
 * Decrypts a message and returns the message structure for it.
 * @param {String} encryptedMessage The encrypted message.
 * @param {...String} decryptionKeys The decryption keys to use.
 * @returns {Message}
 */
declare function decryptStructure(
  encryptedStructure: string,
  ...decryptionKeys: string[]
): any;
export default decryptStructure;
