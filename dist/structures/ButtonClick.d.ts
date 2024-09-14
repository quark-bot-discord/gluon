export default ButtonClick;
/**
 * Represents when a button is clicked.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
declare class ButtonClick extends Interaction {
    /**
     * Creates a button click interaction structure.
     * @param {Client} client The client instance.
     * @param {Object} data The interaction data from Discord.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.guildId The ID of the guild that this interaction belongs to.
     * @param {String} options.channelId The ID of the channel that this interaction belongs to.
     */
    constructor(client: Client, data: any, { guildId, channelId }?: {
        guildId: string;
        channelId: string;
    });
    /**
     * The custom id of the button.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get customId(): string;
    /**
     * The message which the button belongs to.
     * @type {Message}
     * @readonly
     * @public
     * @see {@link Message}
     */
    public readonly get message(): Message;
    #private;
}
import Interaction from "./Interaction.js";
import Message from "./Message.js";
import Client from "../Client.js";
//# sourceMappingURL=ButtonClick.d.ts.map