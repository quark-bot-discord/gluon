import hash from "hash.js";

function structureHashName(...ids) {
  return hash.sha512().update(ids.join("_")).digest("hex");
}

export default structureHashName;
