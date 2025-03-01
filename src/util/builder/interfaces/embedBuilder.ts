import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  ISO8601Timestamp,
  UnixMillisecondsTimestamp,
} from "src/interfaces/gluon.js";

export interface EmbedBuilderType {
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
  timestamp: number | undefined;
  color: number | undefined;
  footer: EmbedFooter | undefined;
  author: EmbedAuthor | undefined;
  fields: EmbedField[];
  image: EmbedMedia | undefined;
  thumbnail: EmbedMedia | undefined;
  video: EmbedMediaVideo | undefined;
  setTitle(title: string): EmbedBuilderType;
  setDescription(description: string): EmbedBuilderType;
  setURL(url: string): EmbedBuilderType;
  setTimestamp(timestamp: number): EmbedBuilderType;
  setColor(color: number): EmbedBuilderType;
  setThumbnail(url: string): EmbedBuilderType;
  setFooter(text: string, icon?: string): EmbedBuilderType;
  setAuthor(name: string, url?: string, icon_url?: string): EmbedBuilderType;
  addField(name: string, value: string, inline?: boolean): EmbedBuilderType;
  setImage(url: string): EmbedBuilderType;
  setVideo(url: string): EmbedBuilderType;
  get characterCount(): number;
  toString(): string;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
    options: { suppressValidation: boolean },
  ): EmbedBuilderCacheJSON | EmbedBuilderStorageJSON | EmbedBuilderDiscordJSON;
}

export interface EmbedBuilderStorageJSON {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: UnixMillisecondsTimestamp;
  color?: number;
  footer?: EmbedFooter;
  author?: EmbedAuthor;
  fields?: EmbedField[];
  image?: EmbedMedia;
  thumbnail?: EmbedMedia;
  video?: EmbedMediaVideo;
}

export interface EmbedBuilderCacheJSON {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: UnixMillisecondsTimestamp;
  color?: number;
  footer?: EmbedFooter;
  author?: EmbedAuthor;
  fields?: EmbedField[];
  image?: EmbedMedia;
  thumbnail?: EmbedMedia;
  video?: EmbedMediaVideo;
}

export interface EmbedBuilderDiscordJSON {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: ISO8601Timestamp;
  color?: number;
  footer?: EmbedFooter;
  author?: EmbedAuthor;
  fields?: EmbedField[];
  image?: EmbedMedia;
  thumbnail?: EmbedMedia;
  video?: EmbedMediaVideo;
}

export interface EmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface EmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface EmbedMedia {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface EmbedMediaVideo {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface EmbedProvider {
  name?: string;
  url?: string;
}

export interface EmbedRaw {
  title?: string;
  type?: EmbedTypes;
  description?: string;
  url?: string;
  timestamp?: ISO8601Timestamp;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedMedia;
  thumbnail?: EmbedMedia;
  video?: EmbedMediaVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

export enum EmbedTypes {
  RICH = "rich",
  IMAGE = "image",
  VIDEO = "video",
  GIFV = "gifv",
  ARTICLE = "article",
  LINK = "link",
  POLL_RESULT = "poll_result",
}
