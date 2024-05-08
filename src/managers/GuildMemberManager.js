const Client = require("../Client");
const Guild = require("../structures/Guild");
const Member = require("../structures/Member");

/**
 * Manages all members belonging to this guild.
 */
class GuildMemberManager {

    /**
     * Creates a member manager.
     * @param {Client} client The client instance.
     * @param {Guild} guild The guild that this member manager belongs to.
     */
    constructor(client, guild) {

        this.client = client;

        this.guild = guild;

        this.cache = new Map();

    }

    /**
     * Fetches a member.
     * @param {BigInt | String} user_id The id of the member to fetch.
     * @returns {Promise<Member>} The fetched member.
     */
    async fetch(user_id) {

        const cached = this.cache.get(user_id.toString());
        if (cached)
            return cached;

        const data = await this.client.request.makeRequest("getGuildMember", [this.guild.id, user_id]);

        return new Member(this.client, data, user_id, this.guild.id.toString(), data.user);

    }

    /**
     * Searches for members via a search query.
     * @param {String} query The search query.
     * @returns {Promise<Array<Member>> | null} The members which match the search query.
     */
    async search(query) {

        const body = {};

        body.query = query;

        body.limit = 1000;

        const data = await this.client.request.makeRequest("getSearchGuildMembers", [this.guild.id], body);
        if (data.length != 0) {

            let members = [];

            for (let i = 0; i < data.length; i++)
                members.push(new Member(this.client, data[i], data[i].user.id, this.guild.id.toString(), data[i].user));

            return members;

        } else
            return null;

    }

    /**
     * Sweeps all members which have been flagged for deletion.
     * @param {Number} cacheCount The maximum number of users which may be cached.
     * @returns {Number} The remaining number of cached members.
     */
    sweepMembers(cacheCount) {

        if (this.cache.size == 0)
            return;

        const currentCacheSize = this.cache.size;
        const currentCacheKeys = this.cache.keys();

        for (let cacheSize = currentCacheSize; cacheCount < cacheSize; cacheSize--)
            this.cache.delete(currentCacheKeys.next().value);

        return this.cache.size;

    }

}

module.exports = GuildMemberManager;