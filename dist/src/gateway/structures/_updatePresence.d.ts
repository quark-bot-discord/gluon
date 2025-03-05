import { UnixTimestamp } from "#typings/gluon.js";
import { ActivityType, PresenceUpdateStatus } from "#typings/discord.js";
declare function _updatePresence(
  name: string,
  type?: ActivityType,
  status?: PresenceUpdateStatus,
  afk?: boolean,
  since?: UnixTimestamp | null,
): Buffer<ArrayBufferLike>;
export default _updatePresence;
