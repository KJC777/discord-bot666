const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {    

    data: new SlashCommandBuilder().setName("store").setDescription("the command to buy stuff"),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
        .setTitle('還沒有東西喔...沒貨')
        .setColor("Random")
        .addFields({ name: '商品1', value: '商品1只是個示範', inline: true });
        await interaction.reply({ embeds: [embed] });
    },
};
