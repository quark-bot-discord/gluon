import { ChannelType, ComponentType } from "discord-api-types/v10";
import type {
  DropdownBuilder as DropdownBuilderType,
  DropdownDefaultOption,
  DropdownOptionBuilder as DropdownOptionBuilderType,
} from "typings/index.d.ts";
import { JsonTypes } from "../../../typings/enums.js";
/**
 * Helps to create a dropdown message component.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menus}
 */
declare class Dropdown implements DropdownBuilderType {
  channel_types: Array<ChannelType> | undefined;
  custom_id: string | undefined;
  default_values: DropdownDefaultOption[];
  disabled: boolean | undefined;
  max_values: number | undefined;
  min_values: number | undefined;
  options: DropdownOptionBuilderType[];
  placeholder: string | undefined;
  type:
    | ComponentType.StringSelect
    | ComponentType.UserSelect
    | ComponentType.RoleSelect
    | ComponentType.MentionableSelect
    | ComponentType.ChannelSelect;
  /**
   * Creates a dropdown component.
   */
  constructor();
  /**
   * Sets the option type.
   * @param {Number} type The option type.
   * @returns {Dropdown}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types}
   */
  setType(
    type:
      | ComponentType.StringSelect
      | ComponentType.UserSelect
      | ComponentType.RoleSelect
      | ComponentType.MentionableSelect
      | ComponentType.ChannelSelect,
  ): this;
  /**
   * Set the custom id of the dropdown.
   * @param {String} id The custom id of the dropdown.
   * @returns {Dropdown}
   * @see {@link https://discord.com/developers/docs/interactions/message-components#custom-id}
   */
  setCustomID(id: string): this;
  /**
   * Adds an option to the dropdown.
   * @param {DropdownOption} option Adds an option to the dropdown.
   * @returns {Dropdown}
   */
  addOption(option: DropdownOptionBuilderType): this;
  /**
   * Sets which channel types are selectable by the user.
   * @param {Array<Number>} channelTypes An array of channel types to offer as a choice.
   * @returns {Dropdown}
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
   */
  addChannelTypes(channelTypes: Array<ChannelType>): this;
  /**
   * Sets the placeholder text.
   * @param {String} placeholder Placeholder text if nothing is selected.
   * @returns {Dropdown}
   */
  setPlaceholder(placeholder: string): this;
  /**
   * Sets the minimum value the user may enter.
   * @param {Number} value The minimum number value that the user may enter.
   * @returns {Dropdown}
   */
  setMinValue(value: number): this;
  /**
   * Sets the maximum value the user may enter.
   * @param {Number} value The maximum number value that the user may enter.
   * @returns {Dropdown}
   */
  setMaxValue(value: number): this;
  /**
   * Disables the dropdown from being clickable.
   * @param {Boolean} disabled Whether this dropdown should be displayed as disabled.
   * @returns {Dropdown}
   */
  setDisabled(isDisabled: boolean): this;
  /**
   * Adds a default option to the dropdown.
   * @param {Object} option The default option to add to the dropdown.
   * @returns {Dropdown}
   */
  addDefaultOption(option: DropdownDefaultOption): this;
  /**
   * Returns the correct Discord format for a dropdown.
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
    type:
      | ComponentType.StringSelect
      | ComponentType.UserSelect
      | ComponentType.RoleSelect
      | ComponentType.MentionableSelect
      | ComponentType.ChannelSelect;
    custom_id: string;
    options: (
      | import("typings/index.d.ts").DropdownOptionBuilderCacheJSON
      | import("typings/index.d.ts").DropdownOptionBuilderStorageJSON
      | import("typings/index.d.ts").DropdownOptionBuilderDiscordJSON
    )[];
    channel_types: ChannelType[] | undefined;
    default_values: DropdownDefaultOption[];
    placeholder: string | undefined;
    min_values: number | undefined;
    max_values: number | undefined;
    disabled: boolean | undefined;
  };
}
export default Dropdown;
