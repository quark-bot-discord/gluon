import ClientType from "src/interfaces/Client.js";
import { GLUON_DEBUG_LEVELS } from "../constants.js";
import GuildChannel from "./GuildChannel.js";
import Message from "./Message.js";
import util from "util";
import { Snowflake } from "src/interfaces/gluon.js";
import {
  JsonTypes,
  VoiceChannelCacheJSON,
  VoiceChannelDiscordJSON,
  VoiceChannelStorageJSON,
  VoiceChannel as VoiceChannelType,
} from "../../typings/index.d.js";
import {
  APIGuildStageVoiceChannel,
  APIGuildVoiceChannel,
} from "discord-api-types/v10";

/**
 * Represents a voice channel.
 * @extends {Channel}
 */
class VoiceChannel extends GuildChannel implements VoiceChannelType {
  #_client;
  #bitrate;
  #user_limit;
  #rtc_region;
  /**
   * Creates the structure for a voice channel.
   * @param {Client} client The client instance.
   * @param {Object} data The raw channel data from Discord.
   * @param {Object} options Additional options for this structure.
   * @param {String} options.guildId The id of the guild that the voice channel belongs to.
   * @param {Boolean?} [options.nocache] Whether the voice channel should be cached.
   */
  constructor(
    client: ClientType,
    data:
      | APIGuildVoiceChannel
      | APIGuildStageVoiceChannel
      | VoiceChannelCacheJSON
      | VoiceChannelDiscordJSON
      | VoiceChannelStorageJSON,
    { guildId, nocache = false }: { guildId: Snowflake; nocache?: boolean },
  ) {
    super(client, data, { guildId });

    if (!client)
      throw new TypeError("GLUON: Client must be an instance of Client");
    if (typeof data !== "object")
      throw new TypeError("GLUON: Data must be an object");
    if (typeof guildId !== "string")
      throw new TypeError("GLUON: Guild ID must be a string");
    if (typeof nocache !== "boolean")
      throw new TypeError("GLUON: No cache must be a boolean");

    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    const existing = this.guild?.channels.get(data.id) || null;

    if (typeof data.bitrate == "number")
      /**
       * The bitrate of the channel.
       * @type {Number}
       * @private
       */
      this.#bitrate = data.bitrate;
    else if (existing && typeof existing.bitrate)
      this.#bitrate = existing.bitrate;

    if (typeof data.user_limit == "number")
      /**
       * The user limit of the channel.
       * @type {Number}
       * @private
       */
      this.#user_limit = data.user_limit;
    else if (existing && typeof existing.userLimit == "number")
      this.#user_limit = existing.userLimit;

    if (typeof data.rtc_region == "string")
      /**
       * The region of the voice channel.
       * @type {String}
       * @private
       */
      this.#rtc_region = data.rtc_region;
    else if (existing && typeof existing.rtcRegion == "string")
      this.#rtc_region = existing.rtcRegion;

    const shouldCache = GuildChannel.shouldCache(
      this.#_client._cacheOptions,
      this.guild._cacheOptions,
    );

    if (nocache === false && shouldCache) {
      this.guild.channels.set(data.id, this);
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `CACHE VOICECHANNEL ${guildId} ${data.id}`,
      );
    } else {
      this.#_client._emitDebug(
        GLUON_DEBUG_LEVELS.INFO,
        `NO CACHE VOICECHANNEL ${guildId} ${data.id} (${nocache} ${shouldCache})`,
      );
    }

    if ("messages" in data && data.messages) {
      for (let i = 0; i < data.messages.length; i++) {
        new Message(this.#_client as ClientType, data.messages[i], {
          channelId: this.id,
          guildId,
        });
      }
    }
  }

  /**
   * The bitrate of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get bitrate() {
    return this.#bitrate;
  }

  /**
   * The user limit of the channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get userLimit() {
    return this.#user_limit;
  }

  /**
   * The region of the voice channel.
   * @type {String}
   * @readonly
   * @public
   */
  get rtcRegion() {
    return this.#rtc_region;
  }

  /**
   * @method
   * @public
   */
  toString() {
    return `<VoiceChannel: ${this.id}>`;
  }

  /**
   * @method
   * @public
   */
  [util.inspect.custom]() {
    return this.toString();
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   * @override
   */
  toJSON(format: JsonTypes) {
    switch (format) {
      case JsonTypes.STORAGE_FORMAT:
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          ...super.toJSON(format),
          bitrate: this.bitrate,
          user_limit: this.userLimit,
          rtc_region: this.rtcRegion,
        };
      }
    }
  }
}

export default VoiceChannel;
