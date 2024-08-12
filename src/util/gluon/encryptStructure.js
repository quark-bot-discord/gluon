import encryptText from "../general/encryptText.js";
import { TO_JSON_TYPES_ENUM } from "../../constants.js";
import getKeyIv from "./getKeyIv.js";

/**
 * Encrypts a structure and returns an encrypted string.
 * @param {Object} structure The structure to encrypt.
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

  const stringifyableObject = structure.toJSON(
    TO_JSON_TYPES_ENUM.STORAGE_FORMAT,
  );
  const structureString = JSON.stringify(stringifyableObject);

  const { key, iv } = getKeyIv(...encryptionKeys);

  return encryptText(structureString, key, iv);
}

export default encryptStructure;
