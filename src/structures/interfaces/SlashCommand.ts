import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  InteractionCacheJSON,
  InteractionDiscordJSON,
  InteractionRaw,
  InteractionStorageJSON,
  InteractionType,
  InteractionTypes,
} from "./Interaction.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { ResolvedData } from "./OptionSelect.js";

export interface SlashCommandType extends InteractionType {
  readonly data: SlashCommandRawData;
  readonly options: SlashCommandRawDataOption[];
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): SlashCommandStorageJSON | SlashCommandCacheJSON | SlashCommandDiscordJSON;
}

export interface SlashCommandStorageJSON extends InteractionStorageJSON {
  id: Snowflake;
  data: SlashCommandRawData;
}

export interface SlashCommandCacheJSON extends InteractionCacheJSON {
  id: Snowflake;
  data: SlashCommandRawData;
}

export interface SlashCommandDiscordJSON extends InteractionDiscordJSON {
  id: Snowflake;
  data: SlashCommandRawData;
}

export interface SlashCommandRaw extends InteractionRaw {
  type: InteractionTypes.COMMAND;
  data: SlashCommandRawData;
}

export interface SlashCommandRawData {
  id: Snowflake;
  name: string;
  type: SlashCommandTypes;
  resolved?: ResolvedData;
  options?: SlashCommandRawDataOption[];
  guild_id?: Snowflake;
  target_id?: Snowflake;
}

export enum SlashCommandTypes {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3,
  PRIMARY_ENTRY_POINT = 4,
}

export enum SlashCommandOptionTypes {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

export interface SlashCommandRawDataOption {
  name: string;
  type: SlashCommandTypes;
  value?: string | number | boolean;
  options?: SlashCommandRawDataOption[];
  focused?: boolean;
}
