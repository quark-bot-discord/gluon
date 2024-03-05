function bundleEmoji(emoji) {
    const data = {};
    data.id = emoji.id.toString();
    data.name = emoji.name;
    return data;
}

module.exports = bundleEmoji;