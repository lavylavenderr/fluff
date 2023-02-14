const config = require("../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {import("discord.js").Interaction} interaction
     * @param {import("discord.js").Client} client
     */
    execute(interaction, client) {
        if (
            interaction.guild &&
            config.blacklist.includes(interaction.guildId)
        ) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(
                            "Sorry, this server is blacklisted from the bot. If the owner would like to appeal, join the support server."
                        )
                        .setColor("RED"),
                ],
                ephemeral: true,
            });
        } else {
            if (interaction.isCommand()) {
                return Object.values(client.commands)
                    .flat()
                    .find((cmd) => cmd.command === interaction.commandName)
                    .run(client, interaction);
            }
        }
    },
};
