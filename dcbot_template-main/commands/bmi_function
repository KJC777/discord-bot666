const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

function bmi_compare(height, weight) {
    let bmi = weight / (height * height);
    let reply = "這是預設字串";
    if (bmi < 18.5) {
        reply = "體重過輕";
    } else if (bmi < 24 && bmi >= 18.5) {
        reply = "體重正常";
    } else {
        reply = "體重過重";
    }
    return reply;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bmi_function")
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
        let reply = bmi_compare(height, weight);

        await interaction.reply(`${reply}`);
    },
};
