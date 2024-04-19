const { APPLICATION_COMMAND_TYPES } = require("../constants");

// https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
class Command {

    constructor() {

        this.type = APPLICATION_COMMAND_TYPES.CHAT_INPUT;

        this.dm_permission = false;

        this.options = [];

        this.defaultLocale = "en-US";

    }

    setName(name) {

        if (typeof name == "object") {

            this.name = name[this.defaultLocale];

            delete name[this.defaultLocale];

            this.name_localizations = name;

        } else
            this.name = name;

        return this;

    }

    setType(type) {

        this.type = type;

        return this;

    }

    setDescription(description) {

        if (typeof description == "object") {

            this.description = description[this.defaultLocale];

            delete description[this.defaultLocale];

            this.description_localizations = description;

        } else
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

    // https://discord.com/developers/docs/reference#locales
    setDefaultLocale(locale = "en-US") {

        this.defaultLocale = locale;

        return this;

    }

    toJSON() {

        return {
            name: this.name,
            name_localizations: this.name_localizations,
            type: this.type,
            description: this.description,
            description_localizations: this.description_localizations,
            default_member_permissions: Number(this.default_member_permissions),
            dm_permission: this.dm_permission,
            nsfw: this.nsfw,
            options: this.options
        };

    }

}

module.exports = Command;