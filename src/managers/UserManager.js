class UserManager {

    constructor(client) {
        /* i think for most unordered caches, we can simply use an object */
        /* the user id will be the key, and will return a simple user object */
        /* hella fast and simple, just make sure to remove that property when done */
        this.cache = {};

    }

    async fetch() {

    }

}

module.exports = UserManager;