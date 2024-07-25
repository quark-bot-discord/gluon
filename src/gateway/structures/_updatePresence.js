import erlpack from "erlpack";

function _updatePresence(
  name,
  type = 0,
  status = "online",
  afk = false,
  since = null,
) {
  const activities = [];

  if (name)
    activities.push({
      name,
      type,
    });

  return erlpack.pack({
    op: 3,
    d: {
      since,
      activities,
      status,
      afk,
    },
  });
}

export default _updatePresence;
