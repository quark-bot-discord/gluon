import { TO_JSON_TYPES_ENUM } from "../constants.js";
import MessagePollManager from "../managers/MessagePollManager.js";
import Emoji from "./Emoji.js";

class Poll {
  #_client;
  #_guild_id;
  #question;
  #answers;
  #expiry;
  #allow_multiselect;
  #layout_type;
  #results;
  constructor(client, data, { guild_id } = {}) {
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
    this.#_guild_id = BigInt(guild_id);

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
    this.#expiry = (new Date(data.expiry).getTime() / 1000) | 0;

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
    this.#results = new MessagePollManager(data.results);
  }

  /**
   * The question of the poll.
   * @type {String}
   * @readonly
   * @public
   */
  get question() {
    return this.#question;
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
        answer:
          a.poll_media.text ??
          new Emoji(this.#_client, a.poll_media.emoji, {
            guild_id: this.#_guild_id,
          }),
        answerString: a.poll_media.text ?? a.poll_media.emoji.mention,
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
    if (this.#layout_type === 1) return "DEFAULT";
    else return null;
  }

  /**
   * The raw layout type of the poll.
   * @type {Number}
   * @readonly
   * @public
   */
  get rawLayoutType() {
    return this.#layout_type;
  }

  /**
   * The poll responses.
   * @type {MessagePollManager}
   * @readonly
   * @public
   */
  get results() {
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
   * Returns the JSON representation of this structure.
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        return {
          question: this.question,
          answers: this.answers,
          expiry: this.expiry
            ? new Date(this.expiry * 1000).toISOString()
            : null,
          allow_multiselect: this.allowMultiselect,
          layout_type: this.rawLayoutType,
          results: this.results.toJSON(format),
        };
      }
    }
  }
}

export default Poll;
