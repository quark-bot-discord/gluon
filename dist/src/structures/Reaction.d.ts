import Emoji from "./Emoji.js";
import util from "util";
import type {
  EmojiCacheJSON,
  EmojiDiscordJSON,
  EmojiStorageJSON,
  Emoji as EmojiType,
  ReactionCacheJSON,
  ReactionDiscordJSON,
  ReactionStorageJSON,
  Reaction as ReactionType,
  Client as ClientType,
  Guild as GuildType,
} from "#typings/index.d.ts";
import {
  APIReaction,
  GatewayMessageReactionAddDispatchData,
  Snowflake,
} from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";
/**
 * Represents a reaction belonging to a message.
 */
declare class Reaction implements ReactionType {
  #private;
  /**
   * Creates the structure for a reaction.
   * @param {Client} client The client instance.
   * @param {Object} data The raw reaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the reaction belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure}
   */
  constructor(
    client: ClientType,
    data:
      | APIReaction
      | ReactionStorageJSON
      | ReactionCacheJSON
      | ReactionDiscordJSON
      | GatewayMessageReactionAddDispatchData,
    {
      guildId,
    }: {
      guildId: Snowflake;
    },
  );
  /**
   * The number of reactions to this message.
   * @readonly
   * @type {Number}
   * @public
   */
  get count(): number;
  /**
   * The member objects of the members who reacted. Returns the user id of the member cannot be found.
   * @readonly
   * @type {Array<Member | String>}
   * @public
   */
  get reacted(): (string | import("#typings/index.d.ts").Member)[];
  /**
   * The user ids of the users who reacted.
   * @readonly
   * @type {Array<String>}
   * @public
   */
  get reactedIds(): string[];
  /**
   * The id of the guild that this reaction belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The guild that this reaction belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): GuildType | null;
  /**
   * The emoji used for the reaction.
   * @type {Emoji}
   * @readonly
   * @public
   */
  get emoji(): Emoji | EmojiType | undefined;
  /**
   * The user who added the first reaction.
   * @type {String?}
   * @readonly
   * @public
   */
  get initialReactor(): string | null;
  /**
   * Adds a user to the list of reactors.
   * @param {String} userId The id of the user to add as a reactor.
   * @throws {TypeError}
   * @public
   * @method
   */
  _addReactor(userId: Snowflake): void;
  /**
   * Removes a user from the list of reactors.
   * @param {String} userId The id of the user to add as a reactor.
   * @throws {TypeError}
   * @public
   * @method
   */
  _removeReactor(userId: Snowflake): void;
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
  toJSON(format: JsonTypes):
    | {
        emoji: EmojiStorageJSON | EmojiCacheJSON;
        _reacted: string[];
        initial_reactor: string | undefined;
        count?: undefined;
      }
    | {
        emoji: EmojiDiscordJSON;
        count: number;
        _reacted?: undefined;
        initial_reactor?: undefined;
      };
}
export default Reaction;
