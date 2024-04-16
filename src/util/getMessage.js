const decryptMessage = require("./decryptMessage");
const getTimestamp = require("./getTimestampFromSnowflake");
const hash = require("hash.js");

function getMessage(client, guild_id, channel_id, message_id, destroy = false) {

    return new Promise(async (resolve, reject) => {

        let message = client.guilds.cache.get(guild_id)?.channels.cache.get(channel_id)?.messages.cache.get(message_id) || null;

        const usedHash = hash.sha512().update(`${guild_id}_${channel_id}_${message_id}`).digest("hex");

        if (!message && client.increasedCache.get(guild_id) && (getTimestamp(message_id) + (client.defaultMessageExpiry * client.increaseCacheBy) > ((new Date().getTime() / 1000) | 0)) && ((getTimestamp(message_id) + client.defaultMessageExpiry) < ((new Date().getTime() / 1000) | 0))) {
    
            client.storage.getItem(usedHash)
                .then(async storedMessage => {

                    if (storedMessage) {

                        message = decryptMessage(client, storedMessage, message_id, channel_id, guild_id);

                        if (destroy != false) {
                            await client.storage.removeItem(usedHash).catch(() => null);
                            client.guilds.cache.get(guild_id)?.channels.cache.get(channel_id)?.messages.cache.delete(message_id);
                        }

                        return resolve(message);

                    } else
                        return resolve(null);

                });
        } else {

            if (destroy != false) {
                await client.storage.removeItem(usedHash).catch(() => null);
                client.guilds.cache.get(guild_id)?.channels.cache.get(channel_id)?.messages.cache.delete(message_id);
            }

            return resolve(message);
        }

    });

}

module.exports = getMessage;