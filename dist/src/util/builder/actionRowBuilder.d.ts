export default ActionRow;
/**
 * Helps to construct an action row for a message.
 */
declare class ActionRow {
    type: number;
    components: any[];
    /**
     * Adds a component to the action row.
     * @param {Button | Dropdown} component A component to add to the action row.
     * @returns {ActionRow}
     */
    addComponent(component: Button | Dropdown): ActionRow;
    /**
     * Returns the correct Discord format for an action row.
     * @returns {Object}
     */
    toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): any;
}
//# sourceMappingURL=actionRowBuilder.d.ts.map