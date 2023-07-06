const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client } = require('discord.js');
const fs = require('node:fs');
const { AddPlayer, UpdatePlayer, SearchPlayer } = require("./../Modules/Database");

//[建立/回覆 button] -> [建立 collector] -> [輸贏啦] -> [讀檔] -> [解析] -> [做事]  -> [回應] -> [存檔]

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pet')
    .setDescription('Have your discord pet!'),
    
    async execute(client, interaction) {
        //建立 embed 和剪刀石頭布的三個 button
        const buttonEmbed = new EmbedBuilder()
        .setColor("#ffffff")
        .setTitle(`Pet menu`)
        // .setDescription(`結果：${earnings}元\n你現在有 ${players[i].money} 元!`);
        // interaction.reply({ embeds: [diceEmbed] });

        const storeButton = new ButtonBuilder()   
        .setStyle(ButtonStyle.Primary)
        .setCustomId('store')
        // .setURL('')
        .setLabel('store');
        
        const statButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId('stat')
        // .setURL('')
        .setLabel('stat');
        
        const restButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId('rest')
        // .setURL('')
        .setLabel('rest');

        const exerciseButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId('exercise')
        // .setURL('')
        .setLabel('exercise');

        const codeButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId('code')
        // .setURL('')
        .setLabel('code');

        const feedButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId('feed')
        // .setURL('')
        .setLabel('feed');

        //將三個 button 都放入 row 中並回覆 embed 和 row
        const buttonRow = new ActionRowBuilder().addComponents(storeButton, statButton, restButton);
        const buttonRow2 = new ActionRowBuilder().addComponents(exerciseButton, codeButton, feedButton);        
        //回覆
        interaction.reply({embeds: [buttonEmbed], components: [buttonRow, buttonRow2]});

        //建立 collector
        const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

        // console.log(collected);

        const PlayerId = interaction.user.id;
        SearchPlayer(PlayerId)
        .then((Result) => {
            if (Result.length == 0){
                AddPlayer(PlayerId, FinalVal)
                .then((Success) => {
                    if (!Success){
                        console.error(`Failed to add ${PlayerId} to DB`);
                    }
                });
            } else {
                UpdatePlayer(PlayerId, FinalVal)
                .then((Success) => {
                    if (!Success){
                        console.error(`Failed to update ${PlayerId}`);
                    }
                });    
            }

            collector.on('collect', async collected => {

                const customId = collected.customId;
                //利用玩家所按按鈕的 customId 來判斷玩家的選擇
                if(customId == "stat"){
                    
                }
                else if(customId == "store"){
                    const embed = new EmbedBuilder()
                        .setTitle('還沒有東西喔...沒貨')
                        .setColor("Random")
                        .addFields({ name: '商品1', value: '商品1只是個示範', inline: true });
                    interaction.followUp({ embeds: [embed] });
                }
                else if(customId == "rest"){
                    const embed = new EmbedBuilder()
                        .setTitle('還沒有東西喔...沒寵物')
                        .setColor("Random")
                        .addFields({ name: '.....', value: '只是個示範', inline: true });
                    interaction.followUp({ embeds: [embed] });
                }
                else if(customId == "excercise"){
                    const embed = new EmbedBuilder()
                        .setTitle('還沒有東西喔...沒code')
                        .setColor("Random")
                        .addFields({ name: 'yeet', value: '只是個示範', inline: true });
                    interaction.followUp({ embeds: [embed] });
                }
                else if(customId == "code"){
                    const embed = new EmbedBuilder()
                        .setTitle('還沒有東西喔...沒辦法')
                        .setColor("Random")
                        .addFields({ name: 'KK', value: '只是個示範', inline: true });
                    interaction.followUp({ embeds: [embed] });
                }
                else if(customId == "feed"){
                    const embed = new EmbedBuilder()
                        .setTitle('還沒有東西喔...沒食物')
                        .setColor("Random")
                        .addFields({ name: 'QQ', value: '只是個示範', inline: true });
                    interaction.followUp({ embeds: [embed] });
                }
                
                // //讀取 players.json 並 parse 成 players
                // const data = fs.readFileSync("players.json");
                // let players = JSON.parse(data);
                // //在所有資料中尋找呼叫此指令玩家的資料
                // let found = false;
                // for (let i = 0; i < players.length; i++) {
                //     //如果有修改該玩家的 money 並回覆結果
                //     if (players[i].id == collected.user.id) {
                //         found = true;
                //         players[i].money += earnings;
                //         const resultEmbed = new EmbedBuilder()
                //             .setColor("#DDDDDD")
                //             .setTitle(`${str}`)
                //             .setDescription(`結果：${earnings}元\n你現在有 ${players[i].money} 元!`);
                            
                //          collected.update({embeds: [resultEmbed], components: []});
                //         break;
                //     }
                // }
                // //如果沒有資料就創建一個新的並回覆結果
                // if (found == false) {
                //     players.push({ id: interaction.user.id, money: 500 });
                //     const resultEmbed = new EmbedBuilder()
                //     .setColor("#DDDDDD")
                //     .setTitle(str)
                //     .setDescription(`結果：${earnings}元\n你現在有 ${500+earnings} 元!`);
                //     collected.update({embeds: [resultEmbed], components: []});
                // }
    
                // //stringify players 並存回 players.json
                // const json = JSON.stringify(players);
                // fs.writeFileSync("players.json", json);
                //關閉 collector
                collector.stop();
    
            });
        });
    }
};