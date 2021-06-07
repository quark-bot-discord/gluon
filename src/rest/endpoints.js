/* of course, stick to this format of "methodPath1Path2" */
/* the arguments passed to the path() function should simply become the parameters of the request */
/* for example, (guild_id) => { return `/guilds/${guild_id}` } */
/* though in terms of ratelimiting, we may need to figure something out since i think the bucket id can even change depending on what exactly the request is doing? */
/* as in, deleting older messages has a lower ratelimit (and therefore different bucket id) compared with deleting newer messages, or so i have heard */
/* will need to verify and figure something out if this is the case */
/* perhaps could just have some function which takes this into account? /shrug */
module.exports = {
    getGatewayBot: {
        path: () => {
            return "/gateway/bot";
        },
        method: "GET",
        bucket: null
    },
    postCreateMessage: {
        path: (channel_id) => {
            return `/channels/${channel_id}/messages`;
        },
        method: "POST",
        bucket: null
    }
};