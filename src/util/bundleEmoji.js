/**
 * Copies all the emoji data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for an emoji as the "data" parameter to reconstruct this.
 * @param {Emoji} emoji An emoji to bundle.
 * @returns {Object}
 */
function bundleEmoji(emoji) {
    const data = {};
    data.id = emoji.id.toString();
    data.name = emoji.name;
    data._attributes = emoji._attributes;
    return data;
}

module.exports = bundleEmoji;