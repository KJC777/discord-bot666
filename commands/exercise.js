const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {    

    data: new SlashCommandBuilder().setName("exercise").setDescription("let your pet exercise!"),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
        .setTitle('urrhhh...反正就運動，自己修')
        .setColor("Random")
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true });
        await interaction.reply({ embeds: [embed] });
    },
};
