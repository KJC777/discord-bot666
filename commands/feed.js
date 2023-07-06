const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {    

    data: new SlashCommandBuilder().setName("feed").setDescription("feed your pet!"),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
        .setTitle('就餵食')
        .setColor("Random")
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true });
        await interaction.reply({ embeds: [embed] });
    },
};
