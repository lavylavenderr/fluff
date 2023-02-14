const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = {
    command: "avatar",
    description: "Fetch the avatar of a specified user, if not yourself.",
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription(
            "Fetch the avatar of a specified user, if not yourself."
        )
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user whos avatar you'd like to fetch.")
        ),
    /**
     * @param {import("discord.js").Client} client
     * @param {import("discord.js").CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        try {
            let User = interaction.options.getUser("user") || interaction.user;

            const Embed = new MessageEmbed()
                .setColor("#FFB6C1")
                .setAuthor(User.username + "'s Avatar")
                .setImage(
                    User.displayAvatarURL({
                        format: "png",
                        size: 2048,
                        preferAnimated: true,
                    })
                );

            if (User.id === process.env.BOTID) {
                Embed.setDescription(
                    "Fluff's profile picture was designed by #artist!"
                );
            }

            interaction.reply({ embeds: [Embed] });
        } catch (error) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(
                            "Oops, we ran into a error trying to process this command."
                        )
                        .setColor("RED"),
                ],
            });
        }
    },
};
