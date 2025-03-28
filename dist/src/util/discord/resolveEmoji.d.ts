import type { ResolvedEmoji } from "typings/index.d.ts";
/**
 * Resolves a string containing a Discord emoji into an object with its details.
 *
 * @param text - The string containing the emoji to resolve.
 * @returns An object containing the emoji's name, id, and whether it is animated, or null if no valid emoji is found.
 *
 * @example
 * ```typescript
 * const emoji = resolveEmoji("<:smile:1234567890>");
 * // emoji = { id: "1234567890", name: "smile", animated: false }
 * ```
 */
declare function resolveEmoji(text: string): ResolvedEmoji | null;
export default resolveEmoji;
