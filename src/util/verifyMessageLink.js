/**
 * Whether the string provided contains a valid message link.
 * @param {String} text A url to a Discord message.
 * @returns {String?} The link to a message, if it is present.
 */
function verifyMessageLink(text) {
  const messageLink = text.match(
    /(https?:\/\/)(.+[a-z]\.)?(discord\.com|discordapp\.com)\/(channels)\/(.[0-9]+)\/(.[0-9]+)\/(.[0-9]+)/g,
  );

  if (messageLink) return messageLink[0];
  else return null;
}

module.exports = verifyMessageLink;
