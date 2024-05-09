const bundleUser = require("./bundleUser");

/**
 * Copies all the member data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for a member as the "data" parameter to reconstruct this.
 * @param {Member} member A member to bundle.
 * @returns {Object}
 */
function bundleMember(member) {
    const data = {};
    const bundledUser = bundleUser(member.user);
    if (!bundledUser)
        return undefined;
    data.user = bundledUser;
    data.nick = member.nick;
    data.joined_at = member.joined_at ? member.joined_at * 1000 : undefined;
    data.avatar = member.originalAvatarHash;
    data.permissions = member.permissions?.toString();
    data.roles = member.roles.map(r => r.id.toString());
    data.communication_disabled_until = member.timeout_until ? member.timeout_until * 1000 : undefined;
    data._attributes = member._attributes;
    return data;
}

module.exports = bundleMember;