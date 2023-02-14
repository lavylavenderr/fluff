const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    command: "status",
    description: "Returns a embed with the status of the bot and database.",
    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription(
            "Returns a embed with the status of the bot and database."
        ),
    run: async (client, interaction) => {
        const user = interaction.user;

        const Embed = new MessageEmbed()
            .setAuthor({
                name: `${user.tag}`,
                iconURL: `${user.displayAvatarURL({
                    dynamic: true,
                    size: 512,
                })}`,
            })
            .setDescription(
                `**Client**: \`🟢 ONLINE\` - \`${
                    client.ws.ping
                }ms\`\n**Uptime**: <t:${parseInt(
                    client.readyTimestamp / 1000
                )}:R>`
            )
            .setColor("#FFB6C1")
            .setTimestamp();

        interaction.reply({ embeds: [Embed] });
    },
};
