import MessagePollManager from "../managers/MessagePollManager.js";
import util from "util";
declare class Poll {
  #private;
  /**
   * Creates the structure for a poll.
   * @param {Client} client The client instance.
   * @param {Object} data The raw poll data from Discord.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The ID of the guild that this poll belongs to.
   */
  constructor(client: any, data: any, { guildId }?: any);
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
  get guild(): any;
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
  get answers(): any;
  /**
   * The UNIX timestamp of the expiry time for the poll.
   * @type {Number}
   * @readonly
   * @public
   */
  get expiry(): number;
  /**
   * Whether the poll allows multiselect.
   * @type {Boolean}
   * @readonly
   * @public
   */
  get allowMultiselect(): any;
  /**
   * The layout type of the poll.
   * @type {String}
   * @readonly
   * @public
   */
  get layoutType(): "DEFAULT" | null;
  /**
   * The raw layout type of the poll.
   * @type {Number}
   * @readonly
   * @public
   */
  get rawLayoutType(): any;
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
  toJSON(format: any):
    | {
        question: any;
        answers: any;
        expiry: number | null;
        allow_multiselect: any;
        layout_type: any;
        _results:
          | {
              [key: string]: string[];
            }
          | {
              answer_counts: {
                id: number;
                count: any;
                me_voted: any;
              }[];
            };
        results?: undefined;
      }
    | {
        question: any;
        answers: any;
        expiry: string | null;
        allow_multiselect: any;
        layout_type: any;
        results:
          | {
              [key: string]: string[];
            }
          | {
              answer_counts: {
                id: number;
                count: any;
                me_voted: any;
              }[];
            };
        _results?: undefined;
      };
}
export default Poll;
