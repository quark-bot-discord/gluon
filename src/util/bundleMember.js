const bundleUser = require("./bundleUser");

function bundleMember(member) {
    const data = {};
    data.user = bundleUser(member.user);
    data.nick = member.nick;
    data.joined_at = member.joined_at;
    data.pending = member.pending;
    data.avatar = member.avatar;
    data.permissions = member.permissions?.toString();
    data.roles = member.roles.map(r => r.id.toString());
    return data;
}

module.exports = bundleMember;