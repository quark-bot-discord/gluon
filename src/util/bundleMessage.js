const bundleAttachment = require("./bundleAttachment");
const bundleSticker = require("./bundleSticker");
const bundleUser = require("./bundleUser");

function bundleMessage(message) {
    const data = {};
    data.id = message.id.toString();
    data.author = bundleUser(message.author);
    data.content = message.content;
    data.mention_everyone = message.mention_everyone;
    data.mentions = message.mentions == true ? [1] : [];
    data.mention_roles = message.mention_roles == true ? [1] : [];
    data.attachments = [];
    for (let i = 0; i < message.attachments.length; i++)
        data.attachments.push(bundleAttachment(message.attachments[i]));
    data.embeds = message.embeds;
    data.type = message.type;
    data.referenced_message = {};
    data.referenced_message.id = message.reference?.message_id?.toString() || {};
    data.sticker_items = [];
    for (let i = 0; i < message.sticker_items.length; i++)
        data.sticker_items.push(bundleSticker(message.sticker_items[i]));
    return data;
}

module.exports = bundleMessage;