import erlpack from "erlpack";
function _resume(token, session_id, seq) {
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
//# sourceMappingURL=_resume.js.map
