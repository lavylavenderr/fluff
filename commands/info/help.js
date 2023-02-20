const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    command: "help",
    description: "Learn about all of Fluff's commands here!",
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Learn about all of Fluff's commands here!")
        .addStringOption((option) =>
            option
                .setName("command")
                .setDescription(
                    "The command you would like to fetch information about."
                )
        ),
    run: async (client, interaction) => {
        const commandName = interaction.options.getString("command");

        if (!commandName) {
            const categoryemoji = [
                {
                    name: "actions",
                    value: ":person_standing:",
                },
                {
                    name: "fun",
                    value: ":tada:",
                },
                {
                    name: "info",
                    value: ":question:",
                },
                {
                    name: "moderation",
                    value: ":shield:",
                },
                {
                    name: "useful",
                    value: ":white_check_mark:",
                },
            ];

            const categories = Object.keys(client.commands).map((key) => {
                const commands = client.commands[key].map(
                    (command) => "/" + command.command
                );

                const catemoji = categoryemoji.find(
                    (c) => c.name && c.name.includes(key)
                );
                const uppercase = key.charAt(0).toUpperCase() + key.slice(1);
                const correctedname = catemoji.value + ` ${uppercase}`;

                return { name: correctedname, commands: commands };
            });

            // console.log(categories)

            const Embed = new EmbedBuilder()
                .setTitle("Help Menu")
                .setColor("#FFB6C1")
                .setDescription(
                    "Get started with Fluff by simply reading this message! This command provides all current commands along with the ability to view details of each individual command.\n\nDo `/help [command]` to fetch its detailed description."
                );

            const CatCmds = [];

            categories.forEach((cat) => {
                const { name, commands } = cat;
                CatCmds.push(
                    {
                        name: name,
                        value: commands.join(", ")
                    }
                )
            });

            Embed.addFields(CatCmds)

            interaction.reply({ embeds: [Embed] });
        } else {
            const command =
                Object.values(client.commands)
                    .flat()
                    .find((cmd) => cmd.command === commandName.toLowerCase()) ||
                false;
            if (!command) {
                return interaction.reply({
                    content: "Could not find that command",
                });
            }

            const Embed = new EmbedBuilder()
                .setTitle(`Command: ${command.name}`)
                .setColor("#FFB6C1")
                .setDescription(command.data.description);

            interaction.reply({ embeds: [Embed] });
        }
    },
};
