export default Reaction;
/**
 * Represents a reaction belonging to a message.
 */
declare class Reaction {
    /**
     * Creates the structure for a reaction.
     * @param {Client} client The client instance.
     * @param {Object} data The raw reaction data from Discord.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.guildId The id of the guild that the reaction belongs to.
     * @see {@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure}
     */
    constructor(client: Client, data: any, { guildId }?: {
        guildId: string;
    });
    /**
     * The number of reactions to this message.
     * @readonly
     * @type {Number}
     * @public
     */
    public readonly get count(): number;
    /**
     * The member objects of the members who reacted. Returns the user id of the member cannot be found.
     * @readonly
     * @type {Array<Member | String>}
     * @public
     */
    public readonly get reacted(): any[];
    /**
     * The user ids of the users who reacted.
     * @readonly
     * @type {Array<String>}
     * @public
     */
    public readonly get reactedIds(): string[];
    /**
     * The id of the guild that this reaction belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The guild that this reaction belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild;
    /**
     * The emoji used for the reaction.
     * @type {Emoji}
     * @readonly
     * @public
     */
    public readonly get emoji(): Emoji;
    /**
     * The user who added the first reaction.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get initialReactor(): string;
    /**
     * Adds a user to the list of reactors.
     * @param {String} userId The id of the user to add as a reactor.
     * @throws {TypeError}
     * @public
     * @method
     */
    public _addReactor(userId: string): void;
    /**
     * Removes a user from the list of reactors.
     * @param {String} userId The id of the user to add as a reactor.
     * @throws {TypeError}
     * @public
     * @method
     */
    public _removeReactor(userId: string): void;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} [format] The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format?: number): any;
    #private;
}
import Emoji from "./Emoji.js";
import Client from "../Client.js";
//# sourceMappingURL=Reaction.d.ts.map