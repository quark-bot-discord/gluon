import util from "util";
/**
 * Represents a reaction belonging to a message.
 */
declare class Reaction {
  #private;
  /**
   * Creates the structure for a reaction.
   * @param {Client} client The client instance.
   * @param {Object} data The raw reaction data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the reaction belongs to.
   * @see {@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure}
   */
  constructor(client: any, data: any, { guildId }?: any);
  /**
   * The number of reactions to this message.
   * @readonly
   * @type {Number}
   * @public
   */
  get count(): any;
  /**
   * The member objects of the members who reacted. Returns the user id of the member cannot be found.
   * @readonly
   * @type {Array<Member | String>}
   * @public
   */
  get reacted(): any;
  /**
   * The user ids of the users who reacted.
   * @readonly
   * @type {Array<String>}
   * @public
   */
  get reactedIds(): any;
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
  get guild(): any;
  /**
   * The emoji used for the reaction.
   * @type {Emoji}
   * @readonly
   * @public
   */
  get emoji(): any;
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
  _addReactor(userId: any): void;
  /**
   * Removes a user from the list of reactors.
   * @param {String} userId The id of the user to add as a reactor.
   * @throws {TypeError}
   * @public
   * @method
   */
  _removeReactor(userId: any): void;
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
        emoji: any;
        _reacted: any;
        initial_reactor: string | undefined;
        count?: undefined;
      }
    | {
        emoji: any;
        count: any;
        _reacted?: undefined;
        initial_reactor?: undefined;
      };
}
export default Reaction;
