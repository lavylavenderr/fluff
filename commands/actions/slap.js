const { SlashCommandBuilder } = require('@discordjs/builders')
const actionsModel = require('../../schemas/actions')
const { MessageEmbed } = require('discord.js') 

module.exports = {
    command: 'slap',
    description: 'Smacky Smack',
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Smacky Smack')
        .addUserOption(option =>
            option.setName('user').setDescription('The user you\'d like to slap!')
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

        const slaps = [
            `walks up to <@${User.id}> and gives them a big ol' smack on the face. That's gotta hurt!`,
            `jokingy slaps <@${User.id}> across the face. Maybe you should hit them harder!`,
            `smacks <@${User.id}> hard, ouch!`,
            `slappity slap slap slaps <@${User.id}>`,
            `starts a SLAP FIGHT! <@${User.id}>, get ready to get SLAPPED!`,
            `bitch slaps <@${User.id}>!`,
            `walks up to <@${User.id}> and slaps them in the face`
        ]

        const random = Math.floor(Math.random() * slaps.length)

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
                slap: 1
            })

            NewRecieving.save();
        } else {
            const slapnum = RecievingUser.slap + 1
            await actionsModel.updateOne({ id: User.id }, { nuzzle: slapnum })
        }

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> slaps themself, ouch!`)
        } else {
            interaction.reply(`${interaction.member.user.username} ${slaps[random]}`)
        }
    }
}