const { SlashCommandBuilder } = require('@discordjs/builders')
const actionsModel = require('../../schemas/actions')
const { MessageEmbed } = require('discord.js')

module.exports = {
    command: 'stats',
    description: 'See how many times you\'ve been interacted with!',
    data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('See how many times you\'ve been interacted with!')
    .addUserOption(option =>
        option.setName('user').setDescription('The user you would like to fetch stats for.')
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

        const UserStats = await actionsModel.findOne({ id: User.id})

        const ErrorEmbed = new MessageEmbed()

            ErrorEmbed.setColor("RED")
            ErrorEmbed.setDescription('Oops. That user is not in the database!')


        if (!UserStats) return interaction.reply({ embeds: [ErrorEmbed] })

        const StatsEmbed = new MessageEmbed()
            .setAuthor(`${interaction.member.user.username}#${interaction.member.user.discriminator}'s Action Stats`)
            .setColor("#FFB6C1")
            .addFields(
                {
                    name: 'Barked At:',
                    value: String(UserStats.bark),
                    inline: true
                },
                {
                    name: 'Bit:',
                    value: String(UserStats.bite),
                    inline: true
                },
                {
                    name: 'Booped:',
                    value: String(UserStats.boop),
                    inline: true
                },
                {
                    name: 'Hugged:',
                    value: String(UserStats.hug),
                    inline: true
                },
                {
                    name: 'Kissed:',
                    value: String(UserStats.kiss),
                    inline: true
                },
                {
                    name: 'Pet:',
                    value: String(UserStats.pet),
                    inline: true
                },
                {
                    name: 'Poked:',
                    value: String(UserStats.poke),
                    inline: true
                },
                {
                    name: 'Slapped:',
                    value: String(UserStats.slap),
                    inline: true
                },
                {
                    name: 'Spanked:',
                    value: String(UserStats.spank),
                    inline: true
                }
            )

        interaction.reply({ embeds: [StatsEmbed] })
    }
}