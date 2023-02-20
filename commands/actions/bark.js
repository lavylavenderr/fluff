const actionsModel = require("../../schemas/actions");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    command: "bark",
    description: "ARF ARF!",
    data: new SlashCommandBuilder()
        .setName("bark")
        .setDescription("ARF ARF!")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you'd like to bark at!")
        )
        .setDMPermission(false),
    run: async (client, interaction) => {
        let User;
        try {
            User = await interaction.guild.members.fetch(
                interaction.options.getUser("user") || interaction.member.id
            );
        } catch (err) {
            User = interaction.member;
        }

        const arf = [
            `yips at <@${User.id}>`,
            `barks at <@${User.id}>`,
            `tries to get the attention of <@${User.id}> by barking at them!`,
            `happily barks at <@${User.id}>!`,
            `barks loudly at <@${User.id}>!`,
            `bark bark barks at <@${User.id}>!`,
        ];

        const random = Math.floor(Math.random() * arf.length);

        const GivingUser =
            (await actionsModel.findOne({ id: interaction.member.id })) ||
            false;

        if (!GivingUser) {
            const NewGiver = await actionsModel.create({
                id: interaction.member.id,
                given: 1,
            });

            NewGiver.save();
        } else {
            const givenum = GivingUser.given + 1;
            await actionsModel.updateOne(
                { id: interaction.member.id },
                { given: givenum }
            );
        }

        const RecievingUser =
            (await actionsModel.findOne({ id: User.id })) || false;

        if (!RecievingUser) {
            const NewRecieving = await actionsModel.create({
                id: User.id,
                bark: 1,
            });

            NewRecieving.save();
        } else {
            const barknum = RecievingUser.bark + 1;
            await actionsModel.updateOne({ id: User.id }, { bark: barknum });
        }

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> barks at the wall!`);
        } else {
            interaction.reply(
                `${interaction.member.user.username} ${arf[random]}`
            );
        }
    },
};
