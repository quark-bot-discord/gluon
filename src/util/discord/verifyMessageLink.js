import { LIMITS } from "../../constants.js";

/**
 * Whether the string provided contains a valid message link.
 * @param {String} text A url to a Discord message.
 * @returns {String?} The link to a message, if it is present.
 */
function verifyMessageLink(text) {
  if (typeof text !== "string")
    throw new TypeError("GLUON: The text must be a string.");

  if (text.length === 0) return null;

  if (text.length > LIMITS.MAX_NITRO_MESSAGE_CONTENT)
    throw new RangeError(
      `GLUON: Text must be less than ${LIMITS.MAX_NITRO_MESSAGE_CONTENT} characters.`,
    );

  const messageLink = text.match(
    /(https?:\/\/)(.+[a-z]\.)?(discord\.com|discordapp\.com)\/(channels)\/(.[0-9]+)\/(.[0-9]+)\/(.[0-9]+)/g,
  );

  if (messageLink) return messageLink[0];
  else return null;
}

export default verifyMessageLink;
