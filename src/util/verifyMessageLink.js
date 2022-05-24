function verifyMessageLink(text) {

    const messageLink = text.match(/(https?:\/\/)(.+[a-z]\.)?(discord\.com|discordapp\.com)\/(channels)\/(.[0-9]+)\/(.[0-9]+)\/(.[0-9]+)/g);

    if (messageLink)
        return messageLink[0];
    else
        return null;

}

module.exports = verifyMessageLink;