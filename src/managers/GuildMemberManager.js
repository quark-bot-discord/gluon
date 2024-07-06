const Client = require("../Client");
const Guild = require("../structures/Guild");
const Member = require("../structures/Member");
const User = require("../structures/User");

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
   * Stores a member.
   * @param {Member} member The member to store.
   */
  store(member) {
    // this.client.dataStorage.query("INSERT INTO Members (id, guild, nick, joined_at, avatar, communication_disabled_until, attributes) VALUES (:id, :guild, :nick, :joined_at, :avatar, :communication_disabled_until, :attributes) ON DUPLICATE KEY UPDATE nick = VALUES(nick), avatar = VALUES(avatar), communication_disabled_until = VALUES(communication_disabled_until), attributes = VALUES(attributes);",
    //     { id: member.id, guild: this.guild.id, nick: member.nick, joined_at: member.joined_at, avatar: member.formattedAvatarHash, communication_disabled_until: member.communication_disabled_until, attributes: member._attributes })
    //     .then(() => this.client.emit("debug", `ADDED ${member.id} OF ${this.guild.id} TO MEMBER STORAGE`));
    // if (member.user)
    //     this.client.users.store(member.user);
    // if (Array.isArray(member._roles) && member._roles.length != 0) {
    //     const valuesTemplate = member._roles.map(() => `(?, ?, ?)`).join(',');
    //     const values = [];
    //     for (let i = 0; i < member._roles.length; i++) {
    //         values.push(member.id);
    //         values.push(member._roles[i]);
    //         values.push(this.guild.id);
    //     }
    //     this.client.dataStorage.query(`INSERT INTO MemberRoles (memberid, roleid, guild) VALUES ${valuesTemplate} ON DUPLICATE KEY UPDATE memberid = VALUES(memberid), roleid = VALUES(roleid), guild = VALUES(guild);`, values)
    //         .then(() => this.client.emit("debug", `ADDED ${member.id} OF ${this.guild.id} TO MEMBER ROLES STORAGE`));
    // }
  }

  /**
   * Retrieve a member from the storage.
   * @param {String | BigInt} user_id The id of the user to retrieve.
   * @returns {Member} The retrieved member.
   */
  async retrieve(user_id) {
    // const fetchedMemberRaw = await this.client.dataStorage.query(`
    //     SELECT *
    //     FROM Members
    //     WHERE id = :id AND guild = :guild;
    //     `, { id: user_id, guild: this.guild.id });
    // if (!fetchedMemberRaw)
    //     return null;
    // const fetchedMember = fetchedMemberRaw[0][0];
    // if (!fetchedMember)
    //     return null;
    // fetchedMember._attributes = fetchedMember.attributes;
    // fetchedMember.joined_at = fetchedMember.joined_at * 1000;
    // const fetchedMemberRolesRaw = await this.client.dataStorage.query(`
    //     SELECT roleid
    //     FROM MemberRoles
    //     WHERE memberid = :memberid AND guild = :guild;
    //     `, { memberid: user_id, guild: this.guild.id });
    // if (fetchedMemberRolesRaw) {
    //     const fetchedRoles = fetchedMemberRolesRaw[0].map(roles => roles.roleid);
    //     fetchedMember.roles = fetchedRoles;
    // }
    // const user = await this.client.users.localFetch(user_id);
    // return new Member(this.client, fetchedMember, user_id, this.guild.id.toString(), user, { noDbStore: true });
  }

  /**
   * Cleans up the stored member data for this guild.
   */
  cleanup() {
    // this.client.dataStorage.query(`
    //     DELETE
    //     FROM Members
    //     WHERE guild = :guild;
    //     `,
    //     { guild: this.guild.id })
    //     .then(() => this.client.emit("debug", `CLEANUP MEMBERS ${this.guild.id}`));
    // this.client.dataStorage.query(`
    //     DELETE
    //     FROM MemberRoles
    //     WHERE guild = :guild;
    //     `,
    //     { guild: this.guild.id })
    //     .then(() => this.client.emit("debug", `CLEANUP MEMBER ROLES ${this.guild.id}`));
  }

  /**
   * Removes the user from the storage.
   * @param {BigInt | String} user_id The id of the user to remove from storage.
   */
  remove(user_id) {
    // this.client.dataStorage.query(`
    //     DELETE
    //     FROM Members
    //     WHERE guild = :guild AND id = :id;
    //     `,
    //     { guild: this.guild.id, id: user_id })
    //     .then(() => this.client.emit("debug", `CLEANUP MEMBER ${user_id} FROM ${this.guild.id}`));

    // this.client.dataStorage.query(`
    //     DELETE
    //     FROM MemberRoles
    //     WHERE guild = :guild AND memberid = :memberid;
    //     `,
    //     { guild: this.guild.id, memberid: user_id })
    //     .then(() => this.client.emit("debug", `CLEANUP MEMBER ROLES ${user_id} FROM ${this.guild.id}`));

    this.cache.delete(user_id.toString());
  }

  /**
   * Gets a stored member without making an API request.
   * @param {BigInt | String} user_id The id of the member to get.
   * @returns {Member}
   */
  async localFetch(user_id) {
    const cached = this.cache.get(user_id.toString());
    if (cached) return cached;

    const stored = await this.retrieve(user_id);
    if (stored) return stored;
  }

  /**
   * Fetches a member.
   * @param {BigInt | String} user_id The id of the member to fetch.
   * @returns {Promise<Member>} The fetched member.
   */
  async fetch(user_id) {
    // const localFetch = await this.localFetch(user_id);
    // if (localFetch)
    //     return localFetch;
    // const data = await this.client.request.makeRequest("getGuildMember", [this.guild.id, user_id]);
    // return new Member(this.client, data, user_id, this.guild.id.toString(), data.user);
  }

  /**
   * Searches for members via a search query.
   * @param {String} query The search query.
   * @returns {Promise<Array<Member>?>} The members which match the search query.
   */
  async search(query) {
    const body = {};

    body.query = query;

    body.limit = 1000;

    const data = await this.client.request.makeRequest(
      "getSearchGuildMembers",
      [this.guild.id],
      body,
    );
    if (data.length != 0) {
      let members = [];

      for (let i = 0; i < data.length; i++)
        members.push(
          new Member(
            this.client,
            data[i],
            data[i].user.id,
            this.guild.id.toString(),
            data[i].user,
          ),
        );

      return members;
    } else return null;
  }

  /**
   * Sweeps all members which have been flagged for deletion.
   * @param {Number} cacheCount The maximum number of users which may be cached.
   * @returns {Number} The remaining number of cached members.
   */
  sweepMembers(cacheCount) {
    if (this.cache.size == 0) return;

    const currentCacheSize = this.cache.size;
    const currentCacheKeys = this.cache.keys();

    for (
      let cacheSize = currentCacheSize;
      cacheCount < cacheSize;
      cacheSize--
    ) {
      const current = currentCacheKeys.next().value;
      if (current != this.client.user.id);
      this.cache.delete(current);
    }

    return this.cache.size;
  }
}

module.exports = GuildMemberManager;
