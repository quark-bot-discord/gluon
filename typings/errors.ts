import { HttpMethods } from "msw";
import { PermissionFlagsBits } from "./discord.js";

export class GluonRequestError extends Error {
  public code: number;
  public method: HttpMethods;
  public endpoint: string;
  public requestStack: string;
  public json?: string;
  constructor(
    code: number,
    method: HttpMethods,
    endpoint: string,
    requestStack: string,
    json?: string,
  ) {
    super(`GLUON: Request failed with code ${code} on ${method} ${endpoint}`);
    this.code = code;
    this.method = method;
    this.endpoint = endpoint;
    this.requestStack = requestStack;
    this.json = json;
  }
}

export class GluonRatelimitEncountered extends GluonRequestError {
  public retryIn: number;
  constructor(
    code: number,
    method: HttpMethods,
    endpoint: string,
    requestStack: string,
    retryIn: number,
  ) {
    super(code, method, endpoint, requestStack);
    this.retryIn = retryIn;
  }
}

export class GluonPermissionsError extends Error {
  public permission: keyof typeof PermissionFlagsBits;
  public permissionBit: bigint;
  constructor(permission: keyof typeof PermissionFlagsBits) {
    super(`GLUON: Missing permission ${permission}`);
    this.permission = permission;
    this.permissionBit = PermissionFlagsBits[permission];
  }
}
