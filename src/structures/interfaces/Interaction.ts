import { LOCALES, TO_JSON_TYPES_ENUM } from "src/constants.js";
import { ISO8601Timestamp, Snowflake } from "src/interfaces/gluon.js";
import { GuildRaw, GuildType } from "./Guild.js";
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
import { AllChannelTypes, ChannelRaw } from "./Channel.js";
import { ButtonClickRawData } from "./ButtonClick.js";

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
  textPrompt({
    title,
    customId,
    textInputModal,
  }: {
    title: string;
    customId: string;
    textInputModal: any;
  }): Promise<void>;
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
  data?:
    | ModalResponseRawData
    | OptionSelectRawData
    | SlashCommandRawData
    | ButtonClickRawData;
  guild?: GuildRaw; // partial guild object
  guild_id?: Snowflake;
  channel?: ChannelRaw; // partial channel object
  channel_id?: Snowflake;
  member?: MemberRaw;
  user?: UserRaw;
  token: string;
  version: 1;
  message?: MessageRaw;
  app_permissions: string;
  locale?: LOCALES;
  guild_locale?: LOCALES;
  entitlements: EntitlementRaw[];
  authorizing_integration_owners: unknown;
  context?: InteractionContextTypes;
}

export enum InteractionTypes {
  PING = 1,
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

export interface EntitlementRaw {
  id: Snowflake;
  sku_id: Snowflake;
  application_id: Snowflake;
  user_id?: Snowflake;
  type: EntitlementTypes;
  deleted: boolean;
  starts_at: ISO8601Timestamp | null;
  ends_at: ISO8601Timestamp | null;
  guild_id?: Snowflake;
  consumed?: boolean;
}

export enum EntitlementTypes {
  PURCHASE = 1,
  PREMIUM_SUBSCRIPTION = 2,
  DEVELOPER_GIFT = 3,
  TEST_MODE_PURCHASE = 4,
  FREE_PURCHASE = 5,
  USER_GIFT = 6,
  PREMIUM_PURCHASE = 7,
  APPLICATION_SUBSCRIPTION = 8,
}
