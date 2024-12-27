export default OptionSelect;
/**
 * Represents when an option is selected.
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure}
 * @extends {Interaction}
 */
declare class OptionSelect extends Interaction {
    /**
     * Creates an option selected interaction structure.
     * @param {Client} client The client instance.
     * @param {Object} data The interaction data from Discord.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.guildId The ID of the guild that this interaction belongs to.
     * @param {String} options.channelId The ID of the channel that this interaction belongs to.
     */
    constructor(client: Client, data: any, { channelId, guildId }: {
        guildId: string;
        channelId: string;
    });
    /**
     * The custom id of the select menu.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get customId(): string;
    /**
     * The message which the option belongs to.
     * @type {Message}
     * @readonly
     * @public
     */
    public readonly get message(): Message;
    /**
     * The values selected from the select menu.
     * @type {Array<Object>}
     * @readonly
     * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure}
     * @public
     */
    public readonly get values(): Array<any>;
    #private;
}
import Interaction from "./Interaction.js";
import Message from "./Message.js";
import Client from "../Client.js";
//# sourceMappingURL=OptionSelect.d.ts.map