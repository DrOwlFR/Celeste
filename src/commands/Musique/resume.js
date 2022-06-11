const { Command } = require("sheweny");

module.exports = class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "resume",
            description: "Remet la musique.",
            category: "Musique",
            usage: "resume",
            examples: ["resume"],
        });
    }

    async execute(interaction) {

        const { member } = interaction;
        const voiceChannel = member.voice.channel;
        const queue = await this.client.distube.getQueue(voiceChannel);

        if (!queue) return interaction.reply("<:shield_cross:904023640453050438> Il n'y a pas de musique à remettre.");

        await queue.resume(voiceChannel);
        return interaction.reply("⏯ Et c'est repartiiii !");

    }
};