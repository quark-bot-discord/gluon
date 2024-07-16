async function getMember(client, guild_id, member_id, destroy = false) {
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
