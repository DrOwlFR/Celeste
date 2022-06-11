const { Command } = require("sheweny");

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pause",
            description: "Met en pause la musique",
            category: "Musique",
            usage: "pause",
            examples: ["pause"],
        });
    }

    async execute(interaction) {

        const { member } = interaction;
        const voiceChannel = member.voice.channel;
        const queue = await this.client.distube.getQueue(voiceChannel);
        if (!queue) return interaction.reply("<:shield_cross:904023640453050438> Il n'y a pas de musique en cours l'ami !");

        await queue.pause(voiceChannel);
        return interaction.reply("⏸ La musique a été mise en pause avec succès !");

    }
};