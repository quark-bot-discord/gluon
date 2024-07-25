/**
 * Gets a member from the cache or storage.
 * @param {Client} client The client instance.
 * @param {String} guild_id The id of the guild that the member belongs to.
 * @param {String} member_id The id fo the member to get.
 * @param {Boolean} destroy Whether the member should be removed from the cache/storage.
 * @returns {Promise<Member>}
 */
async function getMember(client, guild_id, member_id, destroy = false) {
  if (!client) throw new TypeError("GLUON: Client must be provided.");

  if (typeof guild_id != "string")
    throw new TypeError("GLUON: Guild id must be a string.");

  if (typeof member_id != "string")
    throw new TypeError("GLUON: Member id must be a string.");

  if (typeof destroy != "boolean")
    throw new TypeError("GLUON: Destroy must be a boolean.");

  const guild = client.guilds.get(guild_id);

  const member = guild.members.get(member_id) || null;

  if (destroy != false) guild.members.delete(member_id);

  return member;
}

export default getMember;
