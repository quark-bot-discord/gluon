import decryptMessage from "../gluon/decryptMessage.js";
import getTimestamp from "../discord/getTimestampFromSnowflake.js";
import hash from "hash.js";

/**
 * Fetches a message from cache, or checks the encrypted messages and returns the correct message, if it can be found.
 * @param {Client} client The client instance.
 * @param {String} guild_id The id of the guild the message belongs to.
 * @param {String} channel_id The id of the channel the message belongs to.
 * @param {String} message_id The id of the message to get.
 * @param {Boolean?} destroy Whether the message should be removed from the cache once it has been fetched.
 * @returns {Promise<Message?>} The message, if it can be found.
 */
async function getMessage(
  client,
  guild_id,
  channel_id,
  message_id,
  destroy = false,
) {
  if (!client) throw new TypeError("GLUON: Client must be provided.");

  if (typeof guild_id != "string")
    throw new TypeError("GLUON: Guild id must be a string.");

  if (typeof channel_id != "string")
    throw new TypeError("GLUON: Channel id must be a string.");

  if (typeof message_id != "string")
    throw new TypeError("GLUON: Message id must be a string.");

  if (typeof destroy != "boolean")
    throw new TypeError("GLUON: Destroy must be a boolean.");

  let message =
    client.guilds
      .get(guild_id)
      ?.channels.get(channel_id)
      ?.messages.get(message_id) || null;

  const usedHash = hash
    .sha512()
    .update(`${guild_id}_${channel_id}_${message_id}`)
    .digest("hex");

  const guildCacheMultiplier =
    client.increasedCacheMultipliers.get(guild_id.toString()) || 1;

  if (
    !message &&
    client.increasedCache.get(guild_id) &&
    getTimestamp(message_id) +
      client.defaultMessageExpiry *
        client.increaseCacheBy *
        guildCacheMultiplier >
      ((new Date().getTime() / 1000) |
        0) /* && ((getTimestamp(message_id) + client.defaultMessageExpiry) < ((new Date().getTime() / 1000) | 0))*/
  ) {
    const rawMessage = await client.s3Messages
      .getObject({ Bucket: client.s3MessageBucket, Key: usedHash })
      .promise()
      .catch(() => null);
    if (!rawMessage || !rawMessage.Body) return null;

    const storedMessage = rawMessage.Body.toString();
    if (storedMessage) {
      message = decryptMessage(
        client,
        storedMessage,
        message_id,
        channel_id,
        guild_id,
      );

      client.s3Messages
        .deleteObject({ Bucket: client.s3MessageBucket, Key: usedHash })
        .promise()
        .catch(() => null);

      if (destroy != false)
        client.guilds
          .get(guild_id)
          ?.channels.get(channel_id)
          ?.messages.delete(message_id);

      return message;
    } else return null;
  } else {
    if (destroy != false)
      client.guilds
        .get(guild_id)
        ?.channels.get(channel_id)
        ?.messages.delete(message_id);

    return message;
  }
}

export default getMessage;
