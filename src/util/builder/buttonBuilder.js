const { COMPONENT_TYPES } = require("../../constants");
const resolveEmoji = require("../discord/resolveEmoji");

/**
 * Helps to construct a button for a message.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-structure}
 */
class Button {
  /**
   * Creates a button.
   */
  constructor() {
    this.type = COMPONENT_TYPES.BUTTON;
  }

  /**
   * Sets the text on the button.
   * @param {String} label The text to display on the button.
   * @returns {Button}
   */
  setLabel(label) {

    if (!label) throw new TypeError("GLUON: Button label must be provided.");

    this.label = label;

    return this;
  }

  /**
   * Sets the emoji to be displayed on the button.
   * @param {String} emoji The emoji to display on the button. For a custom emoji, it should be in the format "<:bitcoin:844240546246950922>".
   * @returns {Button}
   */
  setEmoji(emoji) {
    this.emoji = resolveEmoji(emoji);

    if (!this.emoji) throw new TypeError("GLUON: Button emoji must be provided.");

    return this;
  }

  /**
   * Sets the style of the button.
   * @param {Number} style The button style.
   * @returns {Button}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-styles}
   */
  setStyle(style) {
    this.style = style;

    return this;
  }

  /**
   * Set the custom id of the button.
   * @param {String} id The custom id of the button.
   * @returns {Button}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
   */
  setCustomID(id) {
    this.custom_id = id;

    return this;
  }

  /**
   * Sets the url of the button.
   * @param {String} url The url for a link button.
   * @returns {Button}
   */
  setURL(url) {
    this.url = url;

    return this;
  }

  /**
   * Disables the button from being clickable.
   * @param {Boolean} disabled Whether this button should be displayed as disabled.
   * @returns {Button}
   */
  setDisabled(disabled) {
    this.disabled = disabled;

    return this;
  }

  /**
   * Returns the correct Discord format for a button.
   * @returns {Object}
   */
  toJSON() {
    return {
      type: this.type,
      label: this.label,
      emoji: this.emoji,
      style: this.style,
      custom_id: this.custom_id,
      url: this.url,
      disabled: this.disabled,
    };
  }
}

module.exports = Button;
