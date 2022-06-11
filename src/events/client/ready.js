const { Event } = require("sheweny");
const { version } = require("../../../package.json");

module.exports = class ReadyEvent extends Event {
  constructor(client) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
      emitter: client,
    });
  }

  execute() {
    const trueUsers = this.client.users.cache.filter(user => !user.bot).size;
    const channels = this.client.channels.cache.filter(channel => channel.type !== "GUILD_CATEGORY").size;
    const guilds = this.client.guilds.cache.size;
    const statusList = [
        `${guilds} serveurs.`,
        `${trueUsers} utilisateurs.`,
        `la v.${version}`
    ];

    let index = 0;
    setInterval(() => {
        if (index === statusList.length) index = 0;
        let status = statusList[index];

        this.client.user.setPresence({ activities: [{ name: `${status}`, type: "WATCHING" }], status: "online" });
        index++;
    }, 7000);

    return console.log(`Le bot musique est connecté en tant que ${this.client.user.tag} ! ${guilds} serveurs. ${trueUsers} utilisateurs et ${channels} salons.`);
  }
};