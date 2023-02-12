const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    command: 'ping',
    description: 'Replies with the ping of the bot!',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with the ping of the bot!'),
    run: async (client, interaction) => {
        interaction.reply(`🏓 Pong! The API Latency is ${client.ws.ping} ms.`)
    }
    
}