import { LOCALES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";
import { GuildType } from "./Guild.js";
import { MessageRaw } from "./Message.js";
import { UserRaw } from "./User.js";
import {
  MemberCacheJSON,
  MemberDiscordJSON,
  MemberRaw,
  MemberStorageJSON,
  MemberType,
} from "./Member.js";
import { ModalResponseRawData } from "./ModalResponse.js";
import { OptionSelectRawData } from "./OptionSelect.js";
import { SlashCommandRawData } from "./SlashCommand.js";
import { AllChannelTypes } from "./Channel.js";

export interface InteractionType {
  readonly id: Snowflake;
  readonly token: string;
  readonly type: InteractionTypes;
  readonly guildId?: Snowflake;
  readonly guild?: GuildType | null;
  readonly channelId?: Snowflake;
  readonly channel?: AllChannelTypes | null;
  readonly member?: MemberType | null;
  readonly memberId?: Snowflake;
  textPrompt(options: any): Promise<void>;
  autocompleteResponse(options: any): Promise<InteractionType>;
  reply(options: any): Promise<InteractionType>;
  acknowledge(): Promise<InteractionType>;
  delete(): Promise<InteractionType>;
  edit(options: any): Promise<InteractionType>;
  toString(): string;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
  ): InteractionStorageJSON | InteractionCacheJSON | InteractionDiscordJSON;
}

export interface InteractionStorageJSON {
  id: Snowflake;
  type: number;
  guild_id: Snowflake;
  channel_id: Snowflake;
  member: MemberStorageJSON | null;
}

export interface InteractionCacheJSON {
  id: Snowflake;
  type: number;
  guild_id: Snowflake;
  channel_id: Snowflake;
  member: MemberCacheJSON | null;
}

export interface InteractionDiscordJSON {
  id: Snowflake;
  type: number;
  guild_id: Snowflake;
  channel_id: Snowflake;
  member: MemberDiscordJSON | null;
}

export interface InteractionRaw {
  id: Snowflake;
  application_id: Snowflake;
  type: InteractionTypes;
  data?: ModalResponseRawData | OptionSelectRawData | SlashCommandRawData;
  guild?: any; // partial guild object
  guild_id?: Snowflake;
  channel?: any; // partial channel object
  channel_id?: Snowflake;
  member?: MemberRaw;
  user?: UserRaw;
  token: string;
  version: 1;
  message?: MessageRaw;
  app_permissions: string;
  locale?: LOCALES;
  guild_locale?: LOCALES;
  entitlements: Array<any>;
  authorizing_integration_owners: any;
  context?: InteractionContextTypes;
}

export enum InteractionTypes {
  COMMAND = 2,
  COMPONENT = 3,
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
  MODAL_SUBMIT = 5,
}

export enum InteractionContextTypes {
  GUILD = 0,
  BOT_DM = 1,
  PRIVATE_CHANNEL = 2,
}
