const { COMPONENT_TYPES } = require("../../constants");

/**
 * Helps to construct an action row for a message.
 */
class ActionRow {
  /**
   * Creates an action row.
   */
  constructor() {
    this.type = COMPONENT_TYPES.ACTION_ROW;
    this.components = [];
  }

  /**
   * Adds a component to the action row.
   * @param {Button | Dropdown} component A component to add to the action row.
   * @returns {ActionRow}
   */
  addComponent(component) {
    this.components.push(component.toJSON());

    return this;
  }

  /**
   * Returns the correct Discord format for an action row.
   * @returns {Object}
   */
  toJSON() {
    return {
      type: this.type,
      components: this.components,
    };
  }
}

module.exports = ActionRow;
