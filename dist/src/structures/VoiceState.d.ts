import Member from "./Member.js";
import util from "util";
import type {
  VoiceStateCacheJSON,
  VoiceStateDiscordJSON,
  VoiceStateStorageJSON,
  VoiceState as VoiceStateType,
  GuildCacheOptions as GuildCacheOptionsType,
  GluonCacheOptions as GluonCacheOptionsType,
  Client as ClientType,
  VoiceChannel as VoiceChannelType,
} from "#typings/index.d.ts";
import { APIVoiceState, Snowflake } from "#typings/discord.js";
import { JsonTypes } from "#typings/enums.js";
/**
 * Represents a voice state.
 */
declare class VoiceState implements VoiceStateType {
  #private;
  /**
   * Creates the structure for a voice state.
   * @param {Client} client The client instance.
   * @param {Object} data The raw voice state data from Discord.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The id of the guild that the voice state belongs to.
   * @param {Boolean?} [options.nocache] Whether this voice state should be cached.
   */
  constructor(
    client: ClientType,
    data:
      | APIVoiceState
      | VoiceStateCacheJSON
      | VoiceStateDiscordJSON
      | VoiceStateStorageJSON,
    {
      guildId,
      nocache,
    }: {
      guildId: Snowflake;
      nocache?: boolean;
    },
  );
  /**
   * Is server deafened?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get deaf(): boolean;
  /**
   * Is server muted?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get mute(): boolean;
  /**
   * Is self defeaned?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfDeaf(): boolean;
  /**
   * Is self muted?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfMute(): boolean;
  /**
   * Is streaming?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfStream(): boolean;
  /**
   * Is sharing video?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get selfVideo(): boolean;
  /**
   * Is suppressed (for stage channels)?
   * @readonly
   * @type {Boolean}
   * @public
   */
  get suppress(): boolean;
  /**
   * The guild that this voice state belongs to.
   * @type {Guild?}
   * @readonly
   * @public
   */
  get guild(): import("#typings/index.d.ts").Guild | null;
  /**
   * The id of the guild that this voice state belongs to.
   * @type {String}
   * @readonly
   * @public
   */
  get guildId(): string;
  /**
   * The channel involved.
   * @type {Channel?}
   * @readonly
   * @public
   */
  get channel(): VoiceChannelType | null;
  /**
   * The id of the channel involved.
   * @type {String}
   * @readonly
   * @public
   */
  get channelId(): string;
  /**
   * The member the voice state is about.
   * @type {Member?}
   * @readonly
   * @public
   */
  get member(): Member | import("#typings/index.d.ts").Member | null;
  /**
   * The id of the user the voice state is about.
   * @type {String}
   * @readonly
   * @public
   */
  get memberId(): string;
  /**
   * The UNIX time the user joined the voice channel.
   * @type {Number}
   * @readonly
   * @public
   */
  get joined(): number;
  /**
   * The UNIX timestamp of when the user requested to speak.
   * @type {Number?}
   * @readonly
   * @public
   */
  get requestToSpeakTimestamp(): number | null;
  /**
   * Determines whether the voice state should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(
    gluonCacheOptions: GluonCacheOptionsType,
    guildCacheOptions: GuildCacheOptionsType,
  ): boolean;
  /**
   * @method
   * @public
   */
  toString(): string;
  /**
   * @method
   * @public
   */
  [util.inspect.custom](): string;
  /**
   * Returns the JSON representation of this structure.
   * @param {Number} [format] The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(
    format: JsonTypes,
  ): VoiceStateCacheJSON | VoiceStateDiscordJSON | VoiceStateStorageJSON;
}
export default VoiceState;
