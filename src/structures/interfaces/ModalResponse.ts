import { COMPONENT_TYPES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  InteractionCacheJSON,
  InteractionDiscordJSON,
  InteractionRaw,
  InteractionStorageJSON,
  InteractionType,
  InteractionTypes,
} from "./Interaction.js";
import { MessageRaw } from "./Message.js";

export interface ModalResponseType extends InteractionType {
  readonly customId: string;
  readonly values: Array<ModalResponseComponentsComponents>;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ):
    | ModalResponseStorageJSON
    | ModalResponseCacheJSON
    | ModalResponseDiscordJSON;
}

export interface ModalResponseStorageJSON extends InteractionStorageJSON {
  values: Array<ModalResponseComponentsComponents>;
  custom_id: string;
}

export interface ModalResponseCacheJSON extends InteractionCacheJSON {
  values: Array<ModalResponseComponentsComponents>;
  custom_id: string;
}

export interface ModalResponseDiscordJSON extends InteractionDiscordJSON {
  data: {
    custom_id: string;
    components: Array<{
      components: Array<ModalResponseComponentsComponents>;
    }>;
  };
}

export interface ModalResponseRawData {
  custom_id: string;
  components: Array<ModalResponseComponents>;
}

export interface ModalResponseComponents {
  title: string;
  custom_id: string;
  components: Array<ModalResponseComponentsComponents>;
}

export interface ModalResponseComponentsComponents {
  custom_id: string;
  type: COMPONENT_TYPES.TEXT_INPUT;
  style: TextInputStyles;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  placeholder?: string;
  value?: string;
}

export enum TextInputStyles {
  SHORT = 1,
  PARAGRAPH = 2,
}

export interface ModalResponseRaw extends InteractionRaw {
  type: InteractionTypes.MODAL_SUBMIT;
  data: ModalResponseRawData;
  message: MessageRaw;
}
