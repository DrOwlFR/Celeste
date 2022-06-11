const { Event } = require("sheweny");

module.exports = class AddlistEvent extends Event {
    constructor(client) {
        super(client, "addList", {
            description: "Playlist ajoutée à la file d'attente.",
            emitter: client.distube,
        });
    }

    execute(queue, playlist) {

        const status = queue =>
            `Volume : \`${queue.volume}%\` | Filtre : \`${queue.filters.join(", ") || "Off"}\` | Boucle : \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
            }\` | Autoplay : \`${queue.autoplay ? "On" : "Off"}\``

        queue.textChannel.send({
            embeds: [
                this.client.functions.embed()
                    .setColor("GREEN")
                    .setTitle("<:plus:904455525838766170> Playlist ajoutée à la file d'attente")
                    .setDescription(`**${playlist.name}** - (${playlist.songs.length} songs)\n${status(queue)}`)
            ]
        });

    }
};