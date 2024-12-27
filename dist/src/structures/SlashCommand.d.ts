export default SlashCommand;
/**
 * Represents a slash command.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands}
 * @extends {Interaction}
 */
declare class SlashCommand extends Interaction {
    /**
     * The raw slash command data from Discord.
     * @type {Object?}
     * @readonly
     * @public
     */
    public readonly get data(): any | null;
    /**
     * The options provided with the slash command.
     * @type {Array<Object>}
     * @readonly
     * @public
     */
    public readonly get options(): Array<any>;
    #private;
}
import Interaction from "./Interaction.js";
//# sourceMappingURL=SlashCommand.d.ts.map