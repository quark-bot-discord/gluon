const Client = require("../Client");
const { PERMISSIONS } = require("../constants");
const Guild = require("../structures/Guild");
const Invite = require("../structures/Invite");
const checkPermission = require("../util/checkPermission");

/**
 * Manages all invites within a guild.
 */
class GuildInviteManager {
  /**
   * Creates a guild invite manager.
   * @param {Client} client The client instance.
   * @param {Guild} guild The guild that this invite manager belongs to.
   */
  constructor(client, guild) {
    this.client = client;

    this.guild = guild;

    this.cache = new Map();
  }

  /**
   * Fetches all invites for this guild.
   * @returns {Promise<Array<Invite>?>} The fetched invites.
   */
  async fetch() {
    if (
      !checkPermission(
        await this.guild.me().catch(() => null),
        PERMISSIONS.MANAGE_GUILD,
      )
    )
      return null;

    const data = await this.client.request.makeRequest("getGuildInvites", [
      this.guild.id,
    ]);

    this.cache.clear();

    return data.map(
      (raw) => new Invite(this.client, raw, this.guild?.id?.toString()),
    );
  }
}

module.exports = GuildInviteManager;
