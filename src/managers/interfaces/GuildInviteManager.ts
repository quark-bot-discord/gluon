import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import {
  BaseCacheManagerType,
  StructureIdentifiers,
} from "./BaseCacheManager.js";
import {
  InviteCacheJSON,
  InviteDiscordJSON,
  InviteStorageJSON,
  InviteType,
} from "src/structures/interfaces/Invite.js";

export interface GuildInviteManagerType extends BaseCacheManagerType {
  get(key: string): InviteType | null;
  fetchFromRules(key: string): Promise<InviteType | null>;
  fetchWithRules(key: string): Promise<InviteType | null>;
  set(key: string, value: InviteType, expiry: number): void;
  delete(key: string): boolean;
  clear(): void;
  _intervalCallback(): { i: StructureIdentifiers };
  size: number;
  forEach(
    callbackfn: (
      value: InviteType,
      key: string,
      map: Map<string, InviteType>,
    ) => void,
  ): void;
  has(key: string): boolean;
  fetch(key: string): Promise<InviteType | null>;
  toJSON(
    format?: TO_JSON_TYPES_ENUM,
  ): InviteCacheJSON[] | InviteStorageJSON[] | InviteDiscordJSON[];
}
