const { Event } = require("sheweny");

module.exports = class SearchNoResultEvent extends Event {
    constructor(client) {
        super(client, "searchNoResult", {
            description: "Aucun résultat trouvé pour une musique ou un playlist.",
            emitter: client.distube,
        });
    }

    execute(message, query) {

        message.channel.send({
            embeds: [
                this.client.functions.embed()
                    .setColor("GREY")
                    .setTitle("⛔ Aucun résultat")
                    .setDescription("Aucun résultat trouvé pour :" + query)
            ]
        });

    }
};