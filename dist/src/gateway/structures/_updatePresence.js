import erlpack from "erlpack";
function _updatePresence(
  name,
  type = 0,
  status = "online",
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
//# sourceMappingURL=_updatePresence.js.map
