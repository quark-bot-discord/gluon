const resolveEmoji = require("./resolveEmoji");

class DropdownOption {

    constructor() {

    }

    setLabel(label) {

        this.label = label;

        return this;

    }

    setValue(value) {

        this.value = value;

        return this;

    }

    setDescription(description) {

        this.description = description;

        return this;

    }

    setEmoji(emoji) {

        this.emoji = resolveEmoji(emoji);

        return this;

    }

    setDefault(isDefault) {

        this.default = isDefault;

        return this;

    }

    toJSON() {

        return {
            label: this.label,
            value: this.value,
            description: this.description,
            emoji: this.emoji,
            default: this.default
        };

    }

}

module.exports = DropdownOption;