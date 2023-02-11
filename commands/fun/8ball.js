const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    command: '8ball',
    description: 'Ask the 8-Ball if you dare!',
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the 8-Ball if you dare!')
        .addStringOption(option =>
            option.setName('question').setDescription('Ask anything!').setRequired(true)
        ),
    run: async (client, interaction) => {
        try {
            const responses = [
                'As I see it, yes',
                'Better not tell you now',
                'Cannot predict now',
                'Don\'t count on it',
                'If you say so',
                'In your dreams',
                'It is certain',
                'Most likely',
                'My CPU is saying no',
                'My CPU is saying yes',
                'Out of psychic coverage range',
                'Signs point to yes',
                'Sure, sure',
                'Very doubtful',
                'When life gives you rice, you make rice',
                'Without a doubt',
                'Wow, Much no, very yes, so maybe',
                'Yes, definitely',
                'Yes, unless you run out of memes',
                'You are doomed',
                'You can\'t handle the truth',
            ]

            const question = interaction.options.getString('question')
            const random = Math.floor(Math.random() * responses.length)

            const Embed = new MessageEmbed()
                .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL({ format: 'png', size: 2048, preferAnimated: true }))
                .addFields(
                    {
                        name: 'Question',
                        value: String(question)
                    },
                    {
                        name: 'Answer',
                        value: `${responses[random]}`
                    }
                )

            interaction.reply({ embeds: [Embed] })
        } catch (err) {
            console.log(err)

            const ErrorEmbed = new MessageEmbed()

            ErrorEmbed.setColor("RED")
            ErrorEmbed.setDescription('Oops. Something went wrong!')

            interaction.reply({ embeds: [ErrorEmbed] })
        }
    }
}