const { Command } = require("sheweny");

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stop",
            description: "Arrête la musique.",
            category: "Musique",
            usage: "stop",
            examples: ["stop"],
        });
    }

    async execute(interaction) {

        const { member } = interaction;
        const voiceChannel = member.voice.channel;
        const queue = await this.client.distube.getQueue(voiceChannel);
        if (!queue) return interaction.reply("<:shield_cross:904023640453050438> Il n'y a pas de musique en cours ni dans la queue l'ami !");

        await queue.stop(voiceChannel);
        return interaction.reply("⏹ Les musiques ont été stoppées avec succès !");
        

    }
};