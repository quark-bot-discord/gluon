const { APPLICATION_COMMAND_TYPES } = require("../constants");

// https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
class Command {

    constructor() {

        this.type = APPLICATION_COMMAND_TYPES.CHAT_INPUT;

        this.dm_permission = false;

        this.options = [];

    }

    setName(name) {

        this.name = name;

        return this;

    }

    setType(type) {

        this.type = type;

        return this;

    }

    setDescription(description) {

        this.description = description;

        return this;

    }

    setDefaultMemberPermissions(permissions) {

        this.default_member_permissions = permissions;

        return this;

    }

    setDmPermission(dmPermission) {

        this.dm_permission = dmPermission;

        return this;

    }

    setNsfw(nsfw) {

        this.nsfw = nsfw;

        return this;

    }

    addOption(option) {

        this.options.push(option.toJSON());

        return this;

    }

    toJSON() {

        return {
            name: this.name,
            type: this.type,
            description: this.description,
            default_member_permissions: this.default_member_permissions,
            dm_permission: this.dm_permission,
            nsfw: this.nsfw,
            options: this.options
        };

    }

}

module.exports = Command;