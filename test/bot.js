const Client = require("../src/index");
const client = new Client();

client.on("ready", () => {
    console.log("ready");
    // console.log(client.user);
});

client.on("messageCreate", message => {
    console.log(message);

    console.log(client.guilds.cache["721401585300930562"]);
});

client.login("ODQ5NzM0MjM0MzM5NjcyMDg0.YLferA.RYFIAP-qz_U-wJB-qXmTD87p5gA");