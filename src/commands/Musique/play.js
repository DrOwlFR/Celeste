const { Command } = require("sheweny");

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            description: "Joue une musique grâce au nom ou à un lien vers la musique.",
            category: "Musique",
            usage: "play [nom/lien]",
            examples: ["play i'm blue", "play https://www.youtube.com/watch?v=BinWA0EenDY"],
            options: [{
                name: "musique",
                type: "STRING",
                description: "Lien ou nom de la musique que vous souhaitez écouter.",
                required: true
            }]
        });
    }

    async execute(interaction) {

        const { options, member, guild, channel } = interaction;
        const voiceChannel = member.voice.channel;
        const botVoiceChannel = guild.me.voice.channelId;

        if (!voiceChannel) return interaction.reply({ content: "<:shield_cross:904023640453050438> Eh ! Vous devez être dans un salon pour exécuter cette commande !", ephemeral: true });
        if (botVoiceChannel && voiceChannel.id !== botVoiceChannel) return interaction.reply({ content: `<:right_green_arrow:904023638817275986> Je joue déjà dans le salon <#${botVoiceChannel}>, venez donc !`, ephemeral: true })

        this.client.distube.playVoiceChannel(voiceChannel, options.getString("musique"), { textChannel: channel, member: member });
        return interaction.reply("🎶 Demande de musique reçue, attendez l'ami, je cherche le disque...");

    }
};