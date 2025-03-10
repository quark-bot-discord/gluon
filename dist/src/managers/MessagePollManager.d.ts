import type {
  MessagePollManagerCacheJSON,
  MessagePollManagerDiscordJSON,
  MessagePollManagerStorageJSON,
  MessagePollManager as MessagePollManagerType,
  Client as ClientType,
} from "#typings/index.d.ts";
import { JsonTypes } from "#typings/enums.js";
import { Snowflake } from "#typings/discord.js";
/**
 * Manages a poll for a message.
 */
declare class MessagePollManager implements MessagePollManagerType {
  #private;
  /**
   * Creates a message poll manager.
   * @param {Object} existingResponses Existing responses for a poll.
   */
  constructor(
    client: ClientType,
    existingResponses?:
      | MessagePollManagerCacheJSON
      | MessagePollManagerStorageJSON,
  );
  /**
   * Adds a response to a poll.
   * @param {String} user_id The id of the user who voted.
   * @param {Number} answer_id The id of the answer that was voted for.
   * @throws {TypeError}
   * @public
   * @method
   */
  _addVote(user_id: Snowflake, answer_id: number): void;
  /**
   * Removes a response from a poll.
   * @param {String} user_id The id of the user whose vote was removed.
   * @param {Number} answer_id The id of the answer for which the vote was removed.
   * @throws {TypeError}
   * @public
   * @method
   */
  _removeVote(user_id: Snowflake, answer_id: number): void;
  /**
   * Returns the result for a given answer.
   * @param {Number} answerId The ID of the answer to get the result for.
   * @returns {Array<String>}
   */
  getResult(answerId: number): string[];
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(
    format?: JsonTypes,
  ):
    | MessagePollManagerCacheJSON
    | MessagePollManagerStorageJSON
    | MessagePollManagerDiscordJSON;
}
export default MessagePollManager;
