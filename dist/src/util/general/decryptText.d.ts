/**
 * Decrypts text and returns the plain text.
 * @param {String} text The text to decrypt.
 * @param {CipherKey} key The key used for encryption, must be 32 characters in length.
 * @param {BinaryLike} iv The iv used for encryption, must be 16 characters in length.
 * @returns {String}
 * @see {@link https://stackoverflow.com/questions/32038267/getting-error-wrong-final-block-length-when-decrypting-aes256-cipher}
 */
declare function decryptText(text: any, key: any, iv: any): string;
export default decryptText;
