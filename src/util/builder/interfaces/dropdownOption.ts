import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { ResolvedEmoji } from "src/util/discord/interfaces/resolveEmoji.js";

export interface DropdownOptionBuilderType {
  default: boolean | undefined;
  description: string | undefined;
  emoji: ResolvedEmoji | undefined;
  label: string | undefined;
  value: string | undefined;
  setLabel(label: string): DropdownOptionBuilderType;
  setValue(value: string): DropdownOptionBuilderType;
  setDescription(description: string): DropdownOptionBuilderType;
  setEmoji(emoji: string): DropdownOptionBuilderType;
  setDefault(isDefault: boolean): DropdownOptionBuilderType;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
    options?: { suppressValidation?: boolean },
  ):
    | DropdownOptionBuilderCacheJSON
    | DropdownOptionBuilderDiscordJSON
    | DropdownOptionBuilderStorageJSON;
}

export interface DropdownOptionBuilderStorageJSON {
  label: string;
  value: string;
  description?: string;
  emoji?: ResolvedEmoji;
  default?: boolean;
}

export interface DropdownOptionBuilderDiscordJSON {
  label: string;
  value: string;
  description?: string;
  emoji?: ResolvedEmoji;
  default?: boolean;
}

export interface DropdownOptionBuilderCacheJSON {
  label: string;
  value: string;
  description?: string;
  emoji?: ResolvedEmoji;
  default?: boolean;
}
