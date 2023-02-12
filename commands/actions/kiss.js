const { SlashCommandBuilder } = require('@discordjs/builders')
const actionsModel = require('../../schemas/actions')
const { MessageEmbed } = require('discord.js') 

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
        if (interaction.guild === null) return interaction.reply({ embeds: [new MessageEmbed().setDescription('Please run this command in a server!').setColor("RED")] })

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
            `walks up to <@${User.id}> and gives them a smooch :3`,
            `lovingly smooches <@${User.id}>!`,
            `shouts "Gimme some sugar baby!" and kisses <@${User.id}>`,
            `hangs some mistletoe over the head of <@${User.id}> and smooches them`,
            `happily kisses <@${User.id}>`
        ]

        const random = Math.floor(Math.random() * smooch.length)

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
                kiss: 1
            })

            NewRecieving.save();
        } else {
            const kissnum = RecievingUser.kiss + 1
            await actionsModel.updateOne({ id: User.id }, { kiss: kissnum })
        }

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> kisses the floor.. a bit awkward don't ya think?`)
        } else {
            interaction.reply(`${interaction.member.user.username} ${smooch[random]}`)
        }
    }
}