/**
 * Copies all the attachment data into a plain JavaScript object without any BigInts. Safe to be JSON.stringify'd. May be passed directly into the constructor for an attachment as the "data" parameter to reconstruct this.
 * @param {Attachment} attachment An attachment to bundle.
 * @returns {Object}
 */
function bundleAttachment(attachment) {
    const data = {};
    data.id = attachment.id.toString();
    data.filename = attachment.name;
    data.size = attachment.size;
    data.url = attachment.url;
    return data;
}

module.exports = bundleAttachment;