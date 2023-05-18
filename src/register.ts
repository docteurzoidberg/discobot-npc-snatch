/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dotenv from 'dotenv';
import { Signale } from 'signale';
dotenv.config();


const logger = new Signale({})

import * as fs from 'fs';

import { REST, Routes } from 'discord.js';


const commandsDir = __dirname + '/commands';
const commands: Array<any> = [];
const commandFiles = fs
  .readdirSync(commandsDir)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
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
