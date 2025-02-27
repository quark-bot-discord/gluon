import { COMPONENT_TYPES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  MessageCacheJSON,
  MessageDiscordJSON,
  MessageStorageJSON,
  MessageType,
} from "./Message.js";
import {
  InteractionCacheJSON,
  InteractionDiscordJSON,
  InteractionRaw,
  InteractionStorageJSON,
  InteractionType,
  InteractionTypes,
} from "./Interaction.js";
import { ResolvedData, SelectOption } from "./OptionSelect.js";

export interface ButtonClickType extends InteractionType {
  readonly customId: string;
  readonly message: MessageType;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): ButtonClickStorageJSON | ButtonClickCacheJSON | ButtonClickDiscordJSON;
}

export interface ButtonClickStorageJSON extends InteractionStorageJSON {
  data: {
    custom_id: string;
  };
  message: MessageStorageJSON;
}

export interface ButtonClickCacheJSON extends InteractionCacheJSON {
  data: {
    custom_id: string;
  };
  message: MessageCacheJSON;
}

export interface ButtonClickDiscordJSON extends InteractionDiscordJSON {
  data: {
    custom_id: string;
  };
  message: MessageDiscordJSON;
}

export interface ButtonClickRaw extends InteractionRaw {
  type: InteractionTypes.COMPONENT;
  data: ButtonClickRawData;
}

export interface ButtonClickRawData {
  custom_id: string;
  component_type: COMPONENT_TYPES.BUTTON;
  values?: Array<SelectOption>;
  resolved?: ResolvedData;
}
