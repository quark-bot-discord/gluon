export class GluonRequestError extends Error {
  constructor(code, method, endpoint, requestStack, json) {
    super(`GLUON: Request failed with code ${code} on ${method} ${endpoint}`);
    this.code = code;
    this.method = method;
    this.endpoint = endpoint;
    this.requestStack = requestStack;
    this.json = json;
  }
}
export class GluonRatelimitEncountered extends GluonRequestError {
  constructor(code, method, endpoint, requestStack, retryIn) {
    super(code, method, endpoint, requestStack);
    this.retryIn = retryIn;
  }
}
//# sourceMappingURL=errors.js.map
