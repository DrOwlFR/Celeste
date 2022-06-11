const { Command } = require("sheweny");

module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            description: "Modifie le volume du bot.",
            category: "Musique",
            usage: "volume [pourcentage]",
            examples: ["volume 10", "volume 42"],
            options: [{
                name: "pourcentage",
                type: "NUMBER",
                description: "Pourcentage du volume.",
                required: true
            }]
        });
    }

    async execute(interaction) {

        const { options, member } = interaction;
        const voiceChannel = member.voice.channel;
        const volume = options.getNumber("pourcentage");

        if (volume > 100 || volume < 1) return interaction.reply("<:shield_cross:904023640453050438> Vous êtes fou ! Je ne peux pas mettre le volume du son au dessus de 100% ou en dessous de 1% !");

        this.client.distube.setVolume(voiceChannel, volume);
        return interaction.reply(`🔊 Volume actuel modifié pour \`${volume}%\` !`);

    }
};