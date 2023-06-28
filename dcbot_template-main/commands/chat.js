const { Configuration, OpenAIApi } = require('openai');
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Chat with The Professor')
    .addStringOption(option =>
    option.setName('input')
    .setDescription('What are you wondering?')
    .setRequired(true)),

    async execute(client, interaction) {
        await interaction.deferReply()
        const prompt = `${interaction.options.getString('input')}`;
        const configuration = new Configuration({
            apiKey: process.env.APIKEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: prompt,
        },],
        });
        const responseMessage = '> ' + interaction.options.getString('input') + '\n' + response.data.choices[0].message.content;
        await interaction.editReply(responseMessage);
    },};
