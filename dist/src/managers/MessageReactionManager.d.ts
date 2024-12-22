export default MessageReactionManager;
/**
 * Manages the reactions of a message.
 */
declare class MessageReactionManager {
    /**
     * Creates a message reaction manager.
     * @param {Object} existingReactions Existing reactions for a message.
     */
    constructor(client: any, guild: any, existingReactions?: any);
    /**
     * Adds a reaction to a message.
     * @param {String} userId The id of the user who reacted.
     * @param {String} emoji The id or unicode emoji that was reacted with.
     * @param {Object} data The raw MESSAGE_REACTION_ADD data.
     * @throws {TypeError}
     * @public
     * @method
     */
    public _addReaction(userId: string, emoji: string, data: any): void;
    /**
     * Removes a reaction from a message.
     * @param {String} userId The id of the user whose reaction was removed.
     * @param {String} emoji The id or unicode emoji for which the reaction was removed.
     * @throws {TypeError}
     * @public
     * @method
     */
    public _removeReaction(userId: string, emoji: string): void;
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
//# sourceMappingURL=MessageReactionManager.d.ts.map