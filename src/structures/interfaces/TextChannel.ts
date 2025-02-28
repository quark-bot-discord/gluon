import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ChannelCacheJSON,
  ChannelDiscordJSON,
  ChannelRaw,
  ChannelsForum,
  ChannelsOther,
  ChannelsText,
  ChannelStorageJSON,
} from "./Channel.js";
import { Snowflake } from "src/interfaces/gluon.js";

export interface TextChannelType {
  bulkDelete(
    messages: Snowflake[],
    { reason }: { reason?: string },
  ): Promise<void>;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): TextChannelCacheJSON | TextChannelDiscordJSON | TextChannelStorageJSON;
}

export type TextChannelCacheJSON = ChannelCacheJSON;

export type TextChannelDiscordJSON = ChannelDiscordJSON;

export type TextChannelStorageJSON = ChannelStorageJSON;

export interface TextChannelRaw extends ChannelRaw {
  type: ChannelsText | ChannelsForum | ChannelsOther; // basically any channel that can hold threads
}
