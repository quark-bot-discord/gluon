const bundleEmoji = require("./bundleEmoji");

/**
 * Copies all the reaction data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for a reaction as the "data" parameter to reconstruct this.
 * @param {Reaction} reaction A reaction to bundle.
 * @returns {Object}
 */
function bundleReaction(reaction) {
    const data = {};
    data.emoji = bundleEmoji(reaction.emoji);
    data._reacted = reaction._reacted.map(r => r.toString());
    data.initial_reactor = reaction.initial_reactor?.toString();
    return data;
}

module.exports = bundleReaction;