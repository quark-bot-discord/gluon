import hash from "hash.js";

/**
 * Returns a key and iv for encryption and decryption.
 * @param  {...String} args The arguments to generate the key and iv.
 * @returns {Object}
 */
function getKeyIv(...args: any[]) {
  if (!args || args.length === 0)
    throw new TypeError("GLUON: At least one argument must be provided.");
  if (!args.every((arg) => typeof arg === "string"))
    throw new TypeError("GLUON: Arguments must be strings.");

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

export default getKeyIv;
