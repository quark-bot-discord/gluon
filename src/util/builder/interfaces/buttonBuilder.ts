import { COMPONENT_TYPES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import { ResolvedEmoji } from "src/util/discord/interfaces/resolveEmoji.js";

export interface ButtonBuilderType {
  custom_id: string | undefined;
  disabled: boolean | undefined;
  emoji: ResolvedEmoji | undefined;
  label: string | undefined;
  style: ButtonStyles;
  type: COMPONENT_TYPES.BUTTON;
  url: string | undefined;
  setLabel(label: string): ButtonBuilderType;
  setEmoji(emoji: string): ButtonBuilderType;
  setStyle(style: ButtonStyles): ButtonBuilderType;
  setCustomID(id: string): ButtonBuilderType;
  setURL(url: string): ButtonBuilderType;
  setDisabled(disabled: boolean): ButtonBuilderType;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
    options: { suppressValidation: boolean },
  ):
    | ButtonBuilderStorageJSON
    | ButtonBuilderCacheJSON
    | ButtonBuilderDiscordJSON;
}

export interface ButtonBuilderStorageJSON {
  type: COMPONENT_TYPES.BUTTON;
  label?: string;
  emoji?: ResolvedEmoji;
  style: ButtonStyles;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

export interface ButtonBuilderCacheJSON {
  type: COMPONENT_TYPES.BUTTON;
  label?: string;
  emoji?: ResolvedEmoji;
  style: ButtonStyles;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

export interface ButtonBuilderDiscordJSON {
  type: COMPONENT_TYPES.BUTTON;
  label?: string;
  emoji?: ResolvedEmoji;
  style: ButtonStyles;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

export enum ButtonStyles {
  PRIMARY = 1,
  SECONDARY = 2,
  SUCCESS = 3,
  DANGER = 4,
  LINK = 5,
  PREMIUM = 6,
}
