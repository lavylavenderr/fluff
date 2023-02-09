const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
module.exports = {
    command: 'serverinfo',
    description: 'Fetches information about the current server.',
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Fetches information about the current server.'),
    run: async (client, interaction) => {
        if (interaction.guild === null) return interaction.reply({ embeds: [new MessageEmbed().setDescription('Please run this command in a server!').setColor("RED")] })

        const Embed = new MessageEmbed()
            .setAuthor('Server Info', 'https://i.imgur.com/hWPDJuv.png')
            .addFields(
                {
                    name: 'Name',
                    value: String(interaction.guild.name),
                    inline: true
                },
                {
                    name: 'ID:',
                    value: String(interaction.guild.id),
                    inline: true
                },
                {
                    name: 'Owner:',
                    value: `<@${interaction.guild.ownerId}>`,
                    inline: true
                },
                {
                    name: 'Channels:',
                    value: String(interaction.guild.channels.cache.size),
                    inline: true
                },
                {
                    name: 'Members:',
                    value: String(interaction.guild.members.cache.size),
                    inline: true
                }

            )
            .setThumbnail(interaction.guild.iconURL)
            .setTimestamp(interaction.guild.createdAt.toDateString())
            .setFooter('Server Created')

        interaction.reply({ embeds: [Embed] })
    }
}