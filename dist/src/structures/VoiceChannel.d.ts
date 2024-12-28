export default VoiceChannel;
/**
 * Represents a voice channel.
 * @extends {Channel}
 */
declare class VoiceChannel extends Channel {
    /**
     * Creates the structure for a voice channel.
     * @param {Client} client The client instance.
     * @param {Object} data The raw channel data from Discord.
     * @param {Object} options Additional options for this structure.
     * @param {String} options.guildId The id of the guild that the voice channel belongs to.
     * @param {Boolean?} [options.nocache] Whether the voice channel should be cached.
     */
    constructor(client: Client, data: any, { guildId, nocache }?: {
        guildId: string;
        nocache?: boolean | null;
    });
    /**
     * The bitrate of the channel.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get bitrate(): number;
    /**
     * The user limit of the channel.
     * @type {Number}
     * @readonly
     * @public
     */
    public readonly get userLimit(): number;
    /**
     * The region of the voice channel.
     * @type {String}
     * @readonly
     * @public
     */
    public readonly get rtcRegion(): string;
    #private;
}
import Channel from "./Channel.js";
import Client from "../Client.js";
//# sourceMappingURL=VoiceChannel.d.ts.map