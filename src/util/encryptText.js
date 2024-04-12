// credit: https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher
const { createCipheriv } = require("crypto");

function encryptText(text, key, iv) {

    const cipher = createCipheriv("aes-256-cbc", key, iv);

    return Buffer.concat([
        cipher.update(text),
        cipher.final()
    ]).toString("base64");

}

module.exports = encryptText;