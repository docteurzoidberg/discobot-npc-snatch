require('dotenv').config();

const logger = require('pino')({ level: process.env.LOG_LEVEL || 'info' });
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commandsDir = __dirname + '/commands';
const commands = [];
const commandFiles = fs
  .readdirSync(commandsDir)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`${commandsDir}/${file}`);
  commands.push(command.data.toJSON());
}

const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || false;
if (!DISCORD_GUILD_ID) {
  logger.fatal('DISCORD_GUILD_ID environment variable not set');
  process.exit(1);
}

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || false;
if (!DISCORD_CLIENT_ID) {
  logger.fatal('DISCORD_CLIENT_ID environment variable not set');
  process.exit(1);
}

const BOT_TOKEN = process.env.BOT_TOKEN || false;
if (!BOT_TOKEN) {
  logger.fatal('BOT_TOKEN environment variable not set');
  process.exit(1);
}

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

(async () => {
  try {
    logger.info('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),
      { body: commands }
    );
    logger.info('Successfully reloaded application (/) commands.');
  } catch (error) {
    logger.fatal(error);
  }
})();
