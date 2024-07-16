const { Client } = require("../index");
const ActionRow = require("../src/util/builder/actionRowBuilder");
const Button = require("../src/util/buttonBuilder");
const Embed = require("../src/util/builder/embedBuilder");
const MessageComponents = require("../src/util/messageComponents");
const client = new Client({ cacheGuilds: true, cacheMessages: true, cacheUsers: true, cacheMembers: true, cacheChannels: true, cacheVoiceStates: true, cacheRoles: true, cacheEmojis: true })

client.on("ready", () => {
    console.log("ready");
    console.log(client.user);
    client.increasedCache.set("721401585300930562", true);
});

client.on("raw", raw => {
    // console.log("raw");
    // console.log(raw);
});

client.on("debug", data => {
    // console.log("debug");
    console.log(data);
});

client.on("messageCreate", message => {
    console.log("messageCreate");
    console.log(message);
    if (message.author.bot == true) return;
    if (message.content == "button") {
        const actionRow = new ActionRow();
        const button = new Button()
            .setLabel("button")
            .setStyle(1)
            .setCustomID(message.guild.id.toString());
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
            .setTitle("hello?")
            .setColor("5865F2")
            .setDescription("hello world!");
        message.channel.send("", {
            embed
        });
    }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    console.log("messageUpdate");
    console.log(oldMessage?.content);
    console.log(newMessage?.content);
});

client.on("messageDelete", message => {
    console.log("messageDelete");
    console.log(message?.content);
});

client.login("ODQ5NzM0MjM0MzM5NjcyMDg0.YLferA.RYFIAP-qz_U-wJB-qXmTD87p5gA");