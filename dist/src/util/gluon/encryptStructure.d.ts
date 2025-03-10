import { JsonTypes } from "#typings/enums.js";
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
declare function encryptStructure(
  structure: EncryptStructure,
  ...encryptionKeys: string[]
): string;
export default encryptStructure;
