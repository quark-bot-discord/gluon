function bundleEmoji(emoji) {
    const data = {};
    data.id = emoji.id.toString();
    data.name = emoji.name;
    data._attributes = emoji._attributes;
    return data;
}

module.exports = bundleEmoji;