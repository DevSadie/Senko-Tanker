const Discord = require('discord.js');
const secrets = require('./config/secrets.json');
const client = new Discord.Client({
	presence: {
		activity: { name: "Chat | st!help", type: "WATCHING" },
		status: "online"
	}, disableMentions: "everyone"
});

// create winston
const winston = require('winston');
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: './logs/combined.log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

// path var + modules + client
client.root = `${process.cwd()}/src`;
client.logger = logger;

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
process.on("unhandledRejection", error => logger.log('error', error));
secrets.alphaState ? client.login(secrets.alphaDiscToken) : client.login(secrets.discordToken);