module.exports = (client, message) => {
    function embedError (title, description) {
        message.reply({
            embed: {
                color: client.colors.red,
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