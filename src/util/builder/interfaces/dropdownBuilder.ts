import { COMPONENT_TYPES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import { ChannelTypes } from "src/structures/interfaces/Channel.js";
import {
  DropdownOptionBuilderCacheJSON,
  DropdownOptionBuilderDiscordJSON,
  DropdownOptionBuilderStorageJSON,
  DropdownOptionBuilderType,
} from "./dropdownOption.js";
import { Snowflake } from "src/interfaces/gluon.js";

export interface DropdownBuilderType {
  channel_types: Array<ChannelTypes> | undefined;
  custom_id: string | undefined;
  default_values: Array<DropdownDefaultOption>;
  disabled: boolean | undefined;
  max_values: number | undefined;
  min_values: number | undefined;
  options: Array<DropdownOptionBuilderType>;
  placeholder: string | undefined;
  type:
    | COMPONENT_TYPES.SELECT_MENU
    | COMPONENT_TYPES.USER_SELECT_MENU
    | COMPONENT_TYPES.ROLE_SELECT_MENU
    | COMPONENT_TYPES.MENTIONABLE_SELECT_MENU
    | COMPONENT_TYPES.CHANNEL_SELECT_MENU;
  setType(
    type:
      | COMPONENT_TYPES.SELECT_MENU
      | COMPONENT_TYPES.USER_SELECT_MENU
      | COMPONENT_TYPES.ROLE_SELECT_MENU
      | COMPONENT_TYPES.MENTIONABLE_SELECT_MENU
      | COMPONENT_TYPES.CHANNEL_SELECT_MENU,
  ): DropdownBuilderType;
  setCustomID(id: string): DropdownBuilderType;
  addOption(option: DropdownOptionBuilderType): DropdownBuilderType;
  addChannelTypes(channelTypes: Array<ChannelTypes>): DropdownBuilderType;
  setPlaceholder(placeholder: string): DropdownBuilderType;
  setMinValue(value: number): DropdownBuilderType;
  setMaxValue(value: number): DropdownBuilderType;
  setDisabled(isDisabled: boolean): DropdownBuilderType;
  addDefaultOption(option: DropdownDefaultOption): DropdownBuilderType;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
    options?: { suppressValidation?: boolean },
  ):
    | DropdownBuilderStorageJSON
    | DropdownBuilderCacheJSON
    | DropdownBuilderDiscordJSON;
}

export interface DropdownBuilderStorageJSON {
  type:
    | COMPONENT_TYPES.SELECT_MENU
    | COMPONENT_TYPES.USER_SELECT_MENU
    | COMPONENT_TYPES.ROLE_SELECT_MENU
    | COMPONENT_TYPES.MENTIONABLE_SELECT_MENU
    | COMPONENT_TYPES.CHANNEL_SELECT_MENU;
  custom_id: string;
  options?: DropdownOptionBuilderStorageJSON[];
  channel_types?: Array<ChannelTypes>;
  default_values?: DropdownDefaultOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface DropdownBuilderCacheJSON {
  type:
    | COMPONENT_TYPES.SELECT_MENU
    | COMPONENT_TYPES.USER_SELECT_MENU
    | COMPONENT_TYPES.ROLE_SELECT_MENU
    | COMPONENT_TYPES.MENTIONABLE_SELECT_MENU
    | COMPONENT_TYPES.CHANNEL_SELECT_MENU;
  custom_id: string;
  options?: DropdownOptionBuilderCacheJSON[];
  channel_types?: Array<ChannelTypes>;
  default_values?: DropdownDefaultOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface DropdownBuilderDiscordJSON {
  type:
    | COMPONENT_TYPES.SELECT_MENU
    | COMPONENT_TYPES.USER_SELECT_MENU
    | COMPONENT_TYPES.ROLE_SELECT_MENU
    | COMPONENT_TYPES.MENTIONABLE_SELECT_MENU
    | COMPONENT_TYPES.CHANNEL_SELECT_MENU;
  custom_id: string;
  options?: DropdownOptionBuilderDiscordJSON[];
  channel_types?: Array<ChannelTypes>;
  default_values?: DropdownDefaultOption[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface DropdownDefaultOption {
  id: Snowflake;
  type: "user" | "role" | "channel";
}
