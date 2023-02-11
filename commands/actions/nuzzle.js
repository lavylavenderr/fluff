const { SlashCommandBuilder } = require('@discordjs/builders')
const actionsModel = require('../../schemas/actions')

module.exports = {
    command: 'nuzzle',
    description: 'nyuzzwes yu~',
    data: new SlashCommandBuilder()
        .setName('nuzzle')
        .setDescription('nyuzzwes yu~')
        .addUserOption(option =>
            option.setName('user').setDescription('The user you\'d like to nuzzle!')
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

        const nuzzle = [
            `softly nuzzles <@${User.id}> :3`,
            `slowly nuzzles <@${User.id}> :3`
        ]

        const random = Math.floor(Math.random() * nuzzle.length)

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
                nuzzle: 1
            })

            NewRecieving.save();
        } else {
            const nuzzlenum = RecievingUser.nuzzle + 1
            await actionsModel.updateOne({ id: User.id }, { nuzzle: nuzzlenum })
        }

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> you can't nuzzle yourself  >:(`)
        } else {
            interaction.reply(`${interaction.member.user.username} ${nuzzle[random]}`)
        }
    }
}