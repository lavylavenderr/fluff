const { SlashCommandBuilder } = require("@discordjs/builders");
const actionsModel = require("../../schemas/actions");
const { MessageEmbed } = require("discord.js");

module.exports = {
    command: "spank",
    description: "I will spank you, stay back!!",
    data: new SlashCommandBuilder()
        .setName("spank")
        .setDescription("I will spank you, stay back!!")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you'd like to spank!")
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

        const spanks = [
            `gives <@${User.id}> a smol spanking!`,
            `gives <@${User.id}> a spank!`,
            `gives <@${User.id}> a smol butt-bap.. that was a warning!`,
            `leans over towards <@${User.id}> and spanks their butt hard!`,
            `turns around and spanks <@${User.id}>!`,
            `seems to think you've been bad, <@${User.id}>, so they walk up to you and spank you!`,
            `raises their arm and spanks <@${User.id}> gently -- no wait i meant hard!`,
        ];

        const random = Math.floor(Math.random() * spanks.length);

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
                spank: 1,
            });

            NewRecieving.save();
        } else {
            const spanknum = RecievingUser.spank + 1;
            await actionsModel.updateOne({ id: User.id }, { nuzzle: spanknum });
        }

        if (User.id === interaction.member.id) {
            interaction.reply(`<@${User.id}> you can\'t spank yourself >:(`);
        } else {
            interaction.reply(
                `${interaction.member.user.username} ${spanks[random]}`
            );
        }
    },
};
