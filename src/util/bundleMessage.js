const bundleAttachment = require("./bundleAttachment");
const bundleSticker = require("./bundleSticker");
const bundleUser = require("./bundleUser");

function bundleMessage(message) {
    const data = {};
    data.id = message.id.toString();
    data.author = bundleUser(message.author);
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
    return data;
}

module.exports = bundleMessage;
