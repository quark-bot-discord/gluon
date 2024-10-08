export default ModalResponse;
/**
 * Represents when a modal is submitted.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-object-text-input-interaction}
 * @extends {Interaction}
 */
declare class ModalResponse extends Interaction {
    /**
     * The entered modal values.
     * @type {Array<Object>}
     * @readonly
     * @public
     */
    public readonly get values(): any[];
    #private;
}
import Interaction from "./Interaction.js";
//# sourceMappingURL=ModalResponse.d.ts.map