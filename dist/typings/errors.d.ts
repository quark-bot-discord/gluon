import { HttpMethods } from "msw";
export declare class GluonRequestError extends Error {
  code: number;
  method: HttpMethods;
  endpoint: string;
  requestStack: string;
  json?: string;
  constructor(
    code: number,
    method: HttpMethods,
    endpoint: string,
    requestStack: string,
    json?: string,
  );
}
export declare class GluonRatelimitEncountered extends GluonRequestError {
  retryIn: number;
  constructor(
    code: number,
    method: HttpMethods,
    endpoint: string,
    requestStack: string,
    retryIn: number,
  );
}
