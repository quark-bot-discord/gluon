const bundleUser = require("./bundleUser");

function bundleMember(member) {
    const data = {};
    const bundledUser = bundleUser(member.user);
    if (!bundledUser)
        return undefined;
    data.user = bundledUser;
    data.nick = member.nick;
    data.joined_at = member.joined_at;
    data.communication_disabled_until = member.timeout_until;
    data.avatar = member.originalAvatarHash;
    data.permissions = member.permissions?.toString();
    data.roles = member.roles.map(r => r.id.toString());
    data.communication_disabled_until = member.timeout_until * 1000;
    data._attributes = member._attributes;
    return data;
}

module.exports = bundleMember;