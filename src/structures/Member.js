const { CDN_BASE_URL, PERMISSIONS } = require("../constants");
const User = require("./User");
const checkPermission = require("../util/checkPermission");
const Role = require("./Role");

class Member {

    constructor(client, data, user_id, guild_id, user, nocache = false) {

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

        if (data.pending == true)
            this.pending = data.pending;

        this.avatar = data.avatar;

        if (typeof data.permissions == "string")
            this.permissions = parseInt(data.permissions);
        else if (existing && typeof existing.permissions == "number")
            this.permissions = existing.permissions;

        if (data.roles && this.guild && this.client.cacheRoles == true) {
            this.highestRolePosition = 0;
            this.roles = [];
            for (let i = 0; i < data.roles.length; i++) {
                const role = this.guild.roles.cache.get(data.roles[i]);
                if (!role)
                    continue;
                this.roles.push(role);
                if (role.position > this.highestRolePosition)
                    this.highestRolePosition = role.position;
            }
        } else
            this.highestRolePosition = 0;

        if (this.roles && this.roles.length != 0 && !this.permissions) {
            this.permissions = 0;
            for (let i = 0; i < this.roles.length; i++)
                this.permissions |= this.roles[i].permissions;
        }

        if ((this.id == this.client.user.id) || (nocache == false && this.client.cacheMembers == true))
            this.client.guilds.cache.get(guild_id)?.members.cache.set(user_id, this);

    }
    /* https://github.com/discord/discord-api-docs/pull/3081/files 👀 */
    get displayAvatarURL() {

        return this.avatar ?
            `${CDN_BASE_URL}/guilds/${this.guild.id}/${this.user.id}/avatars/${this.avatar}.${this.avatar.startsWith("a_") ? "gif" : "png"}` :
            this.user?.avatar ?
                `${CDN_BASE_URL}/avatars/${this.user.id}/${this.user.avatar}.${this.user.avatar.startsWith("a_") ? "gif" : "png"}` :
                `${CDN_BASE_URL}/embed/avatars/${this.user.discriminator % 5}.png`;

    }

    async addRole(role_id, { reason } = {}) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.MANAGE_ROLES))
            return null;

        const body = {};

        if (reason)
            body["X-Audit-Log-Reason"] = reason;

        try {

            await this.client.request.makeRequest("putAddGuildMemberRole", [this.guild?.id || this.guild_id, this.id, role_id], body);

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

    async removeRole(role_id, { reason } = {}) {

        if (!checkPermission(await this.guild.me().catch(() => null), PERMISSIONS.MANAGE_ROLES))
            return null;

        const body = {};

        if (reason)
            body["X-Audit-Log-Reason"] = reason;

        try {

            await this.client.request.makeRequest("deleteRemoveMemberRole", [this.guild?.id || this.guild_id, this.id, role_id], body);

        } catch (error) {

            this.client.error(error.stack?.toString() || JSON.stringify(error) || error.toString());
            throw error;

        }

    }

}

module.exports = Member;