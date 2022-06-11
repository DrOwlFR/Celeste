const { Command } = require("sheweny");

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            category: "Divers",
            description: "Affiche la liste des commandes, ou de l'aide sur une commande précise.",
            usage: "help <commande>",
            examples: ["help", "help ping"],
            options: [{
                name: "commande",
                description: "Demandez de l'aide pour une commande spécifique",
                type: "STRING",
                autocomplete: true,
            }],
        });
    }

    async execute(interaction) {

        const commands = Array.from(this.client.util.getCommands());
        const embed = this.client.functions.embed()
            .setAuthor({name: "Voici la liste de mes commandes.", iconURL: interaction.user.displayAvatarURL()})
            .setThumbnail(this.client.user.displayAvatarURL());

        if (!interaction.options.getString("commande", false)) {

            embed.setDescription("<:line:904036055345414164><:line:904036055345414164><:line:904036055345414164><:line:904036055345414164><:line:904036055345414164><:line:904036055345414164>");

            const categories = new Set(commands.map((command) => command.category));

            for (let category of categories) {
                const commandInCategory = commands.filter((command) => command.category === category);

                if (!category) category = "Non classée(s)";

                embed.addField(
                    `<:right_blue_arrow:904026423608606762> ${category}`,
                    `${commandInCategory.map(command => `**\`${command.name}\`** : ${command.description}`).join("\r\n")}`,
                );
            }

            embed.addField("<:line:904036055345414164><:line:904036055345414164><:line:904036055345414164><:line:904036055345414164><:line:904036055345414164><:line:904036055345414164>",
                `**\`help <commande>\`** pour des informations sur une commande spécifique.\n\nExemple : **\`help ping\`**`);

            return interaction.reply({ embeds: [embed] });
        }

        const command = commands.filter((cmd) => cmd.name === interaction.options.getString("commande"))[0];

        embed.setAuthor({name: interaction.member.nickname, iconURL: interaction.user.displayAvatarURL()});
        embed.setTitle(`${command.name} ${command.adminsOnly ? "— ⚠️ Dev Only ⚠️" : ""} ${command.userPermissions.toString() ? `— ⚠️ Requiert : *${command.userPermissions}* ⚠️` : ""}`);
        embed.setDescription(`${command.description}`);
        embed.addFields([
            { name: "Utilisation", value: `${command.usage}`, inline: true },
            { name: `${command.examples.length > 1 ? "Exemples" : "Exemple"}`, value: `${command.examples.length > 1 ? `${command.examples.join(" | ")}` : `${command.examples}`}`, inline: true },
            { name: "————————————", value: "{} = sous-commande(s) disponible(s)\n<> = option(s) optionnel(s)\n[] = option(s) obligatoire(s)\n\nNe pas inclure les caractères suivants → <> et [] dans vos commandes." },
        ]);

        if (command.name === "pfc" || command.name === "morpion") embed.addField("⚠️ Cette commande nécessite un préfixe ! ⚠️", `${this.client.managers.commands.prefix}`);

        return interaction.reply({ embeds: [embed] });
    }

    onAutocomplete(interaction) {
        let choices = Array.from(this.client.util.getCommands()).map(cmd => cmd.name);

        interaction
            .respond(choices.map((choice) => ({ name: choice, value: choice })))
            .catch(console.error);
    }
};