const fs = require('fs')
const { Client } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
        /**
     * @param {Client} client
     */
    execute(interaction, client) {
        if (interaction.isCommand()) {
            fs.readdir(process.cwd() + '/commands', (err, files) => {
                files.forEach(async (file) => {
                    const cmd = require(process.cwd() + "/commands/" + file)
                    if (cmd.command === interaction.commandName) return cmd.run(client, interaction)
                })
            })
        }
    }
}