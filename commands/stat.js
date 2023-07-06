const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {    

    data: new SlashCommandBuilder().setName("stat").setDescription("the command to show stat"),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
        .setTitle('你的寵物狀態:')
        .setColor("Random")
        .addFields({ name: '疲累度', value: '某些值', inline: true }, { name: '飢餓度', value: '某些值', inline: true },{ name: '你的錢', value: '某些值', inline: true });
        await interaction.reply({ embeds: [embed] });
    },
};
