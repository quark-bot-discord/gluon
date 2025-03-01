import { COMPONENT_TYPES } from "src/constants.js";
import {
  ButtonBuilderCacheJSON,
  ButtonBuilderDiscordJSON,
  ButtonBuilderStorageJSON,
  ButtonBuilderType,
} from "./buttonBuilder.js";
import {
  DropdownBuilderCacheJSON,
  DropdownBuilderDiscordJSON,
  DropdownBuilderStorageJSON,
  DropdownBuilderType,
} from "./dropdownBuilder.js";
import {
  TextInputBuilderCacheJSON,
  TextInputBuilderDiscordJSON,
  TextInputBuilderStorageJSON,
  TextInputBuilderType,
} from "./textInputBuilder.js";

export interface ActionRowBuilderType {
  components: Array<
    DropdownBuilderType | ButtonBuilderType | TextInputBuilderType
  >;
  type: COMPONENT_TYPES.ACTION_ROW;
  addComponent(
    component: DropdownBuilderType | ButtonBuilderType | TextInputBuilderType,
  ): ActionRowBuilderType;
  toJSON(
    format: number,
    options?: { suppressValidation?: boolean },
  ):
    | ActionRowBuilderStorageJSON
    | ActionRowBuilderCacheJSON
    | ActionRowBuilderDiscordJSON;
}

export interface ActionRowBuilderStorageJSON {
  type: COMPONENT_TYPES.ACTION_ROW;
  components: Array<
    | DropdownBuilderStorageJSON
    | ButtonBuilderStorageJSON
    | TextInputBuilderStorageJSON
  >;
}

export interface ActionRowBuilderCacheJSON {
  type: COMPONENT_TYPES.ACTION_ROW;
  components: Array<
    | DropdownBuilderCacheJSON
    | ButtonBuilderCacheJSON
    | TextInputBuilderCacheJSON
  >;
}

export interface ActionRowBuilderDiscordJSON {
  type: COMPONENT_TYPES.ACTION_ROW;
  components: Array<
    | DropdownBuilderDiscordJSON
    | ButtonBuilderDiscordJSON
    | TextInputBuilderDiscordJSON
  >;
}
