const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {    

    data: new SlashCommandBuilder().setName("ping").setDescription("reply with pong!"),
    async execute(client, interaction) {
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'Some title',
            url: 'https://discord.js.org',
            author: {
                name: '六角龍小隊!',
                // icon_url: 'https://i.imgur.com/yWdzTb2.png',
                url: 'https://camp.csie.cool',
            },
            description: 'Some description here',
            thumbnail: {
                url: 'https://i.imgur.com/yWdzTb2.png',
            },
            
            image: {
                url: 'https://i.imgur.com/1O4cla2.gif', // 吃魚
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Some footer text here',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
            },
        };
        
        await interaction.reply({ embeds: [exampleEmbed] });
        // channel.send({ embeds: [exampleEmbed] });
    },
};
