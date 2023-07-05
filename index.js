// 如果你搞爛東西，可以參考這個檔案

const { REST, Routes, Collection, Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

// 載入 .env 檔案裡面的環境變數
require("dotenv").config();

// 建立一個新的 Client
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

// 載入所有的 commands
loadAllCommands(client, "./commands");

// 聆聽 commands 或其他的 interaction
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(client, interaction);
    } catch (error) {
        console.error(error);
    }
});

client.once("ready", (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);

/**
 * 載入所有的 commands
 * @param {Client} client Bot 的 Client
 * @param {string} directory commands 目錄的路徑
 */
function loadAllCommands(client, directory) {
    // 將 client.commands 設為一個 Collection，用來儲存所有的 commands
    client.commands = new Collection();
    const commands = [];

    // 讀取 commands 目錄下的所有 js 檔案
    const commandFiles = fs.readdirSync(directory).filter((file) => file.endsWith(".js"));

    // 將每個檔案 require 進來，並且設定到 client.commands 裡面
    for (const file of commandFiles) {
        const command = require(`${directory}/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    // 向 Discord 註冊 commands
    rest.put(Routes.applicationCommands(process.env.BOTID), { body: commands })
        .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
        .catch(console.error);
}

/*
const { Client, GatewayIntentBits } = require("discord.js");
const observe = require("./dashboard/observe");

require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("messageCreate", async (message) => {
    if (message.author.bot === true) {
        return; // 如果是機器人發出的訊息，就不要回覆（避免回覆自己）
    }

    console.log(
        `在 ${message.guild.name} > ${message.channel.name} 收到來自 ${message.member.displayName} 的訊息：${message.content}`,
    );
});

client.once("ready", async (client) => {
    console.log(`${client.user.tag} 已上線！`);
});

client.login(process.env.TOKEN);

observe(client)
    .start()
    .then((url) => console.log(`你可以在 ${url} 觀察 Bot 的狀態`));
*/
