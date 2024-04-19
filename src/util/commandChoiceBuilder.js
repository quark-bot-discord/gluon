class CommandChoice {

    constructor() {

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

    setValue(value) {

        this.value = value;

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
            value: this.value
        };

    }

}

module.exports = CommandChoice;