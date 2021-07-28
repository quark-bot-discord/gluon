/* eslint-disable quotes */
function resolveEmoji(text) {
    const emojis = text.match(/<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>/g);
    if (!emojis || emojis.length == 0)
        return null;
    const splitEmoji = emojis[0].replace(/<|>/g, '').split(':');
    return {
        id: splitEmoji[2],
        name: splitEmoji[1],
        animated: splitEmoji[0] == 'a' ? true : false
    };
}

module.exports = resolveEmoji;