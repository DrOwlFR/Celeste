const { Command } = require("sheweny");

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: "skip",
            description: "Passe à la musique suivante.",
            category: "Musique",
            usage: "skip",
            examples: ["skip"],
        });
    }

    async execute(interaction) {

        const { member } = interaction;
        const voiceChannel = member.voice.channel;
        const queue = await this.client.distube.getQueue(voiceChannel);
        if (!queue) return interaction.reply("<:shield_cross:904023640453050438> Il n'y a pas de musique à suivre l'ami !");
        if (queue.songs.length <= 1 && !queue.autoplay) return interaction.reply("<:shield_cross:904023640453050438> Il n'y a pas de musique à suivre. Je ne peux donc pas skip ! Ajoutez d'autres musiques, ou activez l'autoplay pour pouvoir skip.");

        await queue.skip(voiceChannel);
        return interaction.reply("⏭ Musique skip avec succès !");

    }
};