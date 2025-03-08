/**
 * Verifies if the given text contains a valid Discord message link.
 *
 * @param text - The text to be verified.
 * @returns The matched Discord message link if found, otherwise `null`.
 * @throws RangeError - If the text length exceeds the maximum allowed limit.
 */
export declare function verifyMessageLink(text: string): string | null;
