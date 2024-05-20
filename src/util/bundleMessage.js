const bundleAttachment = require("./bundleAttachment");
const bundleMember = require("./bundleMember");
const bundleReaction = require("./bundleReaction");
const bundleSticker = require("./bundleSticker");
const bundleUser = require("./bundleUser");

/**
 * Copies all the message data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for a message as the "data" parameter to reconstruct this.
 * @param {Message} message A message to bundle.
 * @returns {Object}
 */
function bundleMessage(message) {
    const data = {};
    data.id = message.id.toString();
    data.author = bundleUser(message.author);
    if (message.member)
        data.member = bundleMember(message.member);
    data.content = message.content;
    data._attributes = message._attributes;
    data.attachments = [];
    for (let i = 0; i < message.attachments.length; i++)
        data.attachments.push(bundleAttachment(message.attachments[i]));
    data.embeds = message.embeds;
    data.poll = message.poll;
    data.pollResponses = {};
    if (message.pollResponses)
        for (const [key, values] of message.pollResponses.cache)
            data.pollResponses[key] = values.map(v => v.toString());
    data.message_snapshots = message.message_snapshots;
    data.type = message.type;
    const referencedMessageId = message.reference?.message_id?.toString();
    if (referencedMessageId) {
        data.referenced_message = {};
        data.referenced_message.id = referencedMessageId;
    }
    data.sticker_items = [];
    for (let i = 0; i < message.sticker_items.length; i++)
        data.sticker_items.push(bundleSticker(message.sticker_items[i]));
    data.messageReactions = {};
    for (const reaction in message.reactions.cache)
        data.messageReactions[reaction] = bundleReaction(message.reactions.cache[reaction]);
    return data;
}

module.exports = bundleMessage;
