const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    command: "urban",
    description: "Looks up a query from the Urban Dictionary!",
    data: new SlashCommandBuilder()
        .setName("urban")
        .setDescription("Looks up a query from the Urban Dictionary!")
        .addStringOption((option) => option.setName("query").setDescription("The query you want to lookup").setRequired(true)),
    run: async (client, interaction) => {
        const query = interaction.options.getString("query");

        try {
            const request = await (await axios.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(query)}`)).data;
            const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

            const NotFoundEmbed = new MessageEmbed().setColor("RED").setDescription("Sorry, your query couldn't be found. Feel free to try again!");

            if (!request.list.length >= 1) return interaction.reply({ embeds: [NotFoundEmbed] });

            const Embed = new MessageEmbed();

            Embed.setColor("#FFB6C1");
            Embed.setTitle(request.list[0].word);
            Embed.setURL(request.list[0].permalink);
            Embed.addFields(
                {
                    name: "Definition",
                    value: trim(request.list[0].definition, 1024),
                },
                {
                    name: "Example",
                    value: trim(request.list[0].example, 1024),
                },
                {
                    name: "Rating",
                    value: `${request.list[0].thumbs_up} thumbs up. ${request.list[0].thumbs_down} thumbs down.`,
                }
            );

            interaction.reply({ embeds: [Embed] });
        } catch (err) {
            console.log(err);

            const ErrorEmbed = new MessageEmbed();

            ErrorEmbed.setColor("RED");
            ErrorEmbed.setDescription("Oops. Double check your query and try again. The API might be down D:");

            interaction.reply({ embeds: [ErrorEmbed] });
        }
    },
};
