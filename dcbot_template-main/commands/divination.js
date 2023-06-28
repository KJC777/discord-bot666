const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("divination").setDescription("擲筊看看運氣如何"),
    async execute(client, interaction) {
        let a = Math.floor(Math.random() * 2); // 取得一個0或1的數字
        let b = Math.floor(Math.random() * 2); // 取得一個0或1的數字
        if (a && b) {
            await interaction.reply(`結果為 ${a} ${b} 是笑筊歐 :) `);
        } else if (a || b) {
            await interaction.reply(`結果為 ${a} ${b} 是聖筊欸!快去買樂透!`);
        } else {
            await interaction.reply(`結果為 ${a} ${b} 是陰筊! 小心被車撞(X)`);
        }
    },
};
