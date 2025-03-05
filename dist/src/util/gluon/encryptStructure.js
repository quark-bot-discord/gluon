import { JsonTypes } from "#typings/enums.js";
import encryptText from "../general/encryptText.js";
import getKeyIv from "./getKeyIv.js";
/**
 * Encrypts a structure and returns an encrypted string.
 * @param {Object} structure The structure to encrypt.
 * @param {...String} encryptionKeys The encryption keys to use.
 * @returns {String}
 */
function encryptStructure(structure, ...encryptionKeys) {
  if (!structure) throw new TypeError("GLUON: Structure must be provided.");
  if (!(structure instanceof Object))
    throw new TypeError("GLUON: Structure must be a valid structure.");
  if (typeof structure.toJSON !== "function")
    throw new TypeError("GLUON: Structure must have a toJSON method.");
  if (
    !encryptionKeys ||
    encryptionKeys.length === 0 ||
    !encryptionKeys.every((key) => typeof key === "string")
  )
    throw new TypeError("GLUON: An encryption key must be provided.");
  const stringifyableObject = structure.toJSON(JsonTypes.STORAGE_FORMAT);
  const structureString = JSON.stringify(stringifyableObject);
  const { key, iv } = getKeyIv(...encryptionKeys);
  return encryptText(structureString, key, iv);
}
export default encryptStructure;
//# sourceMappingURL=encryptStructure.js.map
