const { APPLICATION_COMMAND_OPTION_TYPES } = require("../constants");

// https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
class CommandOption {

    constructor() {

        this.choices = [];

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

    setRequired(isRequired) {

        this.required = isRequired;

        return this;

    }

    addChoice(choice) {

        this.choices.push(choice.toJSON());

        return this;
        
    }

    addOption(option) {

        this.options.push(option.toJSON());

        return this;

    }
    // array of channel types (numbers)
    setChannelTypes(channelTypes) {

        this.channel_types = channelTypes;

        return this;

    }

    setMinValue(value) {

        this.min_value = value;

        return this;

    }

    setMaxValue(value) {

        this.max_value = value;

        return this;

    }

    setMinLength(length) {

        this.min_length = length;

        return this;

    }

    setMaxLength(length) {

        this.max_length = length;

        return this;

    }

    setAutocomplete(autocomplete) {

        this.autocomplete = autocomplete;

        return this;

    }

    toJSON() {

        return {
            name: this.name,
            type: this.type,
            description: this.description,
            required: this.required,
            choices: this.choices,
            options: this.options,
            channel_types: this.channel_types,
            min_value: this.min_value,
            max_value: this.max_value,
            min_length: this.min_length,
            max_length: this.max_length,
            autocomplete: this.autocomplete
        };

    }

}

module.exports = CommandOption;