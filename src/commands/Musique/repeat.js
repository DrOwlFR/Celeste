const { Command } = require("sheweny");

module.exports = class RepeatCommand extends Command {
    constructor(client) {
        super(client, {
            name: "repeat",
            description: "Active le mode boucle.",
            category: "Musique",
            usage: "repeat",
            examples: ["repeat"],
            options: [{
                name: "mode",
                type: "NUMBER",
                description: "Mode de boucle que vous souhaitez.",
                required: true,
                choices: [
                    {
                        name: "Désactivé",
                        value: 0,
                    },
                    {
                        name: "Musique",
                        value: 1
                    },
                    {
                        name: "File d'attente",
                        value: 2,
                    }
                ]
            }]
        });
    }

    async execute(interaction) {

        const { options ,member } = interaction;
        const voiceChannel = member.voice.channel;
        const queue = await this.client.distube.getQueue(voiceChannel);
        if (!queue) return interaction.reply("<:shield_cross:904023640453050438> Il n'y a pas de musique dans la file d'attente l'ami !");

        let mode = await this.client.distube.setRepeatMode(queue, options.getNumber("mode"));
        return interaction.reply(`🔃 Mode boucle : **${mode = mode ? mode == 2 ? "Queue" : "Song": "Off"}**`);

    }
};