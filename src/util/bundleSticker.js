/**
 * Copies all the sticker data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for a sticker as the "data" parameter to reconstruct this.
 * @param {Sticker} sticker A sticker to bundle.
 * @returns {Object}
 */
function bundleSticker(sticker) {
    const data = {};
    data.id = sticker.id.toString();
    data.name = sticker.name;
    data.format_type = sticker.format_type;
    return data;
}

module.exports = bundleSticker;