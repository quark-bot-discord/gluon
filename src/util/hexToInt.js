function hexToInt(hex) {

    hex = hex.split("");
    hex.unshift("0x");
    hex = hex.join("");

    return parseInt(Number(hex));

}

module.exports = hexToInt;