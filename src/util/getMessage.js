const decryptMessage = require("./decryptMessage");
const getTimestamp = require("./getTimestampFromSnowflake");
const hash = require("hash.js");

/**
 * Fetches a message from cache, or checks the encrypted messages and returns the correct message, if it can be found.
 * @param {Client} client The client instance.
 * @param {String} guild_id The id of the guild the message belongs to.
 * @param {String} channel_id The id of the channel the message belongs to.
 * @param {String} message_id The id of the message to get.
 * @param {Boolean?} destroy Whether the message should be removed from the cache once it has been fetched.
 * @returns {Message?}
 */
function getMessage(client, guild_id, channel_id, message_id, destroy = false) {

    return new Promise(async (resolve, reject) => {

        let message = client.guilds.cache.get(guild_id)?.channels.cache.get(channel_id)?.messages.cache.get(message_id) || null;

        const usedHash = hash.sha512().update(`${guild_id}_${channel_id}_${message_id}`).digest("hex");

        const guildCacheMultiplier = client.increasedCacheMultipliers.get(guild_id.toString()) || 1;

        if (!message && client.increasedCache.get(guild_id) && (getTimestamp(message_id) + (client.defaultMessageExpiry * client.increaseCacheBy * guildCacheMultiplier) > ((new Date().getTime() / 1000) | 0)) && ((getTimestamp(message_id) + client.defaultMessageExpiry) < ((new Date().getTime() / 1000) | 0))) {
    
            client.storage.getItem(usedHash)
                .then(async storedMessage => {

                    if (storedMessage) {

                        message = decryptMessage(client, storedMessage, message_id, channel_id, guild_id);

                        await client.storage.removeItem(usedHash).catch(() => null);

                        if (destroy != false)
                            client.guilds.cache.get(guild_id)?.channels.cache.get(channel_id)?.messages.cache.delete(message_id);

                        return resolve(message);

                    } else
                        return resolve(null);

                });
        } else {

            await client.storage.removeItem(usedHash).catch(() => null);

            if (destroy != false)
                client.guilds.cache.get(guild_id)?.channels.cache.get(channel_id)?.messages.cache.delete(message_id);

            return resolve(message);
        }

    });

}

module.exports = getMessage;