const { COMPONENT_TYPES } = require("../constants");
const resolveEmoji = require("./resolveEmoji");

class Button {

    constructor() {

        this.type = COMPONENT_TYPES.BUTTON;

    }

    setLabel(label) {

        this.label = label;

        return this;

    }

    setEmoji(emoji) {

        this.emoji = resolveEmoji(emoji);

        return this;

    }

    setStyle(style) {

        this.style = style;

        return this;

    }

    setCustomID(id) {

        this.custom_id = id;

        return this;

    }

    setURL(url) {

        this.url = url;

        return this;

    }

    setDisabled(disabled) {

        this.disabled = disabled;

        return this;

    }

    toJSON() {

        return {
            type: this.type,
            label: this.label,
            emoji: this.emoji,
            style: this.style,
            custom_id: this.custom_id,
            url: this.url,
            disabled: this.disabled
        };

    }

}

module.exports = Button;