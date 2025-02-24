import erlpack from "erlpack";
function _heartbeat(d) {
  const payload = {
    op: 1,
    d: d ? d : null,
  };
  return erlpack.pack(payload);
}
export default _heartbeat;
//# sourceMappingURL=_heartbeat.js.map
