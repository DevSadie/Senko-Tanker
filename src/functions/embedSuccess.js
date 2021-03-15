module.exports = (client, message) => {
    function embedSuccess (title, description) {
        message.reply({
            embed: {
                color: client.colors.green,
                title: title,
                description: description,
                timestamp: new Date(),
                footer: {
                    text: client.embed.name,
                    icon_url: client.embed.logo,
                },
            },
        });
    }
}