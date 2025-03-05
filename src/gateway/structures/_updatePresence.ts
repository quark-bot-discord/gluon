import { UnixTimestamp } from "#typings/gluon.js";
import {
  ActivityType,
  GatewayOpcodes,
  GatewayUpdatePresence,
  PresenceUpdateStatus,
} from "#typings/discord.js";
import erlpack from "erlpack";

function _updatePresence(
  name: string,
  type: ActivityType = ActivityType.Playing,
  status: PresenceUpdateStatus = PresenceUpdateStatus.Online,
  afk: boolean = false,
  since: UnixTimestamp | null = null,
) {
  const activities = [];

  if (name) {
    activities.push({
      name,
      type,
      state: type === 4 ? name : undefined,
    });
  }

  const payload: GatewayUpdatePresence = {
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
