/**
 * Copies all the user data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for a user as the "data" parameter to reconstruct this.
 * @param {User} user A user to bundle.
 * @returns {Object}
 */
function bundleUser(user) {
    if (!user)
        return undefined;
    const data = {};
    data.id = user.id.toString();
    data.avatar = user.originalAvatarHash;
    data.bot = user.bot;
    data.username = user.username;
    if (user.discriminator)
        data.discriminator = user.discriminator;
    return data;
}

module.exports = bundleUser;