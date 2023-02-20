const actionsModel = require("../../schemas/actions");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    command: "hug",
    description:
        "Want to hug someone or yourself? This is the command to do so!",
    data: new SlashCommandBuilder()
        .setName("hug")
        .setDescription(
            "Want to hug someone or yourself? This is the command to do so!"
        )
        .addUserOption((option) =>
            option.setName("user").setDescription("The user you'd like to hug!")
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

        const hugs = [
            `braces <@${User.id}> in a warm embrace :3`,
            `hugs <@${User.id}> tightly OwO`,
            `spreads their arms and locks <@${User.id}> in a cozy hug!`,
            `places <@${User.id}> in front of a warm campfire and hugs them`,
            `yells: FREE HUGS FOR <@${User.id}>!!`,
            `covers <@${User.id}> in floof!`,
            `gives <@${User.id}> a big hug`,
        ];

        const random = Math.floor(Math.random() * hugs.length);

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
                hug: 1,
            });

            NewRecieving.save();
        } else {
            const hugnum = RecievingUser.hug + 1;
            await actionsModel.updateOne({ id: User.id }, { hug: hugnum });
        }

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> hugs themselves!`);
        } else {
            interaction.reply(
                `${interaction.member.user.username} ${hugs[random]}`
            );
        }
    },
};
