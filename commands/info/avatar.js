const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
require('dotenv').config()

module.exports = {
    command: 'avatar',
    description: 'Fetch the avatar of a specified user, if not yourself.',
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Fetch the avatar of a specified user, if not yourself.')
        .addUserOption((option) =>
            option.setName('user').setDescription('The user whos avatar you\'d like to fetch.')
        ),
    run: async (client, interaction) => {
        try {
            let User;
            try {
                User = await interaction.guild.members.fetch(
                    interaction.options.getUser("user") || interaction.member.id
                )
            } catch (err) {
                User = interaction.member;
            }

            const Embed = new MessageEmbed()
            .setAuthor(User.user.username + '\'s Avatar')
            .setImage(User.displayAvatarURL({ format: 'png', size: 2048, preferAnimated: true }))

            if (User.id === process.env.BOTID) {
                Embed.setDescription('Fluff\'s profile picture was designed by #artist!')
            }

            interaction.reply({ embeds: [Embed] })
        } catch (error) {
            interaction.reply({ embeds: [new MessageEmbed().setDescription('Oops, we ran into a error trying to process this command.').setColor('RED')] })
        }
    }
}