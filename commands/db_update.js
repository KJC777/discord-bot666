const { SlashCommandBuilder } = require("discord.js");
const { AddPlayer, UpdatePlayer, SearchPlayer, InitDb, PlayerData } = require("./../Modules/Database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("db_update")
        .setDescription("Update DB")
        .addStringOption((option) =>
            option.setName("id").setDescription("User ID").setRequired(true),
        )
        .addStringOption((option) =>
            option.setName("type").setDescription("...").setRequired(true),
        )
        .addStringOption((option) =>
            option.setName("value").setDescription("...").setRequired(true),
        ),
    async execute(client, interaction) {
        // const PlayerId = interaction.user.id;

        // const start_money = 500;
        // const start_pet_hungry = 0;
        // const start_pet_fatigue = 0;
        // const start_age = 0;
        // const start_foods = 0;
        // SearchPlayer(id)
        // .then((Result) => {
        //     if (Result.length == 0) {
        //         AddPlayer(id, start_money, start_pet_hungry, start_pet_fatigue, start_age, start_foods)
        //             .then((Success) => {
        //                 if (!Success) {
        //                     console.error(`Failed to add ${id} to DB`);
        //                 }
        //             });
        //     } else {
        //         //...  
        //     }
        // });

        let id = interaction.options.getString("id");
        let type = interaction.options.getString("type");
        let value = interaction.options.getString("value");
        
        UpdatePlayer(id, type, value)
                            .then((Success) => {
                                if (!Success) {
                                    console.error(`Failed to update ${id}`);
                                }
                            });

        interaction.reply(type + ": " + (await PlayerData(id, type)).toString());
    },
};
