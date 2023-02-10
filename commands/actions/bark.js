const { SlashCommandBuilder } = require('@discordjs/builders')
const actionsModel = require('../../schemas/actions')

module.exports = {
    command: 'bark',
    description: 'ARF ARF!',
    data: new SlashCommandBuilder()
        .setName('bark')
        .setDescription('ARF ARF!')
        .addUserOption(option =>
            option.setName('user').setDescription('The user you\'d like to bark at!')
        ),
    run: async (client, interaction) => {
        let User;
        try {
            User = await interaction.guild.members.fetch(
                interaction.options.getUser('user') || interaction.member.id
            )
        } catch (err) {
            User = interaction.member;
        }

        const arf = [
            `yips at <@${User.id}>`,
            `barks at <@${User.id}>`
        ]

        const random = Math.floor(Math.random() * arf.length)

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> barks at the wall!`)
        } else {
            interaction.reply(`${interaction.member.user.username} ${arf[random]}`)
        }
    }
}