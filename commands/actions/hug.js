const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    command: 'hug',
    description: 'Want to hug someone or yourself? This is the command to do so!',
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Want to hug someone or yourself? This is the command to do so!')
        .addUserOption(option =>
            option.setName('user').setDescription('The user you\'d like to hug!')
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

        const hugs = [
            `braces <@${User.id}> in a warm embrace :3`,
            `hugs <@${User.id}> tightly OwO`
        ]

        const random = Math.floor(Math.random() * hugs.length)

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> hugs themselves!`)
        } else {
            interaction.reply(`${interaction.member.user.username} ${hugs[random]}`)
        }
    }
}