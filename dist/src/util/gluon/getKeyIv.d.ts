/**
 * Returns a key and iv for encryption and decryption.
 * @param  {...String} args The arguments to generate the key and iv.
 * @returns {Object}
 */
declare function getKeyIv(...args: any[]): {
  key: string;
  iv: string;
};
export default getKeyIv;
