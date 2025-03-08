import {
  ActivityType,
  GatewayOpcodes,
  PresenceUpdateStatus,
} from "#typings/discord.js";
import erlpack from "erlpack";
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
export function _updatePresence(
  name,
  type = ActivityType.Playing,
  status = PresenceUpdateStatus.Online,
  afk = false,
  since = null,
) {
  const activities = [];
  if (name) {
    activities.push({
      name,
      type,
      state: type === 4 ? name : undefined,
    });
  }
  const payload = {
    op: GatewayOpcodes.PresenceUpdate,
    d: {
      since,
      activities,
      status,
      afk,
    },
  };
  return erlpack.pack(payload);
}
//# sourceMappingURL=_updatePresence.js.map
