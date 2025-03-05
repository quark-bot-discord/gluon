import MessagePollManager from "../managers/MessagePollManager.js";
import util from "util";
import { Snowflake } from "src/interfaces/gluon.js";
import type {
  Poll as PollType,
  PollCacheJSON,
  PollDiscordJSON,
  PollStorageJSON,
  Client as ClientType,
} from "../../typings/index.d.ts";
import { APIPoll } from "discord-api-types/v10";
import { JsonTypes } from "../../typings/enums.js";
declare class Poll implements PollType {
  #private;
  /**
   * Creates the structure for a poll.
   * @param {Client} client The client instance.
   * @param {Object} data The raw poll data from Discord.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this poll belongs to.
   */
  constructor(
    client: ClientType,
    data: APIPoll | PollCacheJSON | PollDiscordJSON | PollStorageJSON,
    {
      guildId,
    }: {
      guildId: Snowflake;
    },
  );
  /**
   * The ID of the guild that this poll belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The guild that this poll belongs to.
   * @type {Guild}
   * @readonly
   * @public
   */
  get guild(): import("../../typings/index.d.ts").Guild | null;
  /**
   * The question of the poll.
   * @type {String}
   * @readonly
   * @public
   */
  get question(): string;
  /**
   * The answers of the poll.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get answers(): {
    answerId: number;
    answer: string;
    result: string[];
  }[];
  /**
   * The UNIX timestamp of the expiry time for the poll.
   * @type {Number}
   * @readonly
   * @public
   */
  get expiry(): number | null;
  /**
   * Whether the poll allows multiselect.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get allowMultiselect(): boolean;
  /**
   * The layout type of the poll.
   * @type {String}
   * @readonly
   * @public
   */
  get layoutType(): import("discord-api-types/v10").PollLayoutType;
  /**
   * The poll responses.
   * @type {MessagePollManager}
   * @readonly
   * @public
   */
  get _results(): MessagePollManager;
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
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format?: JsonTypes): PollCacheJSON | PollDiscordJSON | PollStorageJSON;
}
export default Poll;
