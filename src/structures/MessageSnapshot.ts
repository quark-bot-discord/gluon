import { Embed } from "#src/util.js";
import { APIMessageSnapshotFields, Snowflake } from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";
import type {
  AttachmentDiscordJSON,
  Client as ClientType,
  MessageSnapshotCacheJSON,
  MessageSnapshotDiscordJSON,
  MessageSnapshotStorageJSON,
  MessageSnapshot as MessageSnapshotType,
} from "#typings/index.d.ts";
import Attachment from "./Attachment.js";

export default class MessageSnapshot implements MessageSnapshotType {
  //   #_client;
  #content;
  #embeds;
  #attachments;
  #timestamp;
  #editedTimestamp;
  #flags;
  constructor(
    client: ClientType,
    data:
      | APIMessageSnapshotFields
      | MessageSnapshotCacheJSON
      | MessageSnapshotDiscordJSON
      | MessageSnapshotStorageJSON,
    { channelId }: { channelId: Snowflake },
  ) {
    // this.#_client = client;

    this.#content = data.content;

    this.#embeds = data.embeds.map((embed) => new Embed(embed));

    this.#attachments = data.attachments.map(
      (attachment) => new Attachment(client, attachment, { channelId }),
    );

    this.#timestamp = (new Date(data.timestamp).getTime() / 1000) | 0;

    this.#editedTimestamp = data.edited_timestamp
      ? (new Date(data.edited_timestamp).getTime() / 1000) | 0
      : null;

    this.#flags = data.flags;
  }

  get content() {
    return this.#content;
  }

  get embeds() {
    return this.#embeds;
  }

  get attachments() {
    return this.#attachments;
  }

  get timestamp() {
    return this.#timestamp;
  }

  get editedTimestamp() {
    return this.#editedTimestamp;
  }

  get flags() {
    return this.#flags;
  }

  toJSON(
    format?: JsonTypes,
  ):
    | MessageSnapshotCacheJSON
    | MessageSnapshotDiscordJSON
    | MessageSnapshotStorageJSON {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          content: this.content,
          embeds: this.embeds.map((embed) => embed.toJSON(format)),
          attachments: this.attachments.map((attachment) =>
            attachment.toJSON(format),
          ),
          timestamp: this.timestamp,
          edited_timestamp: this.editedTimestamp,
          flags: this.flags,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          content: this.content,
          embeds: this.embeds.map((embed) => embed.toJSON(format)),
          attachments: this.attachments.map((attachment) =>
            attachment.toJSON(format),
          ) as AttachmentDiscordJSON[],
          timestamp: new Date(this.timestamp * 1000).toISOString(),
          edited_timestamp: this.editedTimestamp
            ? new Date(this.editedTimestamp * 1000).toISOString()
            : null,
          flags: this.flags,
        };
      }
    }
  }
}
