const { Command } = require("sheweny");

module.exports = class AutoplayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "autoplay",
            description: "Active le mode auto, une fois la file d'attente vide le bot va trouver d'autres musiques tout seul.",
            category: "Musique",
            usage: "autoplay",
            examples: ["autoplay"],
        });
    }

    async execute(interaction) {

        const { member } = interaction;
        const voiceChannel = member.voice.channel;
        const queue = await this.client.distube.getQueue(voiceChannel);
        if (!queue) return interaction.reply("<:shield_cross:904023640453050438> Il n'y a pas de musique dans la file d'attente l'ami !");

        let mode = await queue.toggleAutoplay(voiceChannel);
        return interaction.reply(`🔃 Mode Autoplay : **${mode ? "On" : "Off"}**`);

    }
};