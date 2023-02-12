const fs = require('fs')
const { Client } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
        if (interaction.isCommand()) {
            fs.readdirSync(process.cwd() + '/commands').forEach((dir) => {
                const commands = fs.readdirSync(process.cwd() + `/commands/${dir}/`).filter(file => file.endsWith('.js'))
                for (const file of commands) {
                    const cmd = require(process.cwd() + `/commands/${dir}/${file}`)
                    if (cmd.command === interaction.commandName) return cmd.run(client, interaction)
                }
            })
        }

    }
}