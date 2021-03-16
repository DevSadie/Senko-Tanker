module.exports = {
    name: 'info',
    description: 'List information about the bot.',
    category: 'Bot',
    aliases: ['about'],
    cooldown: 5,
    execute(message, args, client, Discord) {
        const infoEmbed = new Discord.MessageEmbed()
            .setAuthor(client.embed.name, client.embed.logo, client.embed.url)
            .setColor(client.colors.blue)
            .setTimestamp()
            .setTitle('ℹ About Senko Tanker')
            .setDescription('A (pre-release) multi purpose bot designed to annoy the fuck out of IAmAHuman and MakufonSkifto')
            .addFields(
                { name: '<:4228_discord_bot_dev:727548651001348196> Developers', value: 'DevSadie#9078', inline: true }
            )
        message.channel.send(infoEmbed)
    }
}