const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {    

    data: new SlashCommandBuilder().setName("ping").setDescription("reply with pong!"),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
        .setTitle('I\'m an Embed')
        .setColor("Random")
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true });
        await interaction.reply({ embeds: [embed] });
    },
};
