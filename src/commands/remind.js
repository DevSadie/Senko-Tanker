const ms = require('ms')

module.exports = {
    name: "remind",
    category: "Utilities",
    content: "Helps remind you something",
    usage: "remind <time> <reminder>",
    cooldown: 10,
    args: true,
    guildOnly: true,
    async execute(message, args, client, Discord) {
        let time = args[0];
        let user = message.author;
        let reminder = args.splice(1).join(' ')

        const notime = new Discord.MessageEmbed()
            .setColor(client.colors.red)
            .setTitle('Reminders')
            .setDescription(`Please specify the time!`)
            .setFooter(client.embed.name, client.embed.logo)
            .setTimestamp();

        const wrongtime = new Discord.MessageEmbed()
            .setColor(client.colors.red)
            .setTitle('Reminders')
            .setDescription(`Sorry, I only do **d, m, h, or s**.`)
            .setFooter(client.embed.name, client.embed.logo)
            .setTimestamp();

        const reminderembed = new Discord.MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle('Reminders')
            .setDescription(`What do you want to be reminded of?`)
            .setFooter(client.embed.name, client.embed.logo)
            .setTimestamp();

        if (!args[0]) return message.channel.send(notime)
        if (
            !args[0].endsWith("d") &&
            !args[0].endsWith("m") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("s")
        ) return message.channel.send(wrongtime);

        if (!reminder) return message.channel.send(reminderembed);

        const remindertime = new Discord.MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle('Reminders')
            .setDescription(`\**Your reminder will go off in ${time}**`)
            .setColor(client.colors.blue)
            .setTitle('Reminders');

        message.channel.send(remindertime)

        const reminderdm = new Discord.MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle(`Reminder time passed (${time}`)
            .setDescription(`Make sure to \`${reminder}\``)
            .setFooter(client.embed.name, client.embed.logo)
            .setTimestamp();

        setTimeout(async function () {
            try {
                await user.send(reminderdm)
            } catch (err) {
                    
            }

        }, ms(time));
    }
}