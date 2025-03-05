import type {
  ActionRowBuilder as ActionRowBuilderType,
  ButtonBuilder as ButtonBuilderType,
  DropdownBuilder as DropdownBuilderType,
  TextInputBuilder as TextInputBuilderType,
} from "typings/index.d.ts";
import { LIMITS } from "../../constants.js";
import { ComponentType } from "#typings/discord.js";
import { JsonTypes } from "../../../typings/enums.js";

/**
 * Helps to construct an action row for a message.
 */
class ActionRow implements ActionRowBuilderType {
  components: Array<
    DropdownBuilderType | ButtonBuilderType | TextInputBuilderType
  >;
  type: ComponentType.ActionRow;
  /**
   * Creates an action row.
   */
  constructor() {
    this.type = ComponentType.ActionRow;
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
    format?: JsonTypes,
    { suppressValidation = false }: { suppressValidation: boolean } = {
      suppressValidation: false,
    },
  ) {
    if (suppressValidation !== true) {
      if (this.components.length > LIMITS.MAX_ACTION_ROW_BUTTONS)
        throw new RangeError(
          `GLUON: Action rows must have less than ${LIMITS.MAX_ACTION_ROW_BUTTONS} buttons.`,
        );
      if (this.type !== ComponentType.ActionRow)
        throw new TypeError(
          `GLUON: Action row type must be set to 'ACTION_ROW' (${ComponentType.ActionRow}).`,
        );
    }
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
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
