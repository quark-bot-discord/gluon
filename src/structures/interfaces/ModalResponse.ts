import { COMPONENT_TYPES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  InteractionCacheJSON,
  InteractionDiscordJSON,
  InteractionRaw,
  InteractionStorageJSON,
  InteractionType,
  InteractionTypes,
} from "./Interaction.js";
import { ResolvedData, SelectOption } from "./OptionSelect.js";

export interface ModalResponseType extends InteractionType {
  readonly customId: string;
  readonly values: Array<Object>;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ):
    | ModalResponseStorageJSON
    | ModalResponseCacheJSON
    | ModalResponseDiscordJSON;
}

export interface ModalResponseStorageJSON extends InteractionStorageJSON {
  values: Array<Object>;
  custom_id: string;
}

export interface ModalResponseCacheJSON extends InteractionCacheJSON {
  values: Array<Object>;
  custom_id: string;
}

export interface ModalResponseDiscordJSON extends InteractionDiscordJSON {
  data: {
    custom_id: string;
    components: Array<{
      components: Array<Object>;
    }>;
  };
}

export interface ModalResponseRawData {
  custom_id: string;
  components: Array<ModalResponseComponents>;
}

export interface ModalResponseComponents {
  custom_id: string;
  values?: Array<SelectOption>;
  component_type: COMPONENT_TYPES;
  resolved?: ResolvedData;
}

export interface ModalResponseRaw extends InteractionRaw {
  type: InteractionTypes.MODAL_SUBMIT;
  data: ModalResponseRawData;
}
