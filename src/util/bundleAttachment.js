function bundleAttachment(attachment) {
    const data = {};
    data.id = attachment.id.toString();
    data.filename = attachment.name;
    data.size = attachment.size;
    data.url = attachment.url;
    return data;
}

module.exports = bundleAttachment;