const { Event } = require("sheweny");

module.exports = class FinishEvent extends Event {
    constructor(client) {
        super(client, "finish", {
            description: "File d'attente terminée.",
            emitter: client.distube,
        });
    }

    execute(queue) {

        queue.textChannel.send({
            embeds: [
                this.client.functions.embed()
                    .setTitle("Fini !")
                    .setDescription(`File d'attente terminée. Je fais une p'tite pause !`)
            ]
        });

    }
};