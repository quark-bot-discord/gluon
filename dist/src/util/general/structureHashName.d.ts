/**
 * Generates a SHA-512 hash from a list of string IDs.
 *
 * @param {...string[]} ids - A list of string IDs to be hashed. At least one ID must be provided.
 * @returns {string} The resulting SHA-512 hash in hexadecimal format.
 * @throws {TypeError} If no IDs are provided or if any of the IDs are not strings.
 */
declare function structureHashName(...ids: string[]): string;
export default structureHashName;
