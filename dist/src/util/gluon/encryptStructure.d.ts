/**
 * Encrypts a structure and returns an encrypted string.
 * @param {Object} structure The structure to encrypt.
 * @param {...String} encryptionKeys The encryption keys to use.
 * @returns {String}
 */
declare function encryptStructure(
  structure: any,
  ...encryptionKeys: any[]
): string;
export default encryptStructure;
