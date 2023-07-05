const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

function compare3(a, b, c, d) {
    let ans = (a * b) - (c * d);
    let reply = ans;

    // 我們可以在這邊加上甚麼呢

    return reply;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("card_function")
        .setDescription("計算出兩人的牌誰比較大")
        .addNumberOption((option) =>
            option.setName("長_史考特").setDescription("輸入史考特的牌有多長").setRequired(true),
        )
        .addNumberOption((option) =>
            option.setName("寬_史考特").setDescription("輸入史考特的牌有多寬").setRequired(true),
        ),
    async execute(client, interaction) {
        const a = [3, 5, 4, 2, 5]; // 這就是利奧拉手上的牌(長)了
        const b = [5, 8, 9, 7, 4]; // 這就是利奧拉手上的牌(寬)了
        let c = interaction.options.getNumber("長_史考特"); // 已經幫你們宣告好變數了，這裡不需要改
        let d = interaction.options.getNumber("寬_史考特"); // 已經幫你們宣告好變數了，這裡不需要改

        //好像應該有一個迴圈?
        let reply = compare3(); //如何判斷牌的大小

        await interaction.reply(`${reply}`);
    },
};
