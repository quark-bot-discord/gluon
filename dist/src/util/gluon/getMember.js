export default function getMember(client, guildId, memberId) {
  const guild = client.guilds.get(guildId);
  if (!guild) {
    throw new Error("GLUON: Guild not found in cache.");
  }
  return guild.members.get(memberId);
}
//# sourceMappingURL=getMember.js.map
