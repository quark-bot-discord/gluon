/**
 * Whether the string provided contains a valid message link.
 * @param {String} text A url to a Discord message.
 * @returns {String?} The link to a message, if it is present.
 */
declare function verifyMessageLink(text: any): string | null;
export default verifyMessageLink;
