const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    command: 'urban',
    description: 'Looks up a query from the Urban Dictionary!',
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Looks up a query from the Urban Dictionary!')
        .addStringOption(option =>
            option.setName('query').setDescription('The query you want to lookup').setRequired(true)    
        ),
    run: async (client, interaction) => {
        const query = interaction.options.getString('query')

        try {
            const request = await (await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`)).data

            const Embed = new MessageEmbed()
            let example;
            let definition;

            if (request.list[0].example.length >= 1024) {
                example = request.list[0].example.split()
            } else {
                example = request.list[0].example
            }

            if (request.list[0].definition.length >= 1024) {
                definition = request.list[0].definition.split()
            } else {
                definition = request.list[0].definition
            }

            Embed.setTitle(request.list[0].word)
            Embed.setURL(request.list[0].permalink)
            Embed.addFields(
                {
                    name: 'Definition',
                    value: definition
                },
                {
                    name: 'Example',
                    value: example
                },
                {
                    name: 'Rating',
                    value: `${request.list[0].thumbs_up} thumbs up. ${request.list[0].thumbs_down} thumbs down.`
                }
            )

            interaction.reply({ embeds: [Embed] })
        } catch (err) {
            console.log(err)

            const ErrorEmbed = new MessageEmbed()

            ErrorEmbed.setColor("RED")
            ErrorEmbed.setDescription('Oops. Double check your query and try again. The API might be down D:')

            interaction.reply({ embeds: [ErrorEmbed] })
        }
    }
}