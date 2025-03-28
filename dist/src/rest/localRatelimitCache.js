import NodeCache from "node-cache";
export const localRatelimitCache = new NodeCache({
  stdTTL: 60,
  checkperiod: 60,
});
//# sourceMappingURL=localRatelimitCache.js.map
