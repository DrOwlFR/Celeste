const { Command } = require("sheweny");

module.exports = class ShuffleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "shuffle",
            description: "Lit la file d'attente de manière aléatoire.",
            category: "Musique",
            usage: "shuffle",
            examples: ["shuffle"],
        });
    }

    async execute(interaction) {

        const { member } = interaction;
        const voiceChannel = member.voice.channel;
        const queue = await this.client.distube.getQueue(voiceChannel);
        if (!queue) return interaction.reply("<:shield_cross:904023640453050438> Il n'y a pas de musique dans la file d'attente l'ami !");

        await queue.shuffle(voiceChannel);
        return interaction.reply("🔀 Le mode aléatoire a été activé !");

    }
};