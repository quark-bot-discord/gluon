import { PermissionFlagsBits } from "./discord.js";
export class GluonRequestError extends Error {
  constructor(code, method, endpoint, requestStack, json) {
    super(`GLUON: Request failed with code ${code} on ${method} ${endpoint}`);
    this.code = code;
    this.method = method;
    this.endpoint = endpoint;
    this.requestStack = requestStack;
    this.json = json;
    this.stack = this.stack + "\n" + requestStack;
  }
}
export class GluonRatelimitEncountered extends GluonRequestError {
  constructor(code, method, endpoint, requestStack, retryIn) {
    super(code, method, endpoint, requestStack);
    this.retryIn = retryIn;
    this.stack = this.stack + "\n" + requestStack;
  }
}
export class GluonPermissionsError extends Error {
  constructor(permission) {
    super(`GLUON: Missing permission ${permission}`);
    this.permission = permission;
    this.permissionBit = PermissionFlagsBits[permission];
  }
}
//# sourceMappingURL=errors.js.map
