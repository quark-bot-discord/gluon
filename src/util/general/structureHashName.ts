import hash from "hash.js";

/**
 * Returns a hashed name.
 * @param  {...String} ids The IDs to structure the hash name.
 * @returns {String}
 */
function structureHashName(...ids: any[]) {
  if (!ids || ids.length === 0)
    throw new TypeError("GLUON: At least one ID must be provided.");
  if (!ids.every((id) => typeof id === "string"))
    throw new TypeError("GLUON: IDs must be strings.");
  return hash.sha512().update(ids.join("_")).digest("hex");
}

export default structureHashName;
