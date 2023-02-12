const { SlashCommandBuilder } = require('@discordjs/builders')
const actionsModel = require('../../schemas/actions')
const { MessageEmbed } = require('discord.js') 

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
            if (interaction.guild === null) return interaction.reply({ embeds: [new MessageEmbed().setDescription('Please run this command in a server!').setColor("RED")] })

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
                `boops <@${User.id}>!`,
                `deployed their booping device to boop <@${User.id}> multiple times!`,
                `teasingly boops <@${User.id}> on the nose!`,
                `walks up behind <@${User.id}>, taps them on the back and the moment they turn around-- **boop!**`,
                `runs around <@${User.id}> and boops them multiple times! **boop!**`,
                `teasingly boops <@${User.id}> on the nose, **boop!**`
            ]

            const random = Math.floor(Math.random() * boops.length)

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
                boop: 1
            })

            NewRecieving.save();
        } else {
            const boopnum = RecievingUser.boop + 1
            await actionsModel.updateOne({ id: User.id }, { boop: boopnum })
        }

            if (User.id === interaction.member.id) {
                interaction.reply(`<@${User.id}> boops themselves! 'o'`)
            } else {
                interaction.reply(`${interaction.member.user.username} ${boops[random]}`)
            }
        }
}