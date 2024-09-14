export default cacheChannel;
/**
 * Automatically determines the channel type and caches the channel appropriately.
 * @param {Client} client The client instance.
 * @param {Object} data The raw channel data from Discord.
 * @param {String} guildId The id of the guild that the channel belongs to.
 * @param {Boolean?} nocache Whether the channel should be cached.
 * @returns {VoiceChannel | Thread | TextChannel}
 */
declare function cacheChannel(client: Client, data: any, guildId: string, nocache?: boolean | null): VoiceChannel | Thread | TextChannel;
import VoiceChannel from "../../structures/VoiceChannel.js";
import Thread from "../../structures/Thread.js";
import TextChannel from "../../structures/TextChannel.js";
//# sourceMappingURL=cacheChannel.d.ts.map