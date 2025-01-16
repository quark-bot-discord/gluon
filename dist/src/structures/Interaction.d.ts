export default Interaction;
/**
 * Represents an interaction received over the gateway.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-structure}
 */
declare class Interaction {
    [x: number]: () => string;
    /**
     * Edits a response to an interaction. Works up to 15 minutes after the response was sent.
     * @param {Client} client The client instance.
     * @param {String} interactionToken The interaction token.
     * @param {Object?} [options] The new interaction response options.
     * @param {String?} [options.content] The new content of the interaction response.
     * @param {Array<FileUpload>?} [options.files] The new files to send with the interaction response.
     * @param {Array<Embed>?} [options.embeds] The new embeds to send with the interaction response.
     * @param {Array<ActionRow>?} [options.components] The new components to send with the interaction response.
     * @returns {Promise<Interaction>}
     * @public
     * @async
     * @method
     * @throws {Error | TypeError}
     */
    public static edit(client: Client, interactionToken: string, { content, files, embeds, components }?: any | null): Promise<Interaction>;
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
     * The token of the interaction.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get token(): string;
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
    public readonly get guild(): Guild | null;
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
    public readonly get channel(): (TextChannel | VoiceChannel | Thread) | null;
    /**
     * The member that triggered the interaction, if it was run in a guild.
     * @type {Member?}
     * @readonly
     * @public
     */
    public readonly get member(): Member | null;
    /**
     * The id of the member that triggered the interaction, if it was run in a guild.
     * @type {String?}
     * @readonly
     * @public
     */
    public readonly get memberId(): string | null;
    /**
     * Prompts a user to enter text using a modal.
     * @param {Object} options Modal options.
     * @param {String} options.title The title of the modal.
     * @param {String} options.customId The custom id of the modal.
     * @param {TextInput} options.textInputModal The text input modal.
     * @returns {Promise<void>}
     * @public
     * @async
     * @method
     * @throws {Error | TypeError}
     */
    public textPrompt({ title, customId, textInputModal }?: {
        title: string;
        customId: string;
        textInputModal: TextInput;
    }): Promise<void>;
    /**
     * Responds to autocomplete interactions.
     * @param {Object} options Autocompletion options.
     * @param {Array<CommandChoice>} options.choices The choices to send back.
     * @returns {Promise<Interaction>}
     * @public
     * @async
     * @method
     * @throws {Error}
     */
    public autocompleteResponse({ choices }?: {
        choices: Array<CommandChoice>;
    }): Promise<Interaction>;
    /**
     * Replies to an interaction.
     * @param {Object?} [options] An embed, components, and whether the response should be as an ephemeral message.
     * @param {String?} [options.content] The content of the interaction response.
     * @param {Array<FileUpload>?} [options.files] The files to send with the interaction response.
     * @param {Array<Embed>?} [options.embeds] The embeds to send with the interaction response.
     * @param {Array<ActionRow>?} [options.components] The components to send with the interaction response.
     * @param {Boolean?} [options.quiet] Whether the response should be an ephemeral message.
     * @returns {Promise<Interaction>}
     * @public
     * @async
     * @method
     */
    public reply({ content, files, embeds, components, quiet }?: any | null): Promise<Interaction>;
    /**
     * Silently acknowledges an interaction.
     * @returns {Promise<Interaction>}
     * @public
     * @async
     * @method
     */
    public acknowledge(): Promise<Interaction>;
    /**
     * Edits a response to an interaction. Works up to 15 minutes after the response was sent.
     * @param {Object?} [options] The new interaction response options.
     * @param {String?} [options.content] The new content of the interaction response.
     * @param {Array<FileUpload>?} [options.files] The new files to send with the interaction response.
     * @param {Array<Embed>?} [options.embeds] The new embeds to send with the interaction response.
     * @param {Array<ActionRow>?} [options.components] The new components to send with the interaction response.
     * @returns {Promise<Interaction>}
     * @public
     * @async
     * @method
     * @throws {Error | TypeError}
     */
    public edit({ content, files, embeds, components }?: any | null): Promise<Interaction>;
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
import Member from "./Member.js";
import TextInput from "../util/builder/textInputBuilder.js";
import { CommandChoice } from "../util.js";
import Client from "../Client.js";
//# sourceMappingURL=Interaction.d.ts.map