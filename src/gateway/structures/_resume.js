async function _resume(token, session_id, seq) {
  const erlpack = await import("erlpack");
  return erlpack.pack({
    op: 6,
    d: {
      token,
      session_id,
      seq,
    },
  });
}

export default _resume;
