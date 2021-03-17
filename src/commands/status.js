module.exports = {
    name: 'status',
    description: 'Change bot status from Discord.',
    category: 'Development',
    args: true,
    usage: '<type> <status>',
    cooldown: '20',
    execute(message, args, client, Discord) {
        if (client.owners.owners.includes(message.author.id)) {
            // set activity type
            if (args[0] === "playing") {
                type = "PLAYING";
            } else if (args[0] === "streaming") {
                type = "STREAMING";
            } else if (args[0] === "listening") {
                type = "LISTENING";
            } else if (args[0] === "watching") {
                type = "WATCHING";
            } else if (args[0] === "competing") {
                type = "COMPETING";
            } else if (args[0] === "reset") {
                client.user.setActivity(`Chat | st!help`, { type: "WATCHING" }); //you can change that to whatever you like
                return message.reply({
                    embed: {
                        color: client.colors.green,
                        title: 'Status Change',
                        description: 'Changed Status Successfully!',
                        timestamp: new Date(),
                        footer: {
                            text: client.embed.name,
                            icon_url: client.embed.logo,
                        },
                    },
                });
            } else {
                return message.reply({
                    embed: {
                        color: client.colors.red,
                        title: 'Error',
                        description: 'Invalid activity type',
                        timestamp: new Date(),
                        footer: {
                            text: client.embed.name,
                            icon_url: client.embed.logo,
                        },
                    },
                });
            }

            // set up the content
            args.shift();
            content = args.join(' ');

            // change presence
            client.user.setPresence({
                activity: {
                    name: content,
                    type: type
                }
            });

            // reply back
            return message.reply({
                embed: {
                    color: client.colors.green,
                    title: 'Status Change',
                    description: 'Changed Status Successfully!',
                    timestamp: new Date(),
                    footer: {
                        text: client.embed.name,
                        icon_url: client.embed.logo,
                    },
                },
            })
        }
        
        else {
            return message.reply({
                embed: {
                    color: client.colors.red,
                    title: 'No Permissions',
                    description: 'You do not have permission to use that command',
                    timestamp: new Date(),
                    footer: {
                        text: client.embed.name,
                        icon_url: client.embed.logo,
                    },
                },
            });
        }
    },
};