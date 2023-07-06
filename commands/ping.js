const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {    

    data: new SlashCommandBuilder().setName("ping").setDescription("reply with pong!"),
    async execute(client, interaction) {
        const embed = new EmbedBuilder()
        .setTitle('I\'m an Embed')
        .setColor("Random")
        .setImage("https://imgur.com/a/sB7a4gY")
        // .attachFiles([{name: '004.gif', attachment: 'file:///C:/Users/%E8%A8%B1%E5%AE%B8%E7%A0%94/Documents/GitHub/discord-bot666/004.gif'}])
        // .setImage("attachment://004.gif")
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true });
        await interaction.reply({ embeds: [embed] });
    },
};
