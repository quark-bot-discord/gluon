function deepCompare(object0, object1) {

    const keys0 = Object.keys(object0);
    const keys1 = Object.keys(object1);
    const keys = [...new Set(keys0.concat(keys1))];

    let updatedFields = [];

    for (let i = 0; i < keys.length; i++) {

        if (object0[keys[i]] != object1[keys[i]])
            updatedFields.push(keys[i]);

    }

    return updatedFields;

}

module.exports = deepCompare;