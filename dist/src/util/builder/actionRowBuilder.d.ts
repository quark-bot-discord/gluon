/**
 * Helps to construct an action row for a message.
 */
declare class ActionRow {
  components: any;
  type: any;
  /**
   * Creates an action row.
   */
  constructor();
  /**
   * Adds a component to the action row.
   * @param {Button | Dropdown} component A component to add to the action row.
   * @returns {ActionRow}
   */
  addComponent(component: any): this;
  /**
   * Returns the correct Discord format for an action row.
   * @returns {Object}
   */
  toJSON(
    format: number,
    {
      suppressValidation,
    }?: {
      suppressValidation: boolean;
    },
  ): {
    type: any;
    components: any;
  };
}
export default ActionRow;
