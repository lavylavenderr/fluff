const { SlashCommandBuilder } = require('@discordjs/builders')
const actionsModel = require('../../schemas/actions')

module.exports = {
    command: 'pet',
    description: 'Awh! You\'re sooo softt~',
    data: new SlashCommandBuilder()
        .setName('pet')
        .setDescription('Awh! You\'re sooo softt~')
        .addUserOption(option =>
            option.setName('user').setDescription('The user you\'d like to pet!')
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
            `inches closer to <@${User.id}> and pets them!`,
            `gently applies some pets to <@${User.id}>'s heads, soft!`,
            `gently pets <@${User.id}>~`,
            `rolls over to <@${User.id}> and gives them some pets and attention`,
            `gives a couple of quick pets to <@${User.id}>!`,
            `walks up to <@${User.id}> and pets them!`
        ]

        const random = Math.floor(Math.random() * hugs.length)

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
                hug: 1
            })

            NewRecieving.save();
        } else {
            const hugnum = GivingUser.hug + 1
            await actionsModel.updateOne({ id: User.id }, { nuzzle: hugnum })
        }

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> hugs themself, gotta show that self love!`)
        } else {
            interaction.reply(`${interaction.member.user.username} ${hugs[random]}`)
        }
    }
}