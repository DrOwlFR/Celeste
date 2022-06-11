const { Event } = require("sheweny");

module.exports = class ErrorEvent extends Event {
    constructor(client) {
        super(client, "error", {
            description: "Erreur dans le module distube.",
            emitter: client.distube,
        });
    }

    execute(channel, e) {

        channel.send({
            embeds: [
                this.client.functions.embed()
                    .setColor("RED")
                    .setTitle("Erreur !")
                    .setDescription(`<:shield_cross:904023640453050438> | Une erreur est survenue : ${e.toString().slice(0, 1974)}`)
            ]
        }),
        console.error(e)

    }
};