import type {
  ActionRowBuilder as ActionRowBuilderType,
  ButtonBuilder as ButtonBuilderType,
  DropdownBuilder as DropdownBuilderType,
  TextInputBuilder as TextInputBuilderType,
} from "typings/index.d.ts";
import { ComponentType } from "#typings/discord.js";
import { JsonTypes } from "../../../typings/enums.js";
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
      | import("typings/index.d.ts").DropdownBuilderCacheJSON
      | import("typings/index.d.ts").ButtonBuilderCacheJSON
      | import("typings/index.d.ts").TextInputBuilderCacheJSON
    )[];
  };
}
export default ActionRow;
