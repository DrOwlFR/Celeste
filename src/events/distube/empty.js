const { Event } = require("sheweny");

module.exports = class EmptyEvent extends Event {
    constructor(client) {
        super(client, "empty", {
            description: "Salon vide.",
            emitter: client.distube,
        });
    }

    execute(queue) {

        queue.textChannel.send({
            embeds: [
                this.client.functions.embed()
                    .setTitle("Salon vide")
                    .setDescription(`Salon vocal vide ! Je quitte la salle...`)
            ]
        });

    }
};