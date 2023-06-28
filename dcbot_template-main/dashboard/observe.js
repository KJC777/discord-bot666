const path = require("node:path");
const { Client, ChannelType, Message } = require("discord.js");
const Express = require("express");
const { tunnel } = require("cloudflared");

/**
 * 建立一個 Server 來觀察 Bot 的狀態
 * @param {Client} client
 */
function observe(client) {
    const app = Express();

    app.get("/api/bot", (req, res) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.json({
            status: client.user?.presence?.status || "offline",
            bot: client.user,
            guilds: get_guilds(client),
        });
    });

    // 使用 Server Sent Events 串流資料
    app.get("/api/log", (req, res) => {
        res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        /**
         * @param {Message} message
         */
        const listener = (message) => {
            const packet = {
                content: message.content,
                author: { name: message.member.displayName, avatar: message.author.avatarURL() },
                channel: message.channel.id,
                guild: message.guild.id,
                at: message.createdAt,
            };
            res.write(`data: ${JSON.stringify(packet)}\n\n`);
        };

        client.on("messageCreate", listener);

        req.on("close", () => {
            client.off("messageCreate", listener);
        });
    });

    app.get("/api/ping", (req, res) => {
        res.send("pong");
    });

    app.use(Express.static(path.join(__dirname, "app"), { cacheControl: false }));

    return {
        start: () => start(app),
    };
}

/**
 * @param {Express.Application} app
 */
async function start(app) {
    const port = Math.round(Math.random() * 50000) + 10000;
    await new Promise((resolve) => app.listen(port, resolve));
    const t = tunnel({ "--url": `localhost:${port}` });
    return t.url;
}

/**
 * @param {Client} client
 */
function get_guilds(client) {
    return client.guilds.cache.map((guild) => {
        return {
            id: guild.id,
            name: guild.name,
            icon: guild.iconURL(),
            channels: guild.channels.cache
                .filter((c) => c.guildId === guild.id && c.type === ChannelType.GuildText)
                .map((channel) => {
                    return {
                        id: channel.id,
                        name: channel.name,
                    };
                }),
        };
    });
}

module.exports = observe;
