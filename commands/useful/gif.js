const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

module.exports = {
    command: "gif",
    description: "Looks up a GIF from a site of your choice and returns it.",
    data: new SlashCommandBuilder()
        .setName("gif")
        .setDescription("Looks up a GIF from a site of your choice and returns it.")
        .addStringOption((option) =>
            option.setName("source").setDescription("The site the GIF will be grabbed from.").setRequired(true).addChoices({
                name: "Giphy",
                value: "giphy",
            })
        )
        .addStringOption((option) => option.setName("query").setDescription("What are you searching for?").setRequired(true)),
    run: async (client, interaction) => {
        const source = interaction.options.getString("source");
        const query = interaction.options.getString("query");

        try {
            if (source == "giphy") {
                const request = await (await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHYAPIKEY}&q=${encodeURIComponent(query)}&limit=1&offset=0&rating=g&lang=en&format=json`)).data;

                interaction.reply(`${request.data[0].url}`);
            } else {
                return interaction.reply({ content: "Sorry! That site isn't supported yet." });
            }
        } catch (err) {
            console.log(err);

            const ErrorEmbed = new MessageEmbed();

            ErrorEmbed.setColor("RED");
            ErrorEmbed.setDescription("Oops. Something went wrong!");

            interaction.reply({ embeds: [ErrorEmbed] });
        }
    },
};
