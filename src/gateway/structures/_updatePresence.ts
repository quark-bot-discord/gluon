import erlpack from "erlpack";
import { PresenceStatus, PresenceType, UpdatePresence } from "src/gateway.js";

function _updatePresence(
  name: string,
  type: PresenceType = 0,
  status: PresenceStatus = "online",
  afk: boolean = false,
  since: number | null = null,
) {
  const activities = [];

  if (name) {
    activities.push({
      name,
      type,
      state: type === 4 ? name : undefined,
    });
  }

  const payload: UpdatePresence = {
    op: 3,
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
