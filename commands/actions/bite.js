const { SlashCommandBuilder } = require('@discordjs/builders')
const actionsModel = require('../../schemas/actions')
const { MessageEmbed } = require('discord.js') 

module.exports = {
    command: 'bite',
    description: 'Stay back, I\'ll bite you!',
    data: new SlashCommandBuilder()
        .setName('bite')
        .setDescription('Stay back, I\'ll bite you!')
        .addUserOption(option =>
            option.setName('user').setDescription('The user you\'d like to bite!')
        ),
    run: async (client, interaction) => {
        if (interaction.guild === null) return interaction.reply({ embeds: [new MessageEmbed().setDescription('Please run this command in a server!').setColor("RED")] })

        let User;
        try {
            User = await interaction.guild.members.fetch(
                interaction.options.getUser('user') || interaction.member.id
            )
        } catch (err) {
            User = interaction.member;
        }

        const bite = [
            `munches and crunches on <@${User.id}> (this isn't vore, I swear!)`,
            `nibbles on <@${User.id}>'s ear`,
            `surprises <@${User.id}> with some surprise nibbles!`,
            `gives <@${User.id}> a couple of soft bites`,
            `opens wide and chomps <@${User.id}>.. chomp chomp..`,
            `can't resist to bite <@${User.id}>!`
        ]

        const random = Math.floor(Math.random() * bite.length)

        const GivingUser = await actionsModel.findOne({ id: interaction.member.id }) || false;

        if (!GivingUser) {
            const NewGiver = await actionsModel.create({
                id: interaction.member.id,
                given: 1
            })

            NewGiver.save();
        } else {
            const givenum = GivingUser.given + 1
            await actionsModel.updateOne({ id: interaction.member.id }, { given: givenum })
        }

        const RecievingUser = await actionsModel.findOne({ id: User.id }) || false;

        if (!RecievingUser) {
            const NewRecieving = await actionsModel.create({
                id: User.id,
                bite: 1
            })

            NewRecieving.save();
        } else {
            const bitenum = RecievingUser.bite + 1
            await actionsModel.updateOne({ id: User.id }, { bite: bitenum })
        }

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> you can't bite yourself  >:(`)
        } else {
            interaction.reply(`${interaction.member.user.username} ${bite[random]}`)
        }
    }
}