module.exports = {
    name: "interactionCreate",
    execute(interaction, client) {
        if (interaction.isCommand()) {
            return Object.values(client.commands)
                .flat()
                .find((cmd) => cmd.command === interaction.commandName)
                .run(client, interaction);
        }
    },
};
