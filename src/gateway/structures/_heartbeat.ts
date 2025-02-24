import erlpack from "erlpack";

function _heartbeat(d) {
  return erlpack.pack({
    op: 1,
    d: d ? d : null,
  });
}

export default _heartbeat;
