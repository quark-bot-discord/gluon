import { TO_JSON_TYPES_ENUM } from "../../constants.js";

export interface BaseCacheManagerType {
  get(key: string): unknown;
  fetchFromRules(key: string): Promise<unknown>;
  fetchWithRules(key: string): Promise<unknown>;
  set(key: string, value: unknown, expiry: number): void;
  delete(key: string): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: unknown,
      key: string,
      map: Map<string, unknown>,
    ) => void,
  ): void;
  has(key: string): boolean;
  toJSON(format?: TO_JSON_TYPES_ENUM): unknown;
}

export type StructureIdentifiers =
  | "messages"
  | "channels"
  | "emojis"
  | "invites"
  | "guilds"
  | "members"
  | "roles"
  | "events"
  | "voicestates"
  | "users";

export interface StaticManagerType {
  identifier: StructureIdentifiers;
}
