const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    command: 'kiss',
    description: 'Want to kiss someone or yourself? This is the command to do so!',
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Want to kiss someone or yourself? This is the command to do so!')
        .addUserOption(option =>
            option.setName('user').setDescription('The user you\'d like to kiss!')
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

        const smooch = [
            `jumps on <@${User.id}> and kisses them!`,
            `walks up to <@${User.id}> and gives them a smooch :3`
        ]

        const random = Math.floor(Math.random() * smooch.length)

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> kisses the floor...a bit awkward don't ya think?`)
        } else {
            interaction.reply(`${interaction.member.user.username} ${smooch[random]}`)
        }
    }
}