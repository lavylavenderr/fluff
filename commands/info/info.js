const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const prettyMilliseconds = require("pretty-ms");
const packagaefile = require('../../package.json')

module.exports = {
    command: 'info',
    description: 'All about Fluff!',
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('All about Fluff!'),
    run: async (client, interaction) => {
        function convertBytes(bytes) {
            const MB = Math.floor((bytes / 1024 / 1024) % 1000);
            const GB = Math.floor(bytes / 1024 / 1024 / 1024);
            if (MB >= 1000) return `${GB.toFixed(1)} GB`;
            else return `${Math.round(MB)} MB`;
        }

        const Embed = new MessageEmbed()
            .setColor("#FFB6C1")
            .setAuthor(`Fluff Info`, 'https://i.imgur.com/hWPDJuv.png')
            .setDescription('Hey there! These are my stats, to see all available commands use /help!')
            .addFields(
                {
                    name: 'Owner:',
                    value: 'Lavender#6999',
                    inline: true
                },
                {
                    name: 'Version:',
                    value: packagaefile.version,
                    inline: true
                },
                {
                    name: 'Memory Used:',
                    value: convertBytes(process.memoryUsage().heapUsed),
                    inline: true
                },
                {
                    name: 'Guilds:',
                    value: String(client.guilds.cache.size),
                    inline: true
                },
                {
                    name: 'Users:',
                    value: String(client.users.cache.size),
                    inline: true
                },
                {
                    name: 'Bot Uptime:',
                    value: `${prettyMilliseconds(client.uptime)}`,
                    inline: true
                }
            )


        interaction.reply({ embeds: [Embed] })
    }
}