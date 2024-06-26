const bundleUser = require("./bundleUser");

/**
 * Copies all the invite data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for an invite as the "data" parameter to reconstruct this.
 * @param {Invite} invite An invite to bundle.
 * @returns {Object}
 */
function bundleInvite(invite) {
    const data = {};
    data.code = invite.code;
    // data.channel_id = invite.channel ? invite.channel.id.toString() : invite.channel_id.toString();
    if (invite.inviter)
        data.inviter = bundleUser(invite.inviter);
    if (typeof invite.uses == "number")
        data.uses = invite.uses;
    if (invite.expires)
        data.expires = invite.expires;
    return data;
}

module.exports = bundleInvite;