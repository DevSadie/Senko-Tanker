const Discord = require('discord.js');
const { discordToken } = require('./config/secrets.json');
const { red } = require('chalk');
const client = new Discord.Client({ presence: { activity: { name: "Chat | st!help", type: "WATCHING" }, status: "online" } });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.config = require('./config/config.json');
client.colors = require('./config/colors.json');

['commandController', 'eventController'].forEach(controller => {
	require(`./controllers/${controller}`)(client, Discord);
});

process.on("unhandledRejection", e => console.error(`${red('ERROR')} ${e}`));

client.login(discordToken);