declare function _updatePresence(
  name: any,
  type?: number,
  status?: string,
  afk?: boolean,
  since?: null,
): Buffer<ArrayBufferLike>;
export default _updatePresence;
