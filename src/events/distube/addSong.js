const { Event } = require("sheweny");

module.exports = class AddSongEvent extends Event {
    constructor(client) {
        super(client, "addSong", {
            description: "Musique ajoutée à la file d'attente.",
            emitter: client.distube,
        });
    }

    execute(queue, song) {

        queue.textChannel.send({
            embeds: [
                this.client.functions.embed()
                    .setColor("GREEN")
                    .setTitle("<:plus:904455525838766170> Musique ajoutée à la file d'attente")
                    .setDescription(`**${song.name}** - \`${song.formattedDuration}\`\n Par : ${song.user}`)
            ]
        });

    }
};