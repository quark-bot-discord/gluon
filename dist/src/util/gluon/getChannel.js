import getGuild from "./getGuild.js";
export default function getChannel(client, guildId, channelId) {
  const guild = getGuild(client, guildId);
  if (!guild) {
    throw new Error("GLUON: Guild not found in cache.");
  }
  return guild.channels.get(channelId);
}
//# sourceMappingURL=getChannel.js.map
