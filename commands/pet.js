const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client } = require('discord.js');
const fs = require('node:fs');
const { AddPlayer, UpdatePlayer, SearchPlayer, InitDb, PlayerData, DeletePlayer } = require("./../Modules/Database");

const timer = ms => new Promise(res => setTimeout(res, ms));

//[建立/回覆 button] -> [建立 collector] -> [輸贏啦] -> [讀檔] -> [解析] -> [做事]  -> [回應] -> [存檔]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pet')
        .setDescription('Have your discord pet!'),

    async execute(client, interaction) {

        const PlayerId = interaction.user.id;
        const start_money = 500;
        const start_pet_hungry = 2;
        const start_pet_fatigue = 0;
        const start_age = 0;
        const start_foods = 0;
        let First = false;
        // await InitDb();


        SearchPlayer(PlayerId)
            .then((Result) => {
                if (Result.length == 0) {
                    console.log("乖乖");
                    First = true;
                    AddPlayer(PlayerId, start_money, start_pet_hungry, start_pet_fatigue, start_age, start_foods)
                        .then((Success) => {
                            if (!Success) {
                                console.error(`Failed to add ${PlayerId} to DB`);
                            }
                        });
                } else {
                    //..
                }

                // const defaultEmbed = new EmbedBuilder()
                //     .setColor("#ffffff")
                //     .setTitle(`主選單--Pet menu`)

                const eggEmbed = {
                    color: 0x0099ff,
                    title: '蛋主選單',
                    author: {
                        name: '來玩🦖吧！',
                        icon_url: 'https://i.imgur.com/yWdzTb2.png',
                    },
                    description: '它現在只是一顆蛋，但它散發著不凡的氣息，或許照照神秘光它能有一些變化',
                    image: {
                        url: 'https://i.imgur.com/71ELEmK.gif', // 吃魚
                    },
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: '由第🦖小隊~666製作✨',
                    },
                };
                const youngEmbed = {
                    color: 0x0099ff,
                    title: '幼年主選單',
                    author: {
                        name: '來玩🦖吧！',
                        icon_url: 'https://i.imgur.com/yWdzTb2.png',
                    },
                    description: '跟著六角恐龍一起努力成長吧!!',
                    image: {
                        url: 'https://i.imgur.com/NrFzY1p.gif', // 吃魚
                    },
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: '由第🦖小隊~666製作✨',
                    },
                };
                const oldEmbed = {
                    color: 0x0099ff,
                    title: '成年主選單',
                    author: {
                        name: '來玩🦖吧！',
                        icon_url: 'https://i.imgur.com/yWdzTb2.png',
                    },
                    description: '超電的工程師蠑螈',
                    image: {
                        url: 'https://i.imgur.com/0RfaFwU.gif', // 吃魚
                    },
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: '由第🦖小隊~666製作✨',
                    },
                };

                const DeadEmbed = {
                    color: 0x0099ff,
                    title: '死亡',
                    author: {
                        name: '來玩🦖吧！',
                        icon_url: 'https://i.imgur.com/yWdzTb2.png',
                    },
                    description: '有始有終\n再次輸入/pet 重新開始遊戲',
                    image: {
                        url: 'https://i.imgur.com/NNtTWfqg.jpg', // 吃魚
                    },
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: '由第🦖小隊~666製作✨',
                    },
                };

                // 

                // .setDescription(`結果：${earnings}元\n你現在有 ${players[i].money} 元!`);
                // interaction.reply({ embeds: [diceEmbed] });

                const FirstEmbed = {
                    color: 0x0099ff,
                    title: '全新寵物(把牠養大以解鎖各種功能)',
                    author: {
                        name: '來玩🦖吧！',
                        icon_url: 'https://i.imgur.com/yWdzTb2.png',
                    },
                    description: '開甚麼玩笑，沒有比養神秘蛋更蝦趴的事了好嗎?',
                    image: {
                        url: 'https://i.imgur.com/B7FbeSb.png', // 吃魚
                    },
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: '由第🦖小隊~666製作✨',
                    },
                };

                const shop = new EmbedBuilder()
                    .setTitle('這裡是商店 !\nTHE SHOP !')
                    .setColor("Random")
                    .setImage("https://cdn-icons-png.flaticon.com/512/265/265754.png");

                const storeButton = new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
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
                    .setStyle(ButtonStyle.Success)
                    .setCustomId('status')
                    // .setURL('')
                    .setLabel('👥狀態--status');

                const restButton = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('rest')
                    // .setURL('')
                    .setLabel('💤休息--rest');
                const shineButton = new ButtonBuilder()
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('shine')
                    // .setURL('')
                    .setLabel('🌟照射神秘光線--\"Let there be light\"');

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
                const buttonRowEGG = new ActionRowBuilder().addComponents(statButton, storeButton, shineButton);
                const buttonRowYOUNG = new ActionRowBuilder().addComponents(statButton, storeButton, feedButton, exerciseButton);
                const buttonRowOLD1 = new ActionRowBuilder().addComponents(statButton, storeButton, feedButton);
                const buttonRowOLD2 = new ActionRowBuilder().addComponents(exerciseButton, codeButton);


                //回覆
                if (First == true) {
                    interaction.reply({ embeds: [FirstEmbed], components: [buttonRowEGG] });
                } else {
                    PlayerData(PlayerId, "age")
                        .then(age => {
                            let age_now = parseInt(age);
                            if (age_now < 3) {
                                interaction.reply({ embeds: [eggEmbed], components: [buttonRowEGG] });
                            } else if (age_now < 6) {
                                interaction.reply({ embeds: [youngEmbed], components: [buttonRowYOUNG] });
                            } else if (age_now < 10) {
                                interaction.reply({ embeds: [oldEmbed], components: [buttonRowOLD1, buttonRowOLD2] });
                            } else {
                                interaction.reply({ embeds: [DeadEmbed] });
                                DeletePlayer(PlayerId);
                            }
                        })
                }
                //建立 collector
                const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

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
                                { name: 'Energy', value: (await PlayerData(PlayerId, "pet_hungry")).toString(), inline: true },
                                { name: 'Age', value: (await PlayerData(PlayerId, "age")).toString(), inline: true },
                                { name: 'Foods', value: (await PlayerData(PlayerId, "foods")).toString(), inline: true });
                        interaction.followUp({ embeds: [embed] });
                    }
                    else if (customId == "store") {
                        collected.update({ embeds: [shop], components: [ShopRow] });
                        const collector = interaction.channel.createMessageComponentCollector({ time: 10000 });
                        let money_now = await PlayerData(PlayerId, "money");
                        let foods_now = await PlayerData(PlayerId, "foods");
                        collector.on('collect', collected => {
                            const customId = collected.customId;
                            //
                            let store_items = ["storeItem1", "storeItem2", "storeItem3"];
                            for (let i = 0; i < 3; i++) {
                                if (customId == store_items[i]) {
                                    if (parseInt(money_now) >= 100 * (1 + i)) {
                                        is_money_enough = true;
                                        UpdatePlayer(PlayerId, "money", (money_now - 100).toString())
                                            .then((Success) => {
                                                if (!Success) {
                                                    console.error(`Failed to update ${PlayerId}`);
                                                }
                                            });

                                        UpdatePlayer(PlayerId, "foods", (foods_now + 1 + i).toString())
                                            .then((Success) => {
                                                if (!Success) {
                                                    console.error(`Failed to update ${PlayerId}`);
                                                }
                                            });

                                        const embed = new EmbedBuilder()
                                            .setTitle('購買成功!')
                                            .setColor("Random")
                                            .addFields({ name: '已購買: ', value: (i + 1).toString(), inline: true },);
                                        interaction.followUp({ embeds: [embed] });
                                    } else {
                                        const embed = new EmbedBuilder()
                                            .setTitle('購買失敗!')
                                            .setColor("Random");
                                        interaction.followUp({ embeds: [embed] });
                                    }
                                }
                            }
                            collector.stop();
                        });
                    }
                    else if (customId == "shine") {
                        const embed = {
                            color: 0x0099ff,
                            title: '照光ing',
                            author: {
                                name: '來玩🦖吧！',
                                icon_url: 'https://i.imgur.com/yWdzTb2.png',
                            },
                            description: '你正在幫你的神祕蛋照你買來的一縷聖光',
                            image: {
                                url: 'https://i.imgur.com/nJkpawf.gif',
                            },
                            timestamp: new Date().toISOString(),
                            footer: {
                                text: '由第🦖小隊~666製作✨',
                            },
                        };
                        await collected.update({ embeds: [embed] });
                        collected.followUp(`好像有甚麼事發生了!!😮...嗎?(1/3機率)`);
                        if (Math.floor(Math.random() * 3) == 1) {
                            const embed = {
                                color: 0x0099ff,
                                title: '挖賽，孵化!!!',
                                author: {
                                    name: '來玩🦖吧！',
                                    icon_url: 'https://i.imgur.com/yWdzTb2.png',
                                },
                                description: '將將將將🎉',
                                image: {
                                    url: 'https://i.imgur.com/F3fYNU2.gif',
                                },
                                timestamp: new Date().toISOString(),
                                footer: {
                                    text: '由第🦖小隊~666製作✨',
                                },
                            };
                            UpdatePlayer(PlayerId, "age", (4).toString());
                            collected.followUp({ embeds: [embed] });
                        } else {
                            collected.followUp(`QQ，無事發生...🥲`);
                        }
                    }
                    // else if (customId == "rest") {

                    //     const embed = new EmbedBuilder()
                    //         .setTitle('還沒有東西喔...沒寵物')
                    //         .setColor("Random")
                    //         .addFields({ name: '.....', value: '只是個示範', inline: true });
                    //     collected.update({ embeds: [embed] });
                    // }
                    else if (customId == "exercise") {
                        // let foods_now = parseInt(await PlayerData(PlayerId, "pet_foods"));
                        let hungry_now = parseInt(await PlayerData(PlayerId, "pet_hungry"));
                        let age_now = parseInt(await PlayerData(PlayerId, "age"));


                        if (hungry_now < 1) {

                            const embed = new EmbedBuilder()
                                .setTitle(`沒有體力了...`)
                                .setColor("Random")
                            interaction.followUp({ embeds: [embed] });
                        } else {
                            hungry_now -= 1;
                            age_now += 1;



                            UpdatePlayer(PlayerId, "pet_hungry", hungry_now)
                                .then((Success) => {
                                    if (!Success) {
                                        console.error(`Failed to update ${PlayerId}`);
                                    }
                                });

                            UpdatePlayer(PlayerId, "age", age_now)
                                .then((Success) => {
                                    if (!Success) {
                                        console.error(`Failed to update ${PlayerId}`);
                                    }
                                });
                            let URL = "";
                            if (age_now - 1 > 6) URL = "https://i.imgur.com/lTnqh96.gif";
                            else URL = "https://i.imgur.com/UWNguNK.gif";
                            const embed = new EmbedBuilder()
                                .setTitle(`Exercise: `)
                                .setColor("Random")
                                .setImage(URL)
                                .addFields({ name: 'Age: ', value: (`${age_now - 1} => ${age_now}`).toString(), inline: true });
                            interaction.followUp({ embeds: [embed] });
                        }
                    }
                    else if (customId == "code") {
                        let hungry_now = parseInt(await PlayerData(PlayerId, "pet_hungry"));
                        let age_now = parseInt(await PlayerData(PlayerId, "age"));

                        if (hungry_now < 1) {
                            const embed = new EmbedBuilder()
                                .setTitle(`沒有體力了...`)
                                .setColor("Random")
                            interaction.followUp({ embeds: [embed] });
                        } else {

                            hungry_now -= 1;
                            age_now += 1;

                            UpdatePlayer(PlayerId, "pet_hungry", hungry_now)
                                .then((Success) => {
                                    if (!Success) {
                                        console.error(`Failed to update ${PlayerId}`);
                                    }
                                });

                            UpdatePlayer(PlayerId, "age", age_now)
                                .then((Success) => {
                                    if (!Success) {
                                        console.error(`Failed to update ${PlayerId}`);
                                    }
                                });

                            const embed = new EmbedBuilder()
                                .setTitle(`Code: `)
                                .setColor("Random")
                                .setImage(`https://i.imgur.com/heuying.gif`)
                                .addFields({ name: 'Energy', value: `${hungry_now - 1} => ${hungry_now}`.toString(), inline: true });
                            interaction.followUp({ embeds: [embed] })
                        }
                    }
                    else if (customId == "feed") {
                        let foods_now = parseInt(await PlayerData(PlayerId, "foods"));
                        let hungry_now = parseInt(await PlayerData(PlayerId, "pet_hungry"));
                        let age_now = parseInt(await PlayerData(PlayerId, "age"));

                        if (foods_now < 1) {
                            const embed = new EmbedBuilder()
                                .setTitle(`沒有食物了...`)
                                .setColor("Random")
                            interaction.followUp({ embeds: [embed] });
                        } else {

                            foods_now -= 1;
                            hungry_now += 1;
                            age_now += 1;

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

                            UpdatePlayer(PlayerId, "age", age_now)
                                .then((Success) => {
                                    if (!Success) {
                                        console.error(`Failed to update ${PlayerId}`);
                                    }
                                });
                            let URL = "";
                            if (age_now - 1 > 6) URL = "https://i.imgur.com/1gRNebX.gif";
                            else URL = "https://i.imgur.com/1O4cla2.gif";
                            const embed = new EmbedBuilder()
                                .setTitle(`Feed: `)
                                .setColor("Random")
                                .setImage(URL)
                                .addFields({ name: 'hungry', value: `${hungry_now - 1} => ${hungry_now}`.toString(), inline: true });
                            interaction.followUp({ embeds: [embed] })
                        }
                    }
                    //關
                    collector.stop();

                });
            });
    }
};