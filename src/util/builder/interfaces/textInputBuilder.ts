import { COMPONENT_TYPES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import { TextInputStyles } from "src/structures/interfaces/ModalResponse.js";

export interface TextInputBuilderType {
  custom_id: string | undefined;
  label: string | undefined;
  max_length: number | undefined;
  min_length: number | undefined;
  placeholder: string | undefined;
  required: boolean | undefined;
  style: TextInputStyles | undefined;
  type: COMPONENT_TYPES.TEXT_INPUT;
  value: string | undefined;
  setLabel(label: string): TextInputBuilderType;
  setStyle(style: number): TextInputBuilderType;
  setCustomID(id: string): TextInputBuilderType;
  setValue(value: string): TextInputBuilderType;
  setPlaceholder(placeholder: string): TextInputBuilderType;
  setMinLength(length: number): TextInputBuilderType;
  setMaxLength(length: number): TextInputBuilderType;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
    options?: { suppressValidation?: boolean },
  ):
    | TextInputBuilderStorageJSON
    | TextInputBuilderCacheJSON
    | TextInputBuilderDiscordJSON;
}

export interface TextInputBuilderStorageJSON {
  type: COMPONENT_TYPES.TEXT_INPUT;
  label: string;
  style: TextInputStyles;
  custom_id: string;
  value?: string;
  placeholder?: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
}

export interface TextInputBuilderCacheJSON {
  type: COMPONENT_TYPES.TEXT_INPUT;
  label: string;
  style: TextInputStyles;
  custom_id: string;
  value?: string;
  placeholder?: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
}

export interface TextInputBuilderDiscordJSON {
  type: COMPONENT_TYPES.TEXT_INPUT;
  label: string;
  style: TextInputStyles;
  custom_id: string;
  value?: string;
  placeholder?: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
}
