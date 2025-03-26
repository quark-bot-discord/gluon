import hash from "hash.js";

/**
 * Generates a SHA-512 hash from a list of string IDs.
 *
 * @param {...string[]} ids - A list of string IDs to be hashed. At least one ID must be provided.
 * @returns {string} The resulting SHA-512 hash in hexadecimal format.
 * @throws {TypeError} If no IDs are provided or if any of the IDs are not strings.
 */
function structureHashName(...ids: string[]) {
  if (!ids || ids.length === 0)
    throw new TypeError("GLUON: At least one ID must be provided.");
  if (!ids.every((id) => typeof id === "string"))
    throw new TypeError("GLUON: IDs must be strings.");
  return hash.sha512().update(ids.join("_")).digest("hex");
}

export default structureHashName;
