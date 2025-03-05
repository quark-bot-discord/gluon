import { Snowflake } from "src/interfaces/gluon.js";
import type {
  MessageReactionManager as MessageReactionManagerType,
  Guild as GuildType,
  MessageReactionManagerCacheJSON,
  MessageReactionManagerStorageJSON,
  ReactionCacheJSON,
  ReactionStorageJSON,
  ReactionDiscordJSON,
  Client as ClientType,
} from "../../typings/index.d.ts";
import { GatewayMessageReactionAddDispatchData } from "discord-api-types/v10";
import { JsonTypes } from "../../typings/enums.js";
/**
 * Manages the reactions of a message.
 */
declare class MessageReactionManager implements MessageReactionManagerType {
  #private;
  /**
   * Creates a message reaction manager.
   * @param {Object} existingReactions Existing reactions for a message.
   */
  constructor(
    client: ClientType,
    guild: GuildType,
    existingReactions?:
      | MessageReactionManagerCacheJSON
      | MessageReactionManagerStorageJSON,
  );
  /**
   * Adds a reaction to a message.
   * @param {String} userId The id of the user who reacted.
   * @param {String} emoji The id or unicode emoji that was reacted with.
   * @param {Object} data The raw MESSAGE_REACTION_ADD data.
   * @throws {TypeError}
   * @public
   * @method
   */
  _addReaction(
    userId: Snowflake,
    emoji: Snowflake | string,
    data: GatewayMessageReactionAddDispatchData,
  ): void;
  /**
   * Removes a reaction from a message.
   * @param {String} userId The id of the user whose reaction was removed.
   * @param {String} emoji The id or unicode emoji for which the reaction was removed.
   * @throws {TypeError}
   * @public
   * @method
   */
  _removeReaction(userId: Snowflake, emoji: Snowflake | string): void;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format?: JsonTypes):
    | {
        [key: string]: ReactionStorageJSON | ReactionCacheJSON;
      }
    | ReactionDiscordJSON[];
}
export default MessageReactionManager;
