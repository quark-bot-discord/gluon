export default TextChannel;
/**
 * Represents a text channel within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
 */
declare class TextChannel extends Channel {
    /**
     * Creates the structure for a text channel.
     * @param {Client} client The client instance.
     * @param {Object} data Raw channel data.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.guildId The ID of the guild that this channel belongs to.
     * @param {Boolean?} options.nocache Whether this channel should be cached or not.
     * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
     */
    constructor(client: Client, data: any, { guildId, nocache }?: {
        guildId: string;
        nocache: boolean | null;
    });
    /**
     * Bulk deletes all the message IDs provided.
     * @param {String[]} messages An array of message IDs, as strings.
     * @returns {Promise<void>}
     * @method
     * @async
     * @public
     * @throws {Error | TypeError}
     */
    public bulkDelete(messages: string[], { reason }?: {}): Promise<void>;
    #private;
}
import Channel from "./Channel.js";
import Client from "../Client.js";
//# sourceMappingURL=TextChannel.d.ts.map