const { ShewenyClient } = require("sheweny");
const { embed } = require("./util/functions");
const { DISCORD_TOKEN } = require("./util/config");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_PRESENCES"],
  admins: ["158205521151787009"],
  allowedMentions: {
    repliedUser: false,
  },
  managers: {
    commands: {
      directory: "./commands",
      autoRegisterApplicationCommands: true,
      guildId: ["467310144901087233"],
      default: {
        type: "SLASH_COMMAND",
        cooldown: 3,
        channel: "GUILD"
      }
    },
    events: {
      directory: "./events",
    },
    buttons: {
      directory: "./interactions/buttons",
    },
    selectMenus: {
      directory: "./interactions/selectmenus",
    },
    inhibitors: {
      directory: "./inhibitors",
    },
  },
  mode : "development", 
});

client.functions = {
  embed: embed,
}

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  emptyCooldown: 180, // secondes
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]
});
module.exports = client;

client.login(DISCORD_TOKEN);