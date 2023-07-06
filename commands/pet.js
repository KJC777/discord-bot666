const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client } = require('discord.js');
const fs = require('node:fs');
const { AddPlayer, UpdatePlayer, SearchPlayer, InitDb, PlayerData } = require("./../Modules/Database");

//[建立/回覆 button] -> [建立 collector] -> [輸贏啦] -> [讀檔] -> [解析] -> [做事]  -> [回應] -> [存檔]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pet')
        .setDescription('Have your discord pet!'),

    async execute(client, interaction) {

        const PlayerId = interaction.user.id;
        const start_money = 500;
        const start_pet_hungry = 0;
        const start_pet_fatigue = 0;
        const start_age = 0;
        const start_foods = 0;

        SearchPlayer(PlayerId)
            .then((Result) => {
                if (Result.length == 0) {
                    AddPlayer(PlayerId, start_money, start_pet_hungry, start_pet_fatigue, start_age, start_foods)
                        .then((Success) => {
                            if (!Success) {
                                console.error(`Failed to add ${PlayerId} to DB`);
                            }
                        });
                } else {
                    //...  
                }
                //建立 embed 和剪刀石頭布的三個 button
                const buttonEmbed = new EmbedBuilder()
                    .setColor("#ffffff")
                    .setTitle(`主選單--Pet menu`)
                // .setDescription(`結果：${earnings}元\n你現在有 ${players[i].money} 元!`);
                // interaction.reply({ embeds: [diceEmbed] });


                const shop = new EmbedBuilder()
                    .setTitle('這裡是商店 !\nTHE SHOP !')
                    .setColor("Random")

                const storeButton = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('store')
                    // .setURL('')
                    .setLabel('🏪商店--store');

                const storeItem1 = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('storeItem1')
                    // .setURL('')
                    .setLabel('🐟魚1 fish1');
                const storeItem2 = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('storeItem2')
                    // .setURL('')
                    .setLabel('🐟魚2 fish2');
                const storeItem3 = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('storeItem3')
                    // .setURL('')
                    .setLabel('🐟魚3 fish3');

                const ShopRow = new ActionRowBuilder().addComponents(storeItem1, storeItem2, storeItem3);
                const statButton = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('stat')
                    // .setURL('')
                    .setLabel('👥狀態--stat');

                const restButton = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('rest')
                    // .setURL('')
                    .setLabel('💤休息--rest');

                const exerciseButton = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('exercise')
                    // .setURL('')
                    .setLabel('🏋️運動--exercise');

                const codeButton = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('code')
                    // .setURL('')
                    .setLabel('⌨️打code--coding');

                const feedButton = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('feed')
                    // .setURL('')
                    .setLabel('🍞餵食--feed');

                //將三個 button 都放入 row 中並回覆 embed 和 row
                const buttonRow = new ActionRowBuilder().addComponents(storeButton, statButton, restButton);
                const buttonRow2 = new ActionRowBuilder().addComponents(exerciseButton, codeButton, feedButton);
                //回覆
                interaction.reply({ embeds: [buttonEmbed], components: [buttonRow, buttonRow2] });

                //建立 collector
                const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

                // console.log(collected);

                // await InitDb();


                collector.on('collect', async collected => {

                    const customId = collected.customId;
                    //利用玩家所按按鈕的 customId 來判斷玩家的選擇
                    if (customId == "status") {
                        // console.log(money_now);
                        const embed = new EmbedBuilder()
                            .setTitle('Status: ')
                            .setColor("Random")
                            .addFields(
                                { name: 'Money', value: (await PlayerData(PlayerId, "money")).toString(), inline: true },
                                { name: 'Hungry', value: (await PlayerData(PlayerId, "pet_hungry")).toString(), inline: true },
                                { name: 'Age', value: (await PlayerData(PlayerId, "age")).toString(), inline: true },
                                { name: 'Foods', value: (await PlayerData(PlayerId, "foods")).toString(), inline: true });
                        interaction.followUp({ embeds: [embed] });
                    }
                    else if (customId == "store") {
                        collected.update({ embeds: [shop], components: [ShopRow] });
                        const collector = interaction.channel.createMessageComponentCollector({ time: 10000 });
                        let money_now = await PlayerData(PlayerId, "money");
                        collector.on('collect', collected => {
                            const customId = collected.customId;
                            //
                            if (customId == "storeItem1") {
                                if (money_now >= 100) {
                                    UpdatePlayer(PlayerId, "money", money_now - 100)
                                        .then((Success) => {
                                            if (!Success) {
                                                console.error(`Failed to update ${PlayerId}`);
                                            }
                                        });
                                    const embed = new EmbedBuilder()
                                        .setTitle('購買成功!')
                                        .setColor("Random")
                                        .addFields({ name: '已購買: ', value: "1", inline: true },);
                                    interaction.followUp({ embeds: [embed] });
                                } else {
                                    const embed = new EmbedBuilder()
                                        .setTitle('購買失敗!')
                                        .setColor("Random");
                                    interaction.followUp({ embeds: [embed] });
                                }
                            } else if (customId == "storeItem2") {
                                if (money_now >= 200) {
                                    UpdatePlayer(PlayerId, "money", money_now - 200)
                                        .then((Success) => {
                                            if (!Success) {
                                                console.error(`Failed to update ${PlayerId}`);
                                            }
                                        });
                                    const embed = new EmbedBuilder()
                                        .setTitle('購買成功!')
                                        .setColor("Random")
                                        .addFields({ name: '已購買: ', value: "2", inline: true },);
                                    interaction.followUp({ embeds: [embed] });
                                } else {
                                    const embed = new EmbedBuilder()
                                        .setTitle('購買失敗!')
                                        .setColor("Random");
                                    interaction.followUp({ embeds: [embed] });
                                }
                            } else if (customId == "storeItem3") {
                                if (money_now >= 300) {
                                    UpdatePlayer(PlayerId, "money", money_now - 300)
                                        .then((Success) => {
                                            if (!Success) {
                                                console.error(`Failed to update ${PlayerId}`);
                                            }
                                        });
                                    const embed = new EmbedBuilder()
                                        .setTitle('購買成功!')
                                        .setColor("Random")
                                        .addFields({ name: '已購買: ', value: "3", inline: true },);
                                    interaction.followUp({ embeds: [embed] });
                                } else {
                                    const embed = new EmbedBuilder()
                                        .setTitle('購買失敗!')
                                        .setColor("Random");
                                    interaction.followUp({ embeds: [embed] });
                                }
                            }

                            collector.stop();
                        });
                    }
                    else if (customId == "rest") {
                        const embed = new EmbedBuilder()
                            .setTitle('還沒有東西喔...沒寵物')
                            .setColor("Random")
                            .addFields({ name: '.....', value: '只是個示範', inline: true });
                        collected.update({ embeds: [embed] });
                    }
                    else if (customId == "excercise") {
                        const embed = new EmbedBuilder()
                            .setTitle('還沒有東西喔...沒code')
                            .setColor("Random")
                            .addFields({ name: 'yeet', value: '只是個示範', inline: true });
                        collected.update({ embeds: [embed] });
                    }
                    else if (customId == "code") {
                        const embed = new EmbedBuilder()
                            .setTitle('還沒有東西喔...沒辦法')
                            .setColor("Random")
                            .addFields({ name: 'KK', value: '只是個示範', inline: true });
                        collected.update({ embeds: [embed] });
                    }
                    else if (customId == "feedx") {
                        const embed = new EmbedBuilder()
                            .setTitle('還沒有東西喔...沒食物')
                            .setColor("Random")
                            .addFields({ name: 'QQ', value: '只是個示範', inline: true });
                        collected.update({ embeds: [embed] });
                    }
                    else if (customId == "feed") {
                        let foods_now = await PlayerData(PlayerId, "pet_foods");
                        let hungry_now = await PlayerData(PlayerId, "pet_hungry");

                        foods_now -= 1;
                        hungry_now += 1;


                        UpdatePlayer(PlayerId, "foods", foods_now)
                            .then((Success) => {
                                if (!Success) {
                                    console.error(`Failed to update ${PlayerId}`);
                                }
                            });

                        UpdatePlayer(PlayerId, "pet_hungry", hungry_now)
                            .then((Success) => {
                                if (!Success) {
                                    console.error(`Failed to update ${PlayerId}`);
                                }
                            });

                        const embed = new EmbedBuilder()
                            .setTitle(`Feed`)
                            .setColor("Random")
                            .addFields({ name: 'hungry', value: "...", inline: true });
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