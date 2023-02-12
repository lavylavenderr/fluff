const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    command: 'status',
    description: 'Returns a embed with the status of the bot and database.',
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Returns a embed with the status of the bot and database.'),
    run: async (client, interaction) => {
        const member = interaction.member;

        const Embed = new MessageEmbed()
            .setAuthor({
                name: `${member.user.tag}`,
                iconURL: `${member.displayAvatarURL({
                    dynamic: true,
                    size: 512,
                })}`,
            })
            .setDescription(
                `**Client**: \`🟢 ONLINE\``
              )
            .setTimestamp();

        interaction.reply({ embeds: [Embed] })
    }
}