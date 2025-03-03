import util from "util";
import ClientType from "src/interfaces/Client.js";
import { APIAttachment, Snowflake } from "discord-api-types/v10";
import {
  Attachment as AttachmentType,
  AttachmentCacheJSON,
  AttachmentDiscordJSON,
  AttachmentStorageJSON,
  JsonTypes,
} from "../../typings/index.d.js";
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
