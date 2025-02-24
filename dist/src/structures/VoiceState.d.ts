import util from "util";
/**
 * Represents a voice state.
 */
declare class VoiceState {
  #private;
  /**
   * Creates the structure for a voice state.
   * @param {Client} client The client instance.
   * @param {Object} data The raw voice state data from Discord.
   * @param {Object} options The additional options for this structure.
   * @param {String} options.guildId The id of the guild that the voice state belongs to.
   * @param {Boolean?} [options.nocache] Whether this voice state should be cached.
   */
  constructor(client: any, data: any, { guildId, nocache }?: any);
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
  get guild(): any;
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
  get channel(): any;
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
  get member(): any;
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
  get joined(): any;
  /**
   * The UNIX timestamp of when the user requested to speak.
   * @type {Number?}
   * @readonly
   * @public
   */
  get requestToSpeakTimestamp(): number | undefined;
  /**
   * Determines whether the voice state should be cached.
   * @param {GluonCacheOptions} gluonCacheOptions The cache options for the client.
   * @param {GuildCacheOptions} guildCacheOptions The cache options for the guild.
   * @returns {Boolean}
   * @public
   * @static
   * @method
   */
  static shouldCache(gluonCacheOptions: any, guildCacheOptions: any): boolean;
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
  toJSON(format: any):
    | {
        guild_id: string;
        channel_id: string;
        _attributes: any;
        member: any;
        user_id: string;
        joined: any;
        request_to_speak_timestamp: number;
        deaf?: undefined;
        mute?: undefined;
        self_deaf?: undefined;
        self_mute?: undefined;
        self_stream?: undefined;
        self_video?: undefined;
        suppress?: undefined;
      }
    | {
        guild_id: string;
        channel_id: string;
        deaf: boolean;
        mute: boolean;
        self_deaf: boolean;
        self_mute: boolean;
        self_stream: boolean;
        self_video: boolean;
        suppress: boolean;
        member: any;
        user_id: string;
        joined: any;
        request_to_speak_timestamp: number;
        _attributes?: undefined;
      };
}
export default VoiceState;
