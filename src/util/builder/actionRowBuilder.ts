import {
  COMPONENT_TYPES,
  LIMITS,
  TO_JSON_TYPES_ENUM,
} from "../../constants.js";
import { ActionRowBuilderType } from "./interfaces/actionRowBuilder.js";
import { ButtonBuilderType } from "./interfaces/buttonBuilder.js";
import { DropdownBuilderType } from "./interfaces/dropdownBuilder.js";
import { TextInputBuilderType } from "./interfaces/textInputBuilder.js";

/**
 * Helps to construct an action row for a message.
 */
class ActionRow implements ActionRowBuilderType {
  components: Array<
    DropdownBuilderType | ButtonBuilderType | TextInputBuilderType
  >;
  type: COMPONENT_TYPES.ACTION_ROW;
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
  addComponent(
    component: DropdownBuilderType | ButtonBuilderType | TextInputBuilderType,
  ) {
    this.components.push(component);

    return this;
  }

  /**
   * Returns the correct Discord format for an action row.
   * @returns {Object}
   */
  toJSON(
    format: TO_JSON_TYPES_ENUM,
    { suppressValidation = false }: { suppressValidation: boolean } = {
      suppressValidation: false,
    },
  ) {
    if (suppressValidation !== true) {
      if (this.components.length > LIMITS.MAX_ACTION_ROW_BUTTONS)
        throw new RangeError(
          `GLUON: Action rows must have less than ${LIMITS.MAX_ACTION_ROW_BUTTONS} buttons.`,
        );
      if (this.type !== COMPONENT_TYPES.ACTION_ROW)
        throw new TypeError(
          `GLUON: Action row type must be set to 'ACTION_ROW' (${COMPONENT_TYPES.ACTION_ROW}).`,
        );
    }
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          type: this.type,
          components: this.components.map((component) =>
            component.toJSON(format, { suppressValidation }),
          ),
        };
      }
    }
  }
}

export default ActionRow;
