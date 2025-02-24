async function _heartbeat(d) {
  const erlpack = await import("erlpack");
  return erlpack.pack({
    op: 1,
    d: d ? d : null,
  });
}

export default _heartbeat;
