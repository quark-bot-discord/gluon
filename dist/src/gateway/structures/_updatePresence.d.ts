import { UnixTimestamp } from "#typings/gluon.js";
import { ActivityType, PresenceUpdateStatus } from "#typings/discord.js";
/**
 * Updates the presence of a user with the given parameters.
 *
 * @param name - The name of the activity.
 * @param type - The type of activity. Defaults to `ActivityType.Playing`.
 * @param status - The presence update status. Defaults to `PresenceUpdateStatus.Online`.
 * @param afk - Whether the user is AFK (Away From Keyboard). Defaults to `false`.
 * @param since - The Unix timestamp of when the user went AFK, or `null` if not applicable. Defaults to `null`.
 * @returns The packed payload for the presence update.
 */
export declare function _updatePresence(
  name: string,
  type?: ActivityType,
  status?: PresenceUpdateStatus,
  afk?: boolean,
  since?: UnixTimestamp | null,
): Buffer<ArrayBufferLike>;
