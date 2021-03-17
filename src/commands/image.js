const scraper = require('images-scraper');
const scraperClient = new scraper({
    puppeteer: {
        headless: true,
    }
});

module.exports = {
    name: 'image',
    description: 'Get an image from Google.',
    category: 'Fun',
    aliases: ['img', 'google'],
    args: true,
    usage: '<search query>',
    cooldown: 20,
    async execute(message, args, client, Discord) {
        const imgQuery = args.join(' ');
        const imgResults = await scraperClient.scrape(imgQuery, 1).catch((error) => {
            client.logger.log(`${red('IMAGE ERROR:')}:`, error);
        }); 

        const imgEmbed = new Discord.MessageEmbed()
            .setColor(client.colors.green)
            .setTitle('Image found!')
            .setURL(`https://google.com/search?q=${args.join('%20')}`)
            .addFields(
                { name: 'Search Query', value: imgQuery },
            )
            .setAuthor(message.author.username, message.author.avatarURL({ format: "png", dynamic: true }))
            .setImage(imgResults[0].url);

        message.channel.send(imgEmbed)
    }
}