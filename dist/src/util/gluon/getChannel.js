import getGuild from "./getGuild.js";
export default function getChannel(client, guildId, channelId) {
  if (!client) throw new TypeError("GLUON: Client must be a Client instance.");
  if (typeof guildId !== "string")
    throw new TypeError("GLUON: Guild ID must be a string.");
  const guild = getGuild(client, guildId);
  if (!guild) {
    throw new Error("GLUON: Guild not found in cache.");
  }
  return guild.channels.get(channelId);
}
//# sourceMappingURL=getChannel.js.map
