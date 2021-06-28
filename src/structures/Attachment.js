class Attachment {

    constructor(client, data) {

        this.client = client;

        this.id = BigInt(data.id);

        this.name = data.filename;

        this.size = data.size;

        this.url = data.url;

    }

}

module.exports = Attachment;