const Discord = require("discord.js");
const { Intents } = require('discord.js')
const fs = require("fs");
require("dotenv").config();
const path = require("path");
const Statcord = require("statcord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS],
});

// Command and Event Files are loaded through index.js

const eventPath = path.join(__dirname, "/events");
const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

// Binding Stuff

client.commandDir = "./commands/";

// Loading Events and Slash Commands/Registering Commands

const commands = {};
fs.readdirSync(client.commandDir).forEach((dirs) => {
    commands[dirs] = fs.readdirSync(`${client.commandDir}${dirs}`)
        .filter((file) => file.endsWith(".js"))
        .map((file) => require(`${client.commandDir}${dirs}/${file}`));
});

client.commands = commands;

// Back to loading crap

for (file of eventFiles) {
    const filePath = path.join(eventPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
(async () => {
    try {
        console.log("Trying to refresh slash commands.");

        await rest.put(Routes.applicationCommands(process.env.BOTID), {
            body: Object.values(commands)
                .flat()
                .map((command) => command.data.toJSON()),
        });

        console.log("Successfully refreshed slash commands!");
    } catch (err) {
        console.log(err);
    }
})();

client.login(process.env.TOKEN);
