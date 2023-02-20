const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    command: "channelinfo",
    description: "Fetches info about the current channel.",
    data: new SlashCommandBuilder()
        .setName("channelinfo")
        .setDescription("Fetches info about the current channel.")
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("The channel you'd like to get info for.")
        )
        .setDMPermission(false),
    run: async (client, interaction) => {
        let Channel;
        try {
            if (!interaction.options.getChannel("channel")) {
                Channel = interaction.channel;
            } else {
                Channel = interaction.options.getChannel("channel");
            }
        } catch (err) {
            Channel = interaction.channel;
            console.log(err);
        }

        if (interaction.channel.id === Channel.id) {
            const Embed = new EmbedBuilder()
                .setColor("#FFB6C1")
                .setAuthor("Channel Info", "https://i.imgur.com/hWPDJuv.png")
                .addFields(
                    {
                        name: "Name:",
                        value: String(interaction.channel.name),
                        inline: true,
                    },
                    {
                        name: "ID:",
                        value: interaction.channel.id,
                        inline: true,
                    },
                    {
                        name: "Type:",
                        value: interaction.channel.type,
                        inline: true,
                    },
                    {
                        name: "Messages:",
                        value: "0",
                        inline: true,
                    },
                    {
                        name: "Topic:",
                        value: interaction.channel.topic
                            ? interaction.channel.topic
                            : "Nothing",
                        inline: true,
                    }
                )
                .setTimestamp(interaction.channel.createdAt)
                .setFooter("Created at");

            interaction.reply({ embeds: [Embed] });
        } else if ((Channel.type = "GUILD_CATEGORY")) {
            const Embed = new EmbedBuilder()
                .setAuthor("Category Info", "https://i.imgur.com/hWPDJuv.png")
                .addFields(
                    {
                        name: "Name:",
                        value: Channel.name,
                        inline: true,
                    },
                    {
                        name: "ID:",
                        value: Channel.id,
                        inline: true,
                    },
                    {
                        name: "Type:",
                        value: Channel.type,
                        inline: true,
                    }
                )
                .setTimestamp(Channel.createdAt)
                .setFooter("Created at");

            interaction.reply({ embeds: [Embed] });
        } else {
            const Embed = new EmbedBuilder()
                .setAuthor("Channel Info", "https://i.imgur.com/hWPDJuv.png")
                .addFields(
                    {
                        name: "Name:",
                        value: Channel.name,
                        inline: true,
                    },
                    {
                        name: "ID:",
                        value: Channel.id,
                        inline: true,
                    },
                    {
                        name: "Type:",
                        value: Channel.type,
                        inline: true,
                    },

                    {
                        name: "Messages:",
                        value: Channel.messages.length
                            ? interaction.channel.messages.length
                            : "0",
                        inline: true,
                    },
                    {
                        name: "Topic:",
                        value: Channel.topic ? Channel.topic : "Nothing",
                        inline: true,
                    }
                )
                .setTimestamp(Channel.createdAt)
                .setFooter("Created");

            interaction.reply({ embeds: [Embed] });
        }
    },
};
