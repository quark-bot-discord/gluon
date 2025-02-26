import { Snowflake } from "src/interfaces/gluon.js";
import {
  ChannelCacheJSON,
  ChannelDiscordJSON,
  ChannelRaw,
  ChannelsThread,
  ChannelStorageJSON,
  ChannelType,
} from "./Channel.js";

export interface ThreadType extends ChannelType {
  readonly owner: any | null;
  readonly parent: ChannelType;
  readonly ownerId: Snowflake;
  readonly parentId: Snowflake;
}

export interface ThreadStorageJSON extends ChannelStorageJSON {
  owner_id: Snowflake;
  parent_id: Snowflake;
}

export interface ThreadCacheJSON extends ChannelCacheJSON {
  owner_id: Snowflake;
  parent_id: Snowflake;
}

export interface ThreadDiscordJSON extends ChannelDiscordJSON {
  owner_id: Snowflake;
  parent_id: Snowflake;
}

export interface ThreadRaw extends ChannelRaw {
  type: ChannelsThread;
}
