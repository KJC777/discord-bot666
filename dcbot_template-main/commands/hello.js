const { SlashCommandBuilder, UserSelectMenuInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("hello").setDescription("讓機器人跟你打招呼"),
    async execute(client, interaction) {
        await interaction.reply(
            `嗨 <@${interaction.user.id}> 很高興認識你，我是 ${client.user.username}`,
        );
    },
};
