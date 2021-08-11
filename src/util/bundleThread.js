function bundleThread(thread) {
    const data = {};
    data.id = thread.id.toString();
    data.type = thread.type;
    data.guild_id = thread.guild ? thread.guild.id.toString() : thread.guild_id.toString();
    data.name = thread.name;
    data.owner_id = thread.owner ? thread.owner.id.toString() : thread.owner_id.toString();
    data.parent_id = thread.parent ? thread.parent.id.toString() : thread.parent_id.toString();
    return data;
}

module.exports = bundleThread;