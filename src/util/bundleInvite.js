const bundleUser = require("./bundleUser");

/**
 * Copies all the invite data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for an invite as the "data" parameter to reconstruct this.
 * @param {Invite} invite An invite to bundle.
 * @returns {Object}
 */
function bundleInvite(invite) {
    const data = {};
    data.code = invite.code;
    data.guild_id = invite.guild ? invite.guild.id.toString() : invite.guild_id.toString();
    data.channel_id = invite.channel ? invite.channel.id.toString() : invite.channel_id.toString();
    if (invite.inviter)
        data.inviter = bundleUser(invite.inviter);
    return data;
}

module.exports = bundleInvite;