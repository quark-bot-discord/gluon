import hash from "hash.js";
/**
 * Generates a key and initialization vector (IV) based on the provided arguments.
 *
 * @param {...string[]} args - The arguments used to generate the key and IV.
 * @returns {Object} An object containing the generated key and IV.
 * @returns {string} key - The generated key, a 32-character hexadecimal string.
 * @returns {string} iv - The generated IV, a 16-character hexadecimal string.
 */
export function getKeyIv(...args) {
  const key = hash
    .sha512()
    .update(
      `${hash.sha512().update(args.join("_")).digest("hex")}satoshiNakamoto`,
    )
    .digest("hex")
    .slice(0, 32);
  const iv = hash
    .sha512()
    .update(`${hash.sha512().update(args.join("_")).digest("hex")}${args[0]}`)
    .digest("hex")
    .slice(0, 16);
  return { key, iv };
}
//# sourceMappingURL=getKeyIv.js.map
