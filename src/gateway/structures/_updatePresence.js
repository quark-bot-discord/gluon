async function _updatePresence(
  name,
  type = 0,
  status = "online",
  afk = false,
  since = null,
) {
  const erlpack = await import("erlpack");

  const activities = [];

  if (name)
    activities.push({
      name,
      type,
      state: type === 4 ? name : undefined,
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
