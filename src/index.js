const Discord = require('discord.js');
const { discordToken } = require('./config/secrets.json');
const { green } = require('chalk');

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.cooldown = new Discord.Collection();

client.config = require('./config/config.json');
client.colors = require('./config/colors.json');

['commandController', 'eventController'].forEach(controller => {
	require(`./controllers/${controller}`)(client, Discord);
});

client.on('ready', () => {
	client.user.setActivity('chat.',
	{
		type: 'WATCHING',
	}).then(console.log(`${green('SUCESS')} Set playing status`));
});

client.login(discordToken)