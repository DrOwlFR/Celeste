const { Command } = require("sheweny");

module.exports = class RelatedSongCommand extends Command {
    constructor(client) {
        super(client, {
            name: "relatedsong",
            description: "Ajouter à la file d'attente une musique en rapport avec celle en cours.",
            category: "Musique",
            usage: "relatedsong",
            examples: ["relatedsong"],
        });
    }

    async execute(interaction) {

        const { member } = interaction;
        const voiceChannel = member.voice.channel;
        const queue = await this.client.distube.getQueue(voiceChannel);
        if (!queue) return interaction.reply("<:shield_cross:904023640453050438> Il n'y a pas de musique dans la file d'attente l'ami !");

        await queue.addRelatedSong(voiceChannel);
        return interaction.reply("🔜 Une musique en rapport avec l'actuelle a été ajoutée.");

    }
};