const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {    

    data: new SlashCommandBuilder().setName("code").setDescription("let your pet go coding!"),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
        .setTitle('urrhhh...自己修')
        .setColor("Random")
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true });
        await interaction.reply({ embeds: [embed] });
    },
};
