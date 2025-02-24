import { Snowflake } from "src/interfaces/gluon.js";
import { TO_JSON_TYPES_ENUM } from "../../constants.js";

export interface AttachmentType {
  readonly id: Snowflake;
  readonly name: string;
  readonly size: number;
  readonly url: string | null;
  readonly channelId: string | null;
  fetchData(): Promise<ArrayBuffer>;
  toString(): string;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): AttachmentStorageJSON | AttachmentCacheJSON | AttachmentDiscordJSON;
}

export interface AttachmentStorageJSON {
  id: Snowflake;
  filename: string;
  size: number;
}

export interface AttachmentCacheJSON {
  id: Snowflake;
  filename: string;
  size: number;
  url: string | null;
}

export interface AttachmentDiscordJSON {
  id: Snowflake;
  filename: string;
  size: number;
  url: string | null;
}

export interface AttachmentRaw {
  id: Snowflake;
  filename: string;
  title?: string;
  description?: string;
  content_type?: string;
  size: number;
  url: string;
  proxy_url: string;
  height?: number;
  width?: number;
  ephemeral?: boolean;
  duration_secs?: number;
  waveform?: string;
  flags?: number;
}
