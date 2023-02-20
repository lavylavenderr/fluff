const { PermissionFlagsBits } = require("discord-api-types/v10");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    command: "clear",
    description: "Clears messages sent in a channel. or by a user.",
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears messages sent in a channel or by a user.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addNumberOption((option) =>
            option
                .setName("amount")
                .setDescription(
                    "The amount of messages you would like to clear."
                )
                .setRequired(true)
        )
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User who's messages you'd like to clear.")
        )
        .setDMPermission(false),
    run: async (client, interaction) => {
        const { channel } = interaction;

        const Amount = interaction.options.getNumber("amount");
        const Target = interaction.options.getUser("user");
        const Messages = await interaction.channel.messages.fetch();
        const Response = new EmbedBuilder();

        if (Amount >= 101) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(
                            "You can only delete 100 messages at a time!"
                        )
                        .setColor("#FF0000"),
                ],
                ephemeral: true,
            });
        }

        if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            });

            await channel.bulkDelete(filtered, true).then((messages) => {
                Response.setDescription(
                    `🧹 Cleared ${messages.size} from ${Target}.`
                );
                Response.setColor("#FFB6C1");
                interaction.reply({ embeds: [Response], ephemeral: true });
            });
        } else {
            await channel.bulkDelete(Amount, true).then((messages) => {
                Response.setColor("#FFB6C1");
                Response.setDescription(
                    `🧹 Cleared ${messages.size} from this channel.`
                );
                interaction.reply({ embeds: [Response], ephemeral: true });
            });
        }
    },
};
