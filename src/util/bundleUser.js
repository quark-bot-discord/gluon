function bundleUser(user) {
    const data = {};
    data.id = user.id.toString();
    data.avatar = user.avatar;
    data.bot = user.bot;
    data.username = user.username;
    data.discriminator = user.discriminator;
    return data;
}

module.exports = bundleUser;