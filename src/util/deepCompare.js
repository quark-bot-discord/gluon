/**
 * Compares each property of an object and returns an array of the property names which are unique in their value across the objects.
 * @param {Object} object0
 * @param {Object} object1
 * @returns {Array<String>}
 */
function deepCompare(object0, object1) {
  const keys0 = Object.keys(object0);
  const keys1 = Object.keys(object1);
  const keys = [...new Set(keys0.concat(keys1))];

  let updatedFields = [];

  for (let i = 0; i < keys.length; i++) {
    if (object0[keys[i]] != object1[keys[i]]) updatedFields.push(keys[i]);
  }

  return updatedFields;
}

module.exports = deepCompare;
