const actionsModel = require("../../schemas/actions");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    command: "nuzzle",
    description: "nyuzzwes yu~",
    data: new SlashCommandBuilder()
        .setName("nuzzle")
        .setDescription("nyuzzwes yu~")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you'd like to nuzzle!")
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

        const nuzzle = [
            `softly nuzzles <@${User.id}> :3`,
            `slowly nuzzles <@${User.id}> :3`,
            `applies soft little nuzzles to <@${User.id}>`,
            `gets their nose up close to <@${User.id}> and nuzzles them!`,
            `gets nice and close to <@${User.id}> for a soft nuzzle`,
            `sneakily nuzzles <@${User.id}>!`,
            `gets up close to <@${User.id}> and nuzzles them!`,
        ];

        const random = Math.floor(Math.random() * nuzzle.length);

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
                nuzzle: 1,
            });

            NewRecieving.save();
        } else {
            const nuzzlenum = RecievingUser.nuzzle + 1;
            await actionsModel.updateOne(
                { id: User.id },
                { nuzzle: nuzzlenum }
            );
        }

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> you can't nuzzle yourself  >:(`);
        } else {
            interaction.reply(
                `${interaction.member.user.username} ${nuzzle[random]}`
            );
        }
    },
};
