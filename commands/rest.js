const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {    

    data: new SlashCommandBuilder().setName("rest").setDescription("set your pet to rest!"),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
        .setTitle('就休息')
        .setColor("Random")
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true });
        await interaction.reply({ embeds: [embed] });
    },
};
