const Client = require("../src/index");
const client = new Client();

client.on("ready", () => {
    console.log("ready");
    console.log(client.user);
});

client.login("ODQ5NzM0MjM0MzM5NjcyMDg0.YLferA.RYFIAP-qz_U-wJB-qXmTD87p5gA");