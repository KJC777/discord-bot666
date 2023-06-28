const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bmi")
        .setDescription("計算出你的 BMI ")
        .addNumberOption((option) =>
            option.setName("身高").setDescription("輸入你的身高(公尺)").setRequired(true),
        )
        .addNumberOption((option) =>
            option.setName("體重").setDescription("輸入你的體重(公斤)").setRequired(true),
        ),
    async execute(client, interaction) {
        let height = interaction.options.getNumber("身高");
        if (height > 100) {
            height = height / 100;
        }
        let weight = interaction.options.getNumber("體重");
        let bmi = weight / (height * height);
        await interaction.reply(`${bmi}`);
        /*
        if (bmi < 18.5) {
            await interaction.reply(`體重過輕 bmi=${bmi}`);
        } else if (bmi >= 18.5 && bmi < 24) {
            await interaction.reply(`體重適中 bmi=${bmi}`);
        } else {
            await interaction.reply(`體重過重 bmi=${bmi}`);
        }
        */
    },
};
