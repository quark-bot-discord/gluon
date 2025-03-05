export default function getGuild(client, guildId) {
  if (!client) throw new TypeError("GLUON: Client must be a Client instance.");
  if (typeof guildId !== "string")
    throw new TypeError("GLUON: Guild ID must be a string.");
  return client.guilds.get(guildId);
}
//# sourceMappingURL=getGuild.js.map
