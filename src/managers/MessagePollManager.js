class MessagePollManager {

    constructor(existingResponses = {}) {

        this.cache = new Map();

        for (const answer_id in existingResponses)
            this.cache.set(answer_id, existingResponses[answer_id].map(v => BigInt(v)));

    }

    addVote(user_id, answer_id) {

        const currentUserList = this.cache.get(answer_id);

        if (currentUserList)
            this.cache.set(answer_id, [...currentUserList, BigInt(user_id)]);
        else
            this.cache.set(answer_id, [BigInt(user_id)]);

    }

    removeVote(user_id, answer_id) {

        const currentUserList = this.cache.get(answer_id);

        if (currentUserList)
            this.cache.set(answer_id, currentUserList.filter(x => x != BigInt(user_id)));

    }

}

module.exports = MessagePollManager;