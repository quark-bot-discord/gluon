import {
  JsonTypes,
  ActionRowBuilder as ActionRowBuilderType,
  ButtonBuilder as ButtonBuilderType,
  DropdownBuilder as DropdownBuilderType,
  TextInputBuilder as TextInputBuilderType,
} from "typings/index.js";
import { ComponentType } from "discord-api-types/v10";
/**
 * Helps to construct an action row for a message.
 */
declare class ActionRow implements ActionRowBuilderType {
  components: Array<
    DropdownBuilderType | ButtonBuilderType | TextInputBuilderType
  >;
  type: ComponentType.ActionRow;
  /**
   * Creates an action row.
   */
  constructor();
  /**
   * Adds a component to the action row.
   * @param {Button | Dropdown} component A component to add to the action row.
   * @returns {ActionRow}
   */
  addComponent(
    component: DropdownBuilderType | ButtonBuilderType | TextInputBuilderType,
  ): this;
  /**
   * Returns the correct Discord format for an action row.
   * @returns {Object}
   */
  toJSON(
    format?: JsonTypes,
    {
      suppressValidation,
    }?: {
      suppressValidation: boolean;
    },
  ): {
    type: ComponentType.ActionRow;
    components: (
      | import("typings/index.js").DropdownBuilderCacheJSON
      | import("typings/index.js").ButtonBuilderCacheJSON
      | import("typings/index.js").TextInputBuilderCacheJSON
    )[];
  };
}
export default ActionRow;
