/**
 * Gives a valid Discord emoji structure when given an emoji mention.
 * @param {String} text Emoji mention. e.g. <:bitcoin:844240546246950922>
 * @returns {Object}
 */
declare function resolveEmoji(text: any):
  | {
      name: string;
      id: null;
      animated?: undefined;
    }
  | {
      id: string;
      name: string;
      animated: boolean;
    }
  | null;
export default resolveEmoji;
