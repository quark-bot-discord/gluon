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
function resolveEmoji(text: string): ResolvedEmoji | null {
  const emojis = text.match(/<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>/g);

  if (!emojis || emojis.length == 0) {
    if (/\p{Extended_Pictographic}/u.test(text))
      return { name: text, id: null };
    return null;
  }

  const splitEmoji = emojis[0].replace(/<|>/g, "").split(":");

  return {
    id: splitEmoji[2],
    name: splitEmoji[1],
    animated: splitEmoji[0] == "a" ? true : false,
  };
}

export default resolveEmoji;
