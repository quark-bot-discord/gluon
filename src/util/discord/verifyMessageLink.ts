import { LIMITS } from "../../constants.js";

/**
 * Verifies if the given text contains a valid Discord message link.
 *
 * @param text - The text to be verified.
 * @returns The matched Discord message link if found, otherwise `null`.
 * @throws RangeError - If the text length exceeds the maximum allowed limit.
 */
export function verifyMessageLink(text: string) {
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
