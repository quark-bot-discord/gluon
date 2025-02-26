import { COMPONENT_TYPES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  InteractionCacheJSON,
  InteractionDiscordJSON,
  InteractionRaw,
  InteractionStorageJSON,
  InteractionType,
  InteractionTypes,
} from "./Interaction.js";
import {
  MessageCacheJSON,
  MessageDiscordJSON,
  MessageStorageJSON,
  MessageType,
} from "./Message.js";

export interface OptionSelectType extends InteractionType {
  readonly customId: string;
  readonly message: MessageType;
  readonly values: Array<any>;
  toString(): string;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ): OptionSelectStorageJSON | OptionSelectCacheJSON | OptionSelectDiscordJSON;
}

export interface OptionSelectStorageJSON extends InteractionStorageJSON {
  custom_id: string;
  values: Array<any>;
  message: MessageStorageJSON;
}

export interface OptionSelectCacheJSON extends InteractionCacheJSON {
  custom_id: string;
  values: Array<any>;
  message: MessageCacheJSON;
}

export interface OptionSelectDiscordJSON extends InteractionDiscordJSON {
  data: {
    custom_id: string;
    values: Array<any>;
  };
  message: MessageDiscordJSON;
}

export interface OptionSelectRaw extends InteractionRaw {
  type: InteractionTypes.COMPONENT;
  data: OptionSelectRawData;
}

export interface OptionSelectRawData {
  custom_id: string;
  values?: Array<any>;
  component_type:
    | COMPONENT_TYPES.CHANNEL_SELECT_MENU
    | COMPONENT_TYPES.USER_SELECT_MENU
    | COMPONENT_TYPES.ROLE_SELECT_MENU
    | COMPONENT_TYPES.MENTIONABLE_SELECT_MENU
    | COMPONENT_TYPES.SELECT_MENU;
}
