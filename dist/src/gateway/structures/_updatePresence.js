import {
  ActivityType,
  GatewayOpcodes,
  PresenceUpdateStatus,
} from "#typings/discord.js";
import erlpack from "erlpack";
function _updatePresence(
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
export default _updatePresence;
//# sourceMappingURL=_updatePresence.js.map
