import { Embed } from "#src/util.js";
import { APIMessageSnapshotFields, Snowflake } from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";
import type {
  Client as ClientType,
  MessageSnapshotCacheJSON,
  MessageSnapshotDiscordJSON,
  MessageSnapshotStorageJSON,
  MessageSnapshot as MessageSnapshotType,
} from "#typings/index.d.ts";
import Attachment from "./Attachment.js";
export default class MessageSnapshot implements MessageSnapshotType {
  #private;
  constructor(
    client: ClientType,
    data:
      | APIMessageSnapshotFields
      | MessageSnapshotCacheJSON
      | MessageSnapshotDiscordJSON
      | MessageSnapshotStorageJSON,
    {
      channelId,
    }: {
      channelId: Snowflake;
    },
  );
  get content(): string | null;
  get embeds(): Embed[];
  get attachments(): Attachment[];
  get timestamp(): number;
  get editedTimestamp(): number | null;
  get flags(): number | undefined;
  toJSON(
    format?: JsonTypes,
  ):
    | MessageSnapshotCacheJSON
    | MessageSnapshotDiscordJSON
    | MessageSnapshotStorageJSON;
}
