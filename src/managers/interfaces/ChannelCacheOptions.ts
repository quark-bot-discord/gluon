import { TO_JSON_TYPES_ENUM } from "src/constants.js";

export interface ChannelCacheOptionsType {
  setMessageCaching(option: boolean): void;
  setFileCaching(option: boolean): void;
  setContentCaching(option: boolean): void;
  setPollCaching(option: boolean): void;
  setReactionCaching(option: boolean): void;
  setEmbedCaching(option: boolean): void;
  setAttributeCaching(option: boolean): void;
  setReferenceCaching(option: boolean): void;
  setStickerCaching(option: boolean): void;
  setWebhookCaching(option: boolean): void;
  setDisableAll(): void;
  messageCaching: boolean;
  fileCaching: boolean;
  contentCaching: boolean;
  pollCaching: boolean;
  reactionCaching: boolean;
  embedCaching: boolean;
  attributeCaching: boolean;
  referenceCaching: boolean;
  stickerCaching: boolean;
  webhookCaching: boolean;
  toString(): string;
  toJSON(format: TO_JSON_TYPES_ENUM): number;
}
