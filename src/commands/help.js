module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    category: 'Bot',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args, client, Discord) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            let commandListEmbed = new Discord.MessageEmbed()
                .setColor(client.colors.green)
                .setTitle('Help')
                .setDescription(`\nYou can send \`${client.config.prefix}help [command name]\` to get info on a specific command!`)
                // fields for everyone commands
                .addField('👥 For Everyone', 'Everyone can use these commands')
                .addFields(
                    { name: '🎉 Fun', value: commands.filter(command => command.category = 'Fun').then((commands) => commands.map(command => command.name).join(', ')), inline: true },
                    { name: '🤖 Bot', value: commands.filter(command => command.category = 'Bot').then((commands) => commands.map(command => command.name).join(', ')), inline: true },
                    { name: '⚙ Utilities', value: commands.filter(command => command.category = 'Utilities').then((commands) => commands.map(command => command.name).join(', ')), inline: true },
                )
                // seperator
                .addField('\U200B','\U200B')
                // fields for dev commands
                .addField('👤 For Developers', 'Only a select few can run these')
                .addfields(
                    { name: '👩🏼‍💻 Dev', value: commands.filter(command => command.category = 'Dev').then((commands) => commands.map(command => command.name).join(', ')), inline: true },
                )
                .setFooter(client.embed.name, client.embed.logo);

            data.push(commandListEmbed);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    client.logger.log('error', error);
                    message.reply({
                        embed: {
                            color: client.colors.red,
                            title: 'Could not DM',
                            description: 'It seems like I can\'t DM you! Do you have DMs disabled?',
                            timestamp: new Date(),
                            footer: {
                                text: client.embed.name,
                                icon_url: client.embed.logo,
                            },
                        },
                    });
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply({
                embed: {
                    color: client.colors.red,
                    title: 'Not Found',
                    description: 'That command does not exist!',
                    timestamp: new Date(),
                    footer: {
                        text: client.embed.name,
                        icon_url: client.embed.logo,
                    },
                },
            });
        }

        let commandDetailEmbed = new Discord.MessageEmbed()
            .setColor(client.colors.green)
            .setTitle('Help for requested command')
            .setDescription(`Previewing details on a specific command.`)
            .addFields(
                { name: 'Name', value: command.name },
                { name: 'Description', value: command.description || 'No description' },
                { name: 'Category', value: command.category || 'No Category' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Cooldown', value: `${command.cooldown || 3} second(s)` },
                { name: 'Usage', value: `${client.config.prefix}${command.name} ${command.usage}` || 'No usage' },
                { name: 'Permissions', value: command.permssions || 'Anyone can use this command' },
                { name: 'Usable in DMs', value: command.guildOnly ? 'No' : 'Yes' }
            )
            .setTimestamp()
            .setAuthor(client.embed.name, client.embed.log, client.embed.url)
            .setFooter('[] means optional, <> means required. Do not type these out.');

        data.push(commandDetailEmbed);
        message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply(`I\'ve sent you a DM with info on ${name}!`);
            })
            .catch(error => {
                client.logger.log('error', error);
                message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
            });
    },
};