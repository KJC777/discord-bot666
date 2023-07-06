const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {    

    data: new SlashCommandBuilder().setName("ping").setDescription("reply with pong!"),
    async execute(client, interaction) {
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'Some title',
            author: {
                name: '來玩🦖吧！',
                icon_url: 'https://i.imgur.com/yWdzTb2.png',
            },
            description: 'Some description here',            
            image: {
                url: 'https://i.imgur.com/1O4cla2.gif', // 吃魚
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: '由第🦖小隊~666製作✨',
            },
        };
        
        await interaction.reply({ embeds: [exampleEmbed] });
        // channel.send({ embeds: [exampleEmbed] });
    },
};
