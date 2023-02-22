const actionsModel = require("../../schemas/actions");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    command: "stats",
    description: "See how many times you've been interacted with!",
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("See how many times you've been interacted with!")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you would like to fetch stats for.")
        ),
    /**
     * @param {import("discord.js").Client} client
     * @param {import("discord.js").CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const User = interaction.options.getUser("user") || interaction.user;

        const UserStats = await actionsModel.findOne({ id: User.id });

        const ErrorEmbed = new EmbedBuilder();

        ErrorEmbed.setColor("#FF0000");
        ErrorEmbed.setDescription("Oops. That user is not in the database!");

        const Footer = `Requested by: ${interaction.user.tag}` //Fucking DiscordJS v14

        if (!UserStats) return interaction.reply({ embeds: [ErrorEmbed] });

        const StatsEmbed = new EmbedBuilder()
            .setAuthor({
                name: `${User.tag}`,
                iconURL: `${User.displayAvatarURL({
                    dynamic: true,
                    size: 512,
                })}`,
            })
            .setDescription(
                `The following fields show the action stats of the requested user. These include each time you've been interacted with and with what command.`
            )
            .setColor("#FFB6C1")
            .addFields(
                {
                    name: "Barked At:",
                    value: String(UserStats.bark),
                    inline: true,
                },
                {
                    name: "Bit:",
                    value: String(UserStats.bite),
                    inline: true,
                },
                {
                    name: "Booped:",
                    value: String(UserStats.boop),
                    inline: true,
                },
                {
                    name: "Hugged:",
                    value: String(UserStats.hug),
                    inline: true,
                },
                {
                    name: "Kissed:",
                    value: String(UserStats.kiss),
                    inline: true,
                },
                {
                    name: "Pet:",
                    value: String(UserStats.pet),
                    inline: true,
                },
                {
                    name: "Poked:",
                    value: String(UserStats.poke),
                    inline: true,
                },
                {
                    name: "Slapped:",
                    value: String(UserStats.slap),
                    inline: true,
                },
                {
                    name: "Spanked:",
                    value: String(UserStats.spank),
                    inline: true,
                }
            )
            .setFooter(Footer)
            .setTimestamp();

        interaction.reply({ embeds: [StatsEmbed] });
    },
};
