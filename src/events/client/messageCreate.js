const { Event } = require("sheweny");

module.exports = class ReadyEvent extends Event {
  constructor(client) {
    super(client, "messageCreate", {
      description: "Lorsqu'un message est envoyé.",
      once: false,
      emitter: client,
    });
  }

  execute(message) {

    const words = ["hello", "bonjour", "yo", "bonsoir", "salut", "hey"];
    const messageContent = message.content.toLowerCase();

    for (let x in words) {
        if (messageContent.startsWith(words[x])) message.react("👋");
    }

    if (messageContent.includes("céleste") || messageContent.includes("celeste") || messageContent.includes(this.client.user.id)) {
        if (message.author.bot) return;
        return message.reply("C'est moi ! Que puis-je faire pour vous ? Une p'tite musique ?")
    }
    else if (messageContent.includes("keeper")) {
        if (message.author.bot) return;
        return message.reply("Ah ouais... Le chef... Pas commode celui là ! Mais lui dites pas que j'ai dit ça, hein ?");
    }
    else if (messageContent.includes("midriass") || messageContent.includes("seru")) {
        if (message.author.bot) return;
        return message.reply("Son excellence ! Sarcastique, puissant, j'ai l'impression qu'il nous déteste Keeper et moi...");
    }

  }
};