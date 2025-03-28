/**
 * Compares each property of an object and returns an array of the property names which are unique in their value across the objects.
 * @param {Object} object0
 * @param {Object} object1
 * @returns {Array<String>}
 */
export function deepCompare(object0, object1) {
  if (typeof object0 != "object")
    throw new TypeError("GLUON: First argument must be an object.");
  if (typeof object1 != "object")
    throw new TypeError("GLUON: Second argument must be an object.");
  if (object0 === object1) return [];
  const keys0 = Object.keys(object0);
  const keys1 = Object.keys(object1);
  const keys = [...new Set(keys0.concat(keys1))];
  const updatedFields = [];
  for (let i = 0; i < keys.length; i++) {
    if (object0[keys[i]] != object1[keys[i]]) {
      updatedFields.push(keys[i]);
    }
  }
  return updatedFields;
}
//# sourceMappingURL=deepCompare.js.map
