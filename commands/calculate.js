const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("calculate")
        .setDescription("選擇加減乘除來計算 a 和 b ")
        .addNumberOption((option) =>
            option.setName("a").setDescription("請輸入 a").setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("type")
                .setDescription("choose a way to calculate a b ")
                .setRequired(true)
                .addChoices(
                    {
                        name: "add",
                        value: "1",
                    },
                    {
                        name: "minus",
                        value: "2",
                    },
                    {
                        name: "multiply",
                        value: "3",
                    },
                    {
                        name: "divide",
                        value: "4",
                    },
                ),
        )
        .addNumberOption((option) =>
            option.setName("b").setDescription("請輸入 b").setRequired(true),
        ),
    async execute(client, interaction) {
        let type = interaction.options.getString("type");
        let a = interaction.options.getNumber("a");
        let b = interaction.options.getNumber("b");
        let ans;
        if (type == 1) {
            ans = a + b;
            await interaction.reply(`${a} + ${b} = ${ans}`);
        } else if (type == 2) {
            ans = a - b;
            await interaction.reply(`${a} - ${b} = ${ans}`);
        } else if (type == 3) {
            ans = a * b;
            await interaction.reply(`${a} * ${b} = ${ans}`);
        } else if (type == 4) {
            ans = a / b;
            await interaction.reply(`${a} / ${b} = ${ans}`);
        }
    },
};
