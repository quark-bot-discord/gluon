import { TO_JSON_TYPES_ENUM } from "src/constants.js";

export interface CommandChoiceBuilderType {
  defaultLocale: string;
  name: string | undefined;
  name_localizations: CommandChoiceNameLocalizations;
  value: string | undefined;
  setName(name: string): CommandChoiceBuilderType;
  setValue(value: string): CommandChoiceBuilderType;
  setDefaultLocale(locale: string): CommandChoiceBuilderType;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
    { suppressValidation }: { suppressValidation: boolean },
  ):
    | CommandChoiceBuilderStorageJSON
    | CommandChoiceBuilderDiscordJSON
    | CommandChoiceBuilderCacheJSON;
}

export interface CommandChoiceBuilderStorageJSON {
  name: string;
  name_localizations: CommandChoiceNameLocalizations;
  value: string;
}

export interface CommandChoiceBuilderDiscordJSON {
  name: string;
  value: string;
  name_localizations: CommandChoiceNameLocalizations;
}

export interface CommandChoiceBuilderCacheJSON {
  name: string;
  value: string;
  name_localizations: CommandChoiceNameLocalizations;
}

export interface CommandChoiceNameLocalizations {
  [key: string]: string;
}
