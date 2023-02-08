const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    command: 'boop',
    description: 'Give a boop to someone special if not you!',
    data: new SlashCommandBuilder()
        .setName('boop')
        .setDescription('Give a boop to someone special if not you!')
        .addUserOption(option => 
                option.setName('user').setDescription('The user you\'d like to boop!')
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

            const boops = [
                `surprises <@${User.id}> with a boop!`,
                `boops <@${User.id}>!`
            ]

            const random = Math.floor(Math.random() * boops.length)

            if (User.id === interaction.member.id) {
                interaction.reply(`<@${User.id}> boops themselves! 'o'`)
            } else {
                interaction.reply(`${interaction.member.user.username} ${boops[random]}`)
            }
        }
}