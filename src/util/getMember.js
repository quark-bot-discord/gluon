function getMember(client, guild_id, member_id, destroy = false) {

    return new Promise(async (resolve, reject) => {

        const guild = client.guilds.cache.get(guild_id);

        const member = guild.members.cache.get(member_id) || null;

        if (!member) {
            
            const storedMember = await guild.members.retrieve(member_id);

            if (storedMember) {

                guild.members.remove(member_id);

                if (destroy != false)
                    guild.members.cache.delete(member_id);

                return resolve(storedMember);

            } else
                return resolve(null);

        } else {

            guild.members.remove(member_id);

            if (destroy != false)
                guild.members.cache.delete(member_id);

            return resolve(member);

        }

    });

}

module.exports = getMember;