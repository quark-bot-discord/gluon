const { CDN_BASE_URL, PERMISSIONS } = require("../constants");
const User = require("./User");
const checkPermission = require("../util/checkPermission");

class Member {

    constructor(client, data, user_id, guild_id, user, nocache = false, ignoreNoCache = false) {

        this.client = client;

        this.guild = this.client.guilds.cache.get(guild_id) || null;

        if (!this.guild)
            this.guild_id = BigInt(guild_id);

        const existing = this.guild?.members.cache.get(user_id) || null;

        this.id = BigInt(user_id);

        if (data.user)
            this.user = new User(this.client, data.user, nocache);
        else if (existing && existing.user)
            this.user = existing.user;
        else if (user)
            this.user = user;
        else
            this.user = this.client.users.cache.get(user_id) || null;

        if (data.nick != undefined)
            this.nick = data.nick;
        else if (data.nick !== null && existing && existing.nick != undefined)
            this.nick = existing.nick;

        this.joined_at = (new Date(data.joined_at).getTime() / 1000) | 0;

        this.timeout_until = data.communication_disabled_until ? (new Date(data.communication_disabled_until).getTime() / 1000) | 0 : null;

        this._attributes = 0;

        if (data.pending == true)
            this._attributes |= (0b1 << 0);

        if (data.avatar && data.avatar.startsWith("a_") == true)
            this._attributes |= (0b1 << 1);

        this.avatar = data.avatar ? BigInt("0x" + data.avatar.replace("a_", "")) : null;

        if (typeof data.permissions == "string")
            this._permissions = BigInt(data.permissions);

        if (data.roles && this.guild && this.client.cacheRoles == true) {
            this._roles = [];
            for (let i = 0; i < data.roles.length; i++)
                this._roles.push(BigInt(data.roles[i]));
        }

        if ((this.id == this.client.user.id) || (nocache == false && (this.client.cacheMembers == true && ignoreNoCache == false)))
            this.client.guilds.cache.get(guild_id)?.members.cache.set(user_id, this);

    }

    get roles() {

        if (this.client.cacheRoles != true)
            return [];

        let roles = [];

        roles.push(this.guild.roles.cache.get(this.guild?.id.toString() || this.guild_id?.toString()));

        if (!this._roles)
            return roles;

        for (let i = 0; i < this._roles.length; i++) {
            const role = this.guild.roles.cache.get(this._roles[i].toString());
            if (role)
                roles.push(role);
        }

        return roles;

    }

    get highestRolePosition() {

        let highestPosition = 0;

        const roles = this.roles;

        for (let i = 0; i < roles.length; i++)
            if (roles[i].position > highestPosition)
                highestPosition = roles[i].position;

        return highestPosition;

    }

    get permissions() {

        if (this.id == this.guild.owner_id)
            return PERMISSIONS.ADMINISTRATOR;

        let permissions = 0n;

        const roles = this.roles;

        if (roles.length != 0) {
            for (let i = 0; i < roles.length; i++)
                permissions |= roles[i].permissions;
            return permissions;
        } else
            return 0n;

    }

    get originalAvatarHash() {

        return this.avatar ?
            // eslint-disable-next-line quotes
            `${this.avatarIsAnimated ? "a_" : ''}${this.formattedAvatarHash}` :
            null;

    }

    get formattedAvatarHash() {

        let formattedHash = this.avatar.toString(16);

        while (formattedHash.length != 32)
            // eslint-disable-next-line quotes
            formattedHash = '0' + formattedHash;

        return formattedHash;

    }

    get displayAvatarURL() {

        return this.avatar ?
            // eslint-disable-next-line quotes
            `${CDN_BASE_URL}/guilds/${this.guild.id}/${this.user.id}/avatars/${this.originalAvatarHash}.${this.avatarIsAnimated ? "gif" : "png"}` :
            this.user.displayAvatarURL;

    }

    get pending() {

        return (this._attributes & (0b1 << 0)) == (0b1 << 0);

    }

    /**
     * Whether the user has an animated avatar or not.
     * @readonly
     * @type {Boolean}
     */
    get avatarIsAnimated() {

        return (this._attributes & (0b1 << 1)) == (0b1 << 1);

    }

    async addRole(role_id, { reason } = {}) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.MANAGE_ROLES))
            return null;

        const body = {};

        if (reason)
            body["X-Audit-Log-Reason"] = reason;

        await this.client.request.makeRequest("putAddGuildMemberRole", [this.guild?.id || this.guild_id, this.id, role_id], body);

    }

    async removeRole(role_id, { reason } = {}) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.MANAGE_ROLES))
            return null;

        const body = {};

        if (reason)
            body["X-Audit-Log-Reason"] = reason;

        await this.client.request.makeRequest("deleteRemoveMemberRole", [this.guild?.id || this.guild_id, this.id, role_id], body);


    }

    async timeoutAdd(timeout_until, { reason }) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.MODERATE_MEMBERS))
            return null;

        const body = {};

        if (reason)
            body["X-Audit-Log-Reason"] = reason;

        body.communication_disabled_until = timeout_until;

        await this.client.request.makeRequest("patchGuildMember", [this.guild?.id || this.guild_id, this.id], body);

    }

    async timeoutRemove({ reason }) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.MODERATE_MEMBERS))
            return null;

        const body = {};

        if (reason)
            body["X-Audit-Log-Reason"] = reason;

        body.communication_disabled_until = null;

        await this.client.request.makeRequest("patchGuildMember", [this.guild?.id || this.guild_id, this.id], body);

    }

}

module.exports = Member;