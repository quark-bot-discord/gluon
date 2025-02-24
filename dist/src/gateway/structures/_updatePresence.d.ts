import { PresenceStatus, PresenceType } from "src/gateway.js";
declare function _updatePresence(
  name: string,
  type?: PresenceType,
  status?: PresenceStatus,
  afk?: boolean,
  since?: number | null,
): Buffer<ArrayBufferLike>;
export default _updatePresence;
