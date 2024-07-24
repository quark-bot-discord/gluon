const { PERMISSIONS } = require("../constants");
const Channel = require("./Channel");
const Message = require("./Message");
const checkPermission = require("../util/discord/checkPermission");

/**
 * Represents a text channel within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
 */
class TextChannel extends Channel {
  #_client;
  /**
   * Creates the structure for a text channel.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {String} guild_id The ID of the guild that this channel belongs to.
   * @param {Boolean?} nocache Whether this channel should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
   */
  constructor(client, data, { guild_id, nocache = false } = { nocache: false }) {
    super(client, data, { guild_id });

    this.#_client = client;

    if (nocache == false && this.#_client.cacheChannels == true)
      this.guild?.channels.set(data.id, this);

    if (data.messages)
      for (let i = 0; i < data.messages.length; i++)
        new Message(this.#_client, data.messages[i], {
          channel_id: this.id,
          guild_id,
        });
  }

  /**
   * Bulk deletes all the message IDs provided.
   * @param {String[]} messages An array of message IDs, as strings.
   * @returns {void}
   */
  async bulkDelete(messages, { reason } = {}) {
    if (
      !checkPermission(
        (await this.guild.me()).permissions,
        PERMISSIONS.MANAGE_MESSAGES
      )
    )
      throw new Error("MISSING PERMISSIONS: MANAGE_MESSAGES");

    const body = {};

    body.messages = messages;

    if (reason) body["X-Audit-Log-Reason"] = reason;

    await this.#_client.request.makeRequest(
      "postBulkDeleteMessages",
      [this.id],
      body
    );
  }

  toString() {
    return `<TextChannel: ${this.id}>`;
  }

  toJSON() {
    return {
      ...super.toJSON(),
    };
  }
}

module.exports = TextChannel;
