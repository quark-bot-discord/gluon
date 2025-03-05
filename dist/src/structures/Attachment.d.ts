import util from "util";
import { APIAttachment, Snowflake } from "#typings/discord.js";
import type {
  Attachment as AttachmentType,
  AttachmentCacheJSON,
  AttachmentDiscordJSON,
  AttachmentStorageJSON,
  Client as ClientType,
} from "../../typings/index.d.ts";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Represents an attachment.
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure}
 */
declare class Attachment implements AttachmentType {
  #private;
  /**
   * Creates a structure for an attachment.
   */
  constructor(
    client: ClientType,
    data:
      | APIAttachment
      | AttachmentStorageJSON
      | AttachmentCacheJSON
      | AttachmentDiscordJSON,
    {
      channelId,
    }: {
      channelId: Snowflake;
    },
  );
  /**
   * The id of the attachment.
   * @readonly
   * @public
   */
  get id(): string;
  /**
   * The name of the file.
   * @readonly
   * @public
   */
  get name(): string;
  /**
   * The size of the file.
   * @readonly
   * @public
   */
  get size(): number;
  /**
   * The url to the file.
   * @readonly
   * @public
   */
  get url(): string | null;
  /**
   * The channel that this attachment belongs to.
   * @readonly
   * @public
   */
  get channelId(): string;
  /**
   * Fetches the data of the attachment.
   * @public
   */
  fetchData(): Promise<ArrayBuffer>;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   */
  toJSON(
    format?: JsonTypes,
  ): AttachmentStorageJSON | AttachmentDiscordJSON | AttachmentCacheJSON;
}
export default Attachment;
