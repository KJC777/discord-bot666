const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("將提供的 a 和 b 相加")
        .addNumberOption((option) =>
            option.setName("a").setDescription("請輸入 a").setRequired(true),
        )
        .addNumberOption((option) =>
            option.setName("b").setDescription("請輸入 b").setRequired(true),
        ),
    async execute(client, interaction) {
        let a = interaction.options.getNumber("a");
        let b = interaction.options.getNumber("b");
        let ans = a + b;
        await interaction.reply(`${a} + ${b} = ${ans}`);
    },
};
