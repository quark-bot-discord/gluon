const Client = require("../src/index");
const ActionRow = require("../src/util/actionRowBuilder");
const Component = require("../src/util/componentBuilder");
const Embed = require("../src/util/embedBuilder");
const MessageComponents = require("../src/util/messageComponents");
const client = new Client();

client.on("ready", () => {
    console.log("ready");
    console.log(client.user);
});

client.on("raw", raw => {
    console.log("raw");
    console.log(raw);
});

client.on("debug", data => {
    console.log("debug");
    console.log(data);
});

client.on("messageCreate", message => {
    console.log("messageCreate");
    console.log(message);
    if (message.author.bot == true) return;
    if (message.content == "button") {
        const actionRow = new ActionRow();
        const button = new Component()
            .setLabel("button")
            .setStyle(1)
            .setCustomID(message.guild.id);
        actionRow.addComponent(button);
        const messageComponents = new MessageComponents()
            .addActionRow(actionRow);
        message.reply("button", {
            components: messageComponents
        })
        .then(m => {
            console.log(m);
        })
        .catch(e => {
            console.log(e.errors);
        });
    }
    if (message.content == "embed") {
        const embed = new Embed()
            .setTitle("pog?")
            .setColor("5865F2")
            .setDescription("pog i guess");
        message.channel.send("", {
            embed
        });
    }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    console.log("messageUpdate");
    console.log(oldMessage);
    console.log(newMessage);
});

client.on("messageDelete", message => {
    console.log("messageDelete");
    console.log(message);
});

client.login("ODQ5NzM0MjM0MzM5NjcyMDg0.YLferA.RYFIAP-qz_U-wJB-qXmTD87p5gA");