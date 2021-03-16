const Discord = require('discord.js');
const secrets = require('./config/secrets.json');
const { red } = require('chalk');
const client = new Discord.Client({ 
	presence: { activity: { name: "Chat | st!help", type: "WATCHING" }, 
	status: "online"
}});

// path var 
client.root = `${process.cwd()}/src`;

// collections
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.cooldown = new Discord.Collection();

// json files
client.config = require('./config/config.json');
client.embed = require('./config/embeds.json');
client.colors = require('./config/colors.json');
client.owners = require('./config/owners.json');

// add folder controllers
['commandController', 'eventController'].forEach(controller => {
	require(`./controllers/${controller}`)(client, Discord);
});

// error handling + handle regular/alpha login
process.on("unhandledRejection", e => console.error(`${red('ERROR')} ${e}`));
secrets.alphaState ? client.login(secrets.alphaDiscToken) : client.login(secrets.discordToken);
