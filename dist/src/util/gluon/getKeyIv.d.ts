/**
 * Generates a key and initialization vector (IV) based on the provided arguments.
 *
 * @param {...string[]} args - The arguments used to generate the key and IV.
 * @returns {Object} An object containing the generated key and IV.
 * @returns {string} key - The generated key, a 32-character hexadecimal string.
 * @returns {string} iv - The generated IV, a 16-character hexadecimal string.
 */
export declare function getKeyIv(...args: string[]): {
  key: string;
  iv: string;
};
