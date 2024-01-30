const { CDN_BASE_URL } = require("../constants");

function getAvatarUrl(hash, id) {
    return hash ?
    // eslint-disable-next-line quotes
    `${CDN_BASE_URL}/avatars/${id}/${hash}.${hash.startsWith("a_") == true ? "gif" : "png"}` :
    `${CDN_BASE_URL}/embed/avatars/${(id >> 22n) % 6n}.png`;
}

module.exports = getAvatarUrl;