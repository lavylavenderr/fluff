const { SlashCommandBuilder } = require('@discordjs/builders')
const actionsModel = require('../../schemas/actions')
const { MessageEmbed } = require('discord.js') 

module.exports = {
    command: 'poke',
    description: 'Pokey poke poke',
    data: new SlashCommandBuilder()
        .setName('poke')
        .setDescription('Pokey poke poke')
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

        const poke = [
            `sneaks up behind <@${User.id}> and pokes them!`,
            `pokes <@${User.id}>.. then pokes them again!`,
            `pokepokepokes <@${User.id}>!`,
            `pokes <@${User.id}> with beans.. BEANS!!!`,
            `sticks out their arm and rapidly pokes their target(s): <@${User.id}> !!!`,
            `softly pokes <@${User.id}> in their tum`,
            `pokes <@${User.id}> with a stick.. mm, pointy!`
        ]

        const random = Math.floor(Math.random() * poke.length)

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
                poke: 1
            })

            NewRecieving.save();
        } else {
            const pokenum = RecievingUser.poke + 1
            await actionsModel.updateOne({ id: User.id }, { poke: pokenum })
        }

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> you can\'t poke yourself >:(`)
        } else {
            interaction.reply(`${interaction.member.user.username} ${poke[random]}`)
        }
    }
}