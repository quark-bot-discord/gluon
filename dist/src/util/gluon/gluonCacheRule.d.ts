import type {
  GluonCacheRuleHandlerFunction,
  GluonCacheRuleRetrieveFunction,
  GluonCacheRule as GluonCacheRuleType,
  StaticManagerType,
} from "typings/index.d.ts";
declare class GluonCacheRule<T> implements GluonCacheRuleType<T> {
  handlerFunction?: GluonCacheRuleHandlerFunction<T>;
  name?: string;
  retrieveFunction?: GluonCacheRuleRetrieveFunction<T>;
  structureType?: StaticManagerType<T>;
  /**
   * The name of the rule.
   * @param {String} name What the rule is called.
   * @returns {GluonCacheRule}
   */
  setName(name: string): this;
  /**
   * Set the function which handles the rule.
   * The function is passed the structure data that this rule is for.
   * @param {Function} handlerFunction A function that handles the rule.
   * @returns {GluonCacheRule}
   * @public
   * @method
   * @throws {TypeError}
   */
  setHandlerFunction(handlerFunction: GluonCacheRuleHandlerFunction<T>): this;
  /**
   * Set the type of structure this rule is for.
   * Pass the class of the structure type.
   * @param {Object} structureType The type of structure this rule is for.
   * @returns {GluonCacheRule}
   * @public
   * @method
   * @throws {TypeError}
   */
  setStructureType(structureType: StaticManagerType<T>): this;
  /**
   * Set the function which retrieves the data for the structure.
   * @param {Function} retrieveFunction The function that retrieves the data for the structure.
   * @returns {GluonCacheRule}
   * @public
   * @method
   * @throws {TypeError}
   */
  setRetrieveFunction(
    retrieveFunction: GluonCacheRuleRetrieveFunction<T>,
  ): this;
  /**
   * Apply the rule to the structure type.
   * @returns {void}
   * @public
   * @method
   * @throws {Error}
   */
  applyRule(): void;
}
export default GluonCacheRule;
