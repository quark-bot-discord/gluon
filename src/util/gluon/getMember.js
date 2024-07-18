/**
 * Gets a member from the cache or storage.
 * @param {Client} client The client instance.
 * @param {String} guild_id The id of the guild that the member belongs to.
 * @param {String} member_id The id fo the member to get.
 * @param {Boolean} destroy Whether the member should be removed from the cache/storage.
 * @returns {Promise<Member>}
 */
async function getMember(client, guild_id, member_id, destroy = false) {

  if (!client)
    throw new TypeError("GLUON: Client must be provided.");

  if (typeof guild_id != "string")
    throw new TypeError("GLUON: Guild id must be a string.");

  if (typeof member_id != "string")
    throw new TypeError("GLUON: Member id must be a string.");

  if (typeof destroy != "boolean")
    throw new TypeError("GLUON: Destroy must be a boolean.");

  const guild = client.guilds.cache.get(guild_id);

  const member = guild.members.cache.get(member_id) || null;

  if (!member) {
    const storedMember = await guild.members.retrieve(member_id);

    if (storedMember) {
      guild.members.remove(member_id);

      if (destroy != false) guild.members.cache.delete(member_id);

      return storedMember;
    } else return null;
  } else {
    guild.members.remove(member_id);

    if (destroy != false) guild.members.cache.delete(member_id);

    return member;
  }
}

module.exports = getMember;
