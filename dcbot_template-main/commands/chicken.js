const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client } = require('discord.js');
const fs = require('node:fs');

//[建立/回覆 button] -> [建立 collector] -> [輸贏啦] -> [讀檔] -> [解析] -> [做事]  -> [回應] -> [存檔]

module.exports = {
    data: new SlashCommandBuilder()
    .setName('chicken')
    .setDescription('養雞雞~'),
    
    async execute(client, interaction) {

        //建立 embed 和剪刀石頭布的三個 button
        const buttonEmbed = new EmbedBuilder()
        .setColor("#ffffff")
        .setTitle(`來猜拳吧`)
        // .setDescription(`結果：${earnings}元\n你現在有 ${players[i].money} 元!`);
        // interaction.reply({ embeds: [diceEmbed] });

        const scissorButton = new ButtonBuilder()   
        .setStyle(ButtonStyle.Primary)
        .setCustomId('scissor')
        // .setURL('')
        .setLabel('✌️');
        
        const rockButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId('stone')
        // .setURL('')
        .setLabel('✊');
        
        const paperButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId('paper')
        // .setURL('')
        .setLabel('🖖');

        //將三個 button 都放入 row 中並回覆 embed 和 row
        const buttonRow = new ActionRowBuilder().addComponents(scissorButton, rockButton, paperButton);
        //回覆
        interaction.reply({embeds: [buttonEmbed], components: [buttonRow]});

        //建立 collector
        const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
        collector.on('collect', collected => {

        // console.log(collected);
        
        //等待 collector 蒐集到玩家案的按鈕
        //collector.on('collect', async collected => {

            //電腦隨機出拳 (0:剪刀 1:石頭 2:布)
            const botChoice = Math.floor(Math.random() * 3) ;
            const customId = collected.customId;
            //利用玩家所按按鈕的 customId 來判斷玩家的選擇
            let playerChoice;
            if(customId == "scissor"){
                playerChoice = 0;
            }
            else if(customId == "stone"){
                playerChoice = 1;
            }
            else if(customId == "paper"){
                playerChoice = 2;
            }

            //判斷玩家勝利，電腦勝利或平手 (0:平手 1:電腦 2:玩家)
            let winner = 1;
            if(playerChoice == 0 && botChoice == 2){
                winner = 2;
            }
            else if(playerChoice == 1 && botChoice == 0){
                winner = 2;
            }
            else if(playerChoice == 2 && botChoice == 1){
                winner = 2;
            }
            else if (playerChoice == botChoice){
                winner = 0;
            }
            let str = "你贏了";
            //從結果計算獲得/失去的 money
            let earnings = 0;
            switch (winner){
            case 1:
                str = "你輸了";
                earnings -= 3;
                break;
            case 2:
                str = "你贏了";
                earnings += 2;
                break;
            case 0:
                str = "平手";
                break;
            default:
                break;
            }
            
            //讀取 players.json 並 parse 成 players
            const data = fs.readFileSync("players.json");
            let players = JSON.parse(data);
            //在所有資料中尋找呼叫此指令玩家的資料
            let found = false;
            for (let i = 0; i < players.length; i++) {
                //如果有修改該玩家的 money 並回覆結果
                if (players[i].id == collected.user.id) {
                    found = true;
                    players[i].money += earnings;
                    const resultEmbed = new EmbedBuilder()
                        .setColor("#DDDDDD")
                        .setTitle(`${str}`)
                        .setDescription(`結果：${earnings}元\n你現在有 ${players[i].money} 元!`);
                        
                     collected.update({embeds: [resultEmbed], components: []});
                    break;
                }
            }
            //如果沒有資料就創建一個新的並回覆結果
            if (found == false) {
                players.push({ id: interaction.user.id, money: 500 });
                const resultEmbed = new EmbedBuilder()
                .setColor("#DDDDDD")
                .setTitle(str)
                .setDescription(`結果：${earnings}元\n你現在有 ${500+earnings} 元!`);
                collected.update({embeds: [resultEmbed], components: []});
            }

            //stringify players 並存回 players.json
            const json = JSON.stringify(players);
            fs.writeFileSync("players.json", json);
            //關閉 collector
            collector.stop();

        });
    }
};