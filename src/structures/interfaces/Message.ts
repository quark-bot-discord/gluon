import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Snowflake } from "src/interfaces/gluon.js";

export interface MessageType {
  readonly id: Snowflake;
  readonly guildId: Snowflake | null;
  readonly channelId: Snowflake;
  readonly content: string | null;
  readonly poll: any | null;
  readonly reactions: any;
  readonly embeds: Array<any>;
  readonly reference: {
    messageId: Snowflake | null;
  };
  readonly flags: Array<string>;
  readonly flagsRaw: number;
  readonly type: number;
  readonly webhookId: Snowflake | null;
  readonly stickerItems: Array<any>;
  readonly messageSnapshots: Array<any> | null;
  readonly url: string;
  readonly hashName: string;
  reply(options?: {
    content?: string;
    embeds?: Array<any>;
    components?: any;
    files?: Array<any>;
    suppressMentions?: boolean;
  }): Promise<any>;
  edit(options?: {
    components?: any;
    files?: Array<any>;
    content?: string;
    embeds?: Array<any>;
    attachments?: Array<any>;
    flags?: number;
    reference?: {
      messageId: Snowflake | null;
      channelId: Snowflake;
      guildId: Snowflake;
    };
  }): Promise<any>;
  delete(options?: { reason?: string }): Promise<void>;
  encrypt(): string;
  toString(): string;
  toJSON(format?: TO_JSON_TYPES_ENUM): any;
}
