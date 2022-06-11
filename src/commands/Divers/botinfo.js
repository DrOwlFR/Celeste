const { Command } = require("sheweny");
const { version } = require("../../../package.json");
const { dependencies } = require("../../../package.json");
var os = require("os");


module.exports = class BotInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "botinfo",
            description: "Donne les infos sur le bot.",
            category: "Divers",
        });
    }

    async execute(interaction) {
        
        const Bot = this.client;

        const readyAtDate = new Date(Bot.readyAt);
        const readyAtDay = new Intl.DateTimeFormat('fr-FR', { weekday: "long" }).format(readyAtDate);
        const readyAtMonth = new Intl.DateTimeFormat('fr-FR', { month: "long" }).format(readyAtDate);
        const readyAtYear = new Intl.DateTimeFormat('fr-FR', { year: "numeric" }).format(readyAtDate);
        const readyAtDateFR = `${readyAtDay} ${readyAtDate.getDate()} ${readyAtMonth} ${readyAtYear} à ${readyAtDate.getHours()}h${readyAtDate.getMinutes()}`;

        const createdAtDate = new Date(Bot.user.createdAt);
        const createdAtDay = new Intl.DateTimeFormat('fr-FR', { weekday: "long" }).format(createdAtDate);
        const createdAtMonth = new Intl.DateTimeFormat('fr-FR', { month: "long" }).format(createdAtDate);
        const createdAtYear = new Intl.DateTimeFormat('fr-FR', { year: "numeric" }).format(createdAtDate);
        const createdAtDateFR = `${createdAtDay} ${createdAtDate.getDate()} ${createdAtMonth} ${createdAtYear} à ${createdAtDate.getHours()}h${createdAtDate.getMinutes()}`;

        const uptime = parseInt(this.client.readyTimestamp / 1000)
        const VraiUtilisateurs = this.client.users.cache.filter(user => !user.bot);
        const Salons = this.client.channels.cache.filter(channel => channel.type !== "GUILD_CATEGORY");

        const usedRAM = os.totalmem() - os.freemem(), totalRAM = os.totalmem();
        const getUsedRAMPercentage = ((usedRAM / totalRAM) * 100).toFixed(2) + '%';
        const usedRAMDisplay = (usedRAM / Math.pow(1024, 3)).toFixed(2);
        const totalRAMDisplay = (totalRAM / Math.pow(1024, 3)).toFixed(2);

        const cpus = os.cpus();

        return interaction.reply({
            embeds: [
                this.client.functions.embed()
                    .setTitle(`${Bot.user.username} | id : ${Bot.user.id}`)
                    .setThumbnail(Bot.user.displayAvatarURL({ dynamic: true }))
                    .addFields([
                        { name: "🗓️ Date de création", value: `${createdAtDateFR}, <t:1640639059:R>` },
                        { name: "<:developer:904040470294954084> Développeur", value: `${'```'} Grand Maître Hibou#3083 ${'```'}` },
                        { name: "<:high_connection:904023638813052988> Uptime", value: `<t:${uptime}:R>` },
                        { name: "<:download:904023638267797536> En ligne depuis le", value: `${'```'} ${readyAtDateFR} ${'```'}` },
                        { name: "<:verified:904023640062951495> Vérifié", value: `${'```'} ${Bot.user.verified} ${'```'}` },
                        { name: "<:compass:904023639907790870> Serveurs", value: `${'```'} ${Bot.guilds.cache.size} ${'```'}`, inline: true },
                        { name: "<:chat:904023637764493313> Salons", value: `${'```'} ${Salons.size} ${'```'}`, inline: true },
                        { name: "<:members:904023638972456971> Utilisateurs", value: `${'```'} ${VraiUtilisateurs.size} ${'```'}`, inline: true },
                        { name: "<:bot:904023637579935835> Bot", value: `${'```'} v.${version} ${'```'}`, inline: true },
                        { name: "<:nodejs:904042314392035338> Runtime", value: `${'```'} Node.js v.16.8.0 ${'```'}`, inline: true },
                        { name: "<:djs:904042314006147073> API", value: `${'```'} Discord.js v${dependencies["discord.js"]} ${'```'}`, inline: true },
                        { name: "<:sheweny:926450401459458048> Framework", value: `${'```'} Sheweny v${dependencies["sheweny"]} ${'```'}` },
                        { name: "RAM utilisée", value: `${'```'} ${usedRAMDisplay}GB/${totalRAMDisplay}GB | ${getUsedRAMPercentage} ${'```'}`, inline: true },
                        // { name: "CPU", value: ``, inline: true },
                    ]),
            ],
        });
    }
};