import MessagePollManager from "../managers/MessagePollManager.js";
import Emoji from "./Emoji.js";
import util from "util";
import type {
  Poll as PollType,
  PollCacheJSON,
  PollDiscordJSON,
  PollStorageJSON,
  MessagePollManagerCacheJSON,
  MessagePollManagerDiscordJSON,
  MessagePollManagerStorageJSON,
  Client as ClientType,
} from "#typings/index.d.ts";
import { APIPoll, Snowflake } from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";

class Poll implements PollType {
  #_client;
  #_guild_id;
  #question;
  #answers;
  #expiry;
  #allow_multiselect;
  #layout_type;
  #results;
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
    { guildId }: { guildId: Snowflake },
  ) {
    if (!client)
      throw new TypeError("GLUON: Client must be a Client instance.");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The ID of the guild that this poll belongs to.
     * @type {BigInt}
     * @private
     */
    this.#_guild_id = BigInt(guildId);

    /**
     * The question of the poll.
     * @type {String}
     * @private
     */
    this.#question = data.question;

    /**
     * The answers of the poll.
     * @type {Array<Object>}
     * @private
     */
    this.#answers = data.answers;

    /**
     * The UNIX timestamp of the expiry time for the poll.
     * @type {Number}
     * @private
     */
    this.#expiry = data.expiry
      ? (new Date(data.expiry).getTime() / 1000) | 0
      : null;

    /**
     * Whether the poll allows multiselect.
     * @type {Boolean}
     * @private
     */
    this.#allow_multiselect = data.allow_multiselect;

    /**
     * The layout type of the poll.
     * @type {Number}
     * @private
     */
    this.#layout_type = data.layout_type;

    /**
     * The poll responses.
     * @type {MessagePollManager}
     * @private
     */
    this.#results = new MessagePollManager(
      this.#_client,
      "_results" in data ? data._results : undefined,
    );
  }

  /**
   * The ID of the guild that this poll belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId() {
    return String(this.#_guild_id);
  }

  /**
   * The guild that this poll belongs to.
   * @type {Guild}
   * @readonly
   * @public
   */
  get guild() {
    return this.#_client.guilds.get(this.guildId);
  }

  /**
   * The question of the poll.
   * @type {String}
   * @readonly
   * @public
   */
  get question() {
    return `${this.#question.emoji ? `${Emoji.getMention(this.#question.emoji.name as string /** name only not provided with reactions */, this.#question.emoji.id, this.#question.emoji.animated)} ` : ""}${this.#question.text ? this.#question.text : ""}`;
  }

  /**
   * The answers of the poll.
   * @type {Array<Object>}
   * @readonly
   * @public
   */
  get answers() {
    if (!this.#answers) return [];
    return this.#answers.map((a) => {
      return {
        answerId: a.answer_id,
        answer: `${a.poll_media.emoji ? `${Emoji.getMention(a.poll_media.emoji.name as string /** name only not provided with reactions */, a.poll_media.emoji.id, a.poll_media.emoji.animated)} ` : ""}${a.poll_media.text}`,
        result: this._results.getResult(a.answer_id),
      };
    });
  }

  /**
   * The UNIX timestamp of the expiry time for the poll.
   * @type {Number}
   * @readonly
   * @public
   */
  get expiry() {
    return this.#expiry;
  }

  /**
   * Whether the poll allows multiselect.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get allowMultiselect() {
    return this.#allow_multiselect;
  }

  /**
   * The layout type of the poll.
   * @type {String}
   * @readonly
   * @public
   */
  get layoutType() {
    return this.#layout_type;
  }

  /**
   * The poll responses.
   * @type {MessagePollManager}
   * @readonly
   * @public
   */
  get _results() {
    return this.#results;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<Poll: ${this.question}>`;
  }

  /**
   * @method
   * @public
   */
  [util.inspect.custom]() {
    return this.toString();
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(
    format?: JsonTypes,
  ): PollCacheJSON | PollDiscordJSON | PollStorageJSON {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          question: this.#question,
          answers: this.#answers,
          expiry: this.expiry ? this.expiry * 1000 : null,
          allow_multiselect: this.allowMultiselect,
          layout_type: this.layoutType,
          _results: this._results.toJSON(format) as
            | MessagePollManagerCacheJSON
            | MessagePollManagerStorageJSON,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          question: this.#question,
          answers: this.#answers,
          expiry: this.expiry
            ? new Date(this.expiry * 1000).toISOString()
            : null,
          allow_multiselect: this.allowMultiselect,
          layout_type: this.layoutType,
          results: this._results.toJSON(
            format,
          ) as MessagePollManagerDiscordJSON,
        };
      }
    }
  }
}

export default Poll;
