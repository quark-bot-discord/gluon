import hash from "hash.js";

function getKeyIv(...args) {
  console.log(args);
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
