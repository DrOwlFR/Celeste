const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Ping Pong",
      category: "Divers",
    });
  }

  async execute(interaction) {

    const start = Date.now();
    await interaction.reply("Calcul... <a:load:904057195220598845>");
    const end = Date.now();

    const botLatency = `${'```'}\n ${end - start}ms  ${'```'}`
    const APILatency = `${'```'}\n ${Math.round(interaction.client.ws.ping)}ms  ${'```'}`

    const embed = this.client.functions.embed()
      .setTitle("🏓  Pong !  🏓")
      .addField("🤖  Latence du bot", botLatency, true)
      .addField("💻  Latence de l'API", APILatency, true);

    await interaction.editReply({
      content: null,
      embeds: [embed],
    });

  }
};