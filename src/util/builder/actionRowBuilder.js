import { COMPONENT_TYPES, TO_JSON_TYPES_ENUM } from "../../constants.js";

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
    this.components.push(component);

    return this;
  }

  /**
   * Returns the correct Discord format for an action row.
   * @returns {Object}
   */
  toJSON(
    format,
    { suppressValidation = false } = { suppressValidation: false },
  ) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          type: this.type,
          components: this.components,
        };
      }
    }
  }
}

export default ActionRow;
