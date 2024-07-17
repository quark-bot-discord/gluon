const { GLUON_CACHING_OPTIONS } = require("../../constants");

function updatePreferences(client, guild) {
  if (Array.isArray(guild)) {
    // update all
    for (let i = 0; i < guild.length; i++) {
      updateSingleGuildPreferences(client, guild[i]);
    }
  } else if (typeof guild == "object") {
    // update single guild
    updateSingleGuildPreferences(client, guild);
  }
}

function updateSingleGuildPreferences(client, guild) {
  const currentGuild = client.guilds.cache.get(guild.id);
  if (!currentGuild) return;
  currentGuild._cache_options = 0;
  if (guild.options.serverLog == null) {
    if (!guild.options?.additionalServerLogOptions?.textEvents)
      if (guild.options?.additionalServerLogOptions?.fileEvents)
        currentGuild._cache_options |= GLUON_CACHING_OPTIONS.FILES_ONLY;
      else currentGuild._cache_options |= GLUON_CACHING_OPTIONS.NO_MESSAGES;

    if (!guild.options?.additionalServerLogOptions?.voiceEvents)
      currentGuild._cache_options |= GLUON_CACHING_OPTIONS.NO_VOICE_STATE;
  }
  client.guilds.cache.set(guild.id, currentGuild);
  if (guild.options?.additionalServerLogOptions?.ignoreChannels)
    for (
      let j = 0;
      j < guild.options.additionalServerLogOptions.ignoreChannels.length;
      j++
    ) {
      const currentGuildChannel = currentGuild.channels.cache.get(
        guild.options.additionalServerLogOptions.ignoreChannels[j]
      );
      if (!currentGuildChannel) continue;
      currentGuildChannel._cache_options = 0;
      currentGuildChannel._cache_options |= GLUON_CACHING_OPTIONS.NO_MESSAGES;
      currentGuild.channels.cache.set(
        guild.options.additionalServerLogOptions.ignoreChannels[j],
        currentGuildChannel
      );
    }
}

module.exports = updatePreferences;
