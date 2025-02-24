/**
 * Encrypts text and returns the plain text.
 * @param {String} text The text to encrypt.
 * @param {CipherKey} key The key to use for encryption.
 * @param {BinaryLike} iv The iv to use for encryption.
 * @returns {String}
 * @see {@link https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher}
 */
declare function encryptText(text: any, key: any, iv: any): string;
export default encryptText;
