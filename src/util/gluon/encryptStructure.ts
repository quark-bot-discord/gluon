import { JsonTypes } from "#typings/enums.js";
import { encryptText } from "../general/encryptText.js";
import { getKeyIv } from "./getKeyIv.js";

export interface EncryptStructure {
  toJSON(format: JsonTypes): object;
}

/**
 * Encrypts a given structure using the provided encryption keys.
 *
 * @param structure - The structure to be encrypted, which must implement the `EncryptStructure` interface.
 * @param encryptionKeys - A list of encryption keys used to generate the encryption key and initialization vector (IV).
 * @returns The encrypted text representation of the structure.
 */
function encryptStructure(
  structure: EncryptStructure,
  ...encryptionKeys: string[]
) {
  const stringifyableObject = structure.toJSON(JsonTypes.STORAGE_FORMAT);
  const structureString = JSON.stringify(stringifyableObject);

  const { key, iv } = getKeyIv(...encryptionKeys);

  return encryptText(structureString, key, iv);
}

export default encryptStructure;
