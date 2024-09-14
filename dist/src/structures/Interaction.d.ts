export default Interaction;
/**
 * Represents an interaction received over the gateway.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-structure}
 */
declare class Interaction {
    /**
     * Creates the structure for an interaction.
     * @param {Client} client The client instance.
     * @param {Object} data The interaction data from Discord.
     */
    constructor(client: Client, data: any);
    /**
     * The id of the interaction.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get id(): string;
    /**
     * The type of interaction.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get type(): number;
    /**
     * The id of the guild that this interaction belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get guildId(): string;
    /**
     * The guild that this interaction belongs to.
     * @type {Guild?}
     * @readonly
     * @public
     */
    public readonly get guild(): Guild;
    /**
     * The id of the channel that this interaction belongs to.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get channelId(): string;
    /**
     * The channel that this interaction belongs to.
     * @type {(TextChannel | VoiceChannel | Thread)?}
     * @readonly
     * @public
     */
    public readonly get channel(): any;
    /**
     * The member that triggered the interaction, if it was run in a guild.
     * @type {Member?}
     * @readonly
     * @public
     */
    public readonly get member(): Member;
    /**
     * Prompts a user to enter text using a modal.
     * @param {Object} options Modal options.
     * @returns {Promise<void>}
     * @public
     * @async
     * @method
     * @throws {Error | TypeError}
     */
    public textPrompt({ title, customId, textInputModal }?: any): Promise<void>;
    /**
     * Responds to autocomplete interactions.
     * @param {Object} options Autocompletion options.
     * @returns {Promise<Interaction>}
     * @public
     * @async
     * @method
     * @throws {Error}
     */
    public autocompleteResponse({ choices }?: any): Promise<Interaction>;
    /**
     * Replies to an interaction.
     * @param {String?} content The message content to send in the response to the interaction.
     * @param {Object?} options An embed, components, and whether the response should be as an ephemeral message.
     * @returns {Promise<Interaction>}
     * @public
     * @async
     * @method
     */
    public reply(content: string | null, { files, embeds, components, quiet }?: any | null): Promise<Interaction>;
    /**
     * Edits a response to an interaction. Works up to 15 minutes after the response was sent.
     * @param {String?} content The new interaction response content.
     * @param {Object?} options The new interaction response options.
     * @returns {Promise<Interaction>}
     * @public
     * @async
     * @method
     * @throws {Error | TypeError}
     */
    public edit(content: string | null, { files, embeds, components }?: any | null): Promise<Interaction>;
    /**
     * Silently acknowledges an interaction.
     * @returns {Promise<Interaction>}
     * @public
     * @async
     * @method
     */
    public acknowledge(): Promise<Interaction>;
    /**
     * @method
     * @public
     */
    public toString(): string;
    /**
     * Returns the JSON representation of this structure.
     * @param {Number} format The format to return the data in.
     * @returns {Object}
     * @public
     * @method
     */
    public toJSON(format: number): any;
    #private;
}
import Member from "./Member.js";
import Client from "../Client.js";
//# sourceMappingURL=Interaction.d.ts.map