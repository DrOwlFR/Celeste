const { Command } = require("sheweny");

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            description: "Affiche la file d'attente des musiques.",
            category: "Musique",
            usage: "queue",
            examples: ["queue"],
        });
    }

    async execute(interaction) {

        const { member } = interaction;
        const voiceChannel = member.voice.channel;
        const queue = await this.client.distube.getQueue(voiceChannel);

        if (!queue) return interaction.reply("<:shield_cross:904023640453050438> Il n'y a pas de musique dans ma liste d'attente l'ami !");

        return interaction.reply({
            embeds: [
                this.client.functions.embed()
                    .setTitle("🎶 Liste des musiques")
                    .setDescription(`${queue.songs.map((song, id) => `\n**${id + 1}**. ${song.name} - \`${id + 1 === 1 ? `${queue.formattedCurrentTime}/` : ""}${song.formattedDuration}\``)}`)
            ]
        });

    }
};