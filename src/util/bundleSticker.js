function bundleSticker(sticker) {
    const data = {};
    data.id = sticker.id.toString();
    data.name = sticker.name;
    data.format_type = sticker.format_type;
    return data;
}

module.exports = bundleSticker;