const { Event } = require("sheweny");

module.exports = class PlaySongEvent extends Event {
    constructor(client) {
        super(client, "playSong", {
            description: "Client is logged in",
            once: true,
            emitter: client.distube,
        });
    }

    execute(queue, song) {

        const status = queue =>
            `Volume : \`${queue.volume}%\` | Filtre : \`${queue.filters.join(", ") || "Off"}\` | Boucle : \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
            }\` | Autoplay : \`${queue.autoplay ? "On" : "Off"}\``

        queue.textChannel.send({
            embeds: [
                this.client.functions.embed()
                    .setTitle("🎶 En train de jouer")
                    .setDescription(`**${song.name}** - \`${song.formattedDuration}\`\nDemandée par : ${song.user}\n${status(queue)}`)
            ]
        });

    }
};