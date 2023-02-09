const Discord = require('discord.js')
const fs = require('fs')
require('dotenv').config()
const path = require('path')
const Statcord = require('statcord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const client = new Discord.Client({
    intents: 32767
})


// Command and Event Files are loaded through index.js

const eventPath = path.join(__dirname, '/events');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

// Loading Events and Slash Commands/Registering Commands

let commandarray = []

fs.readdirSync('./commands').forEach((dirs) => {
    const commands = fs.readdirSync(`./commands/${dirs}/`).filter(file => file.endsWith('.js'))
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`)
        commandarray.push(command.data.toJSON())
    }
})

for (file of eventFiles) {
    const filePath = path.join(eventPath, file)
    const event = require(filePath)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
    }
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
(async () => {
    try {
        console.log('Trying to refresh slash commands.')

        await rest.put(
            Routes.applicationCommands(process.env.BOTID),
            { body: commandarray }
        )

        console.log('Successfully refreshed slash commands!')
    } catch (err) {
        console.log(err)
    }
})();

client.login(process.env.TOKEN)