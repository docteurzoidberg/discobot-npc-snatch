require("dotenv").config();
const wait = require("node:timers/promises").setTimeout;

// eslint-disable-next-line import/no-extraneous-dependencies
const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { ApplicationCommandType } = require("discord-api-types/v9");

const api = require("../lib/api");

const commands = new ContextMenuCommandBuilder()
  .setName("Trad 〉Français")
  .setType(ApplicationCommandType.Message);

/* COMMANDS */

async function commandTranslate(client, interaction) {
  const targetMessage = interaction.targetMessage;
  //ignore bot messages
  if (targetMessage.author.bot) return;
  if (targetMessage.partial) {
    await targetMessage.fetch();
  }

  interaction.deferReply({ content: "Je traduis...", ephemeral: true });

  try {
    //call openai api

    const messageAuthor = targetMessage.author.username;

    const messageContent = targetMessage.content;
    client.logger.debug("message", messageContent);

    const response = await api.translateToFrWithOpenAi(messageContent);
    client.logger.debug("response", response);

    if (!response) return;
    //si response contient RIEN, ne rien faire
    if (response === "RIEN") return;

    const responseMessage = `Je pense que ce que **${messageAuthor}** souhaitait exprimer était plutot ceci: \n${response}`;

    interaction.targetMessage.reply(responseMessage);

    const loggerMsg = `Traduction du message ${targetMessage.id} demandée par ${interaction.user.username}`;
    client.logger.info(loggerMsg);
    interaction.editReply({
      content: "traduction effectuée !",
      ephemeral: true,
    });
    await wait(3000);
    interaction.deleteReply();
  } catch (error) {
    client.logger.error(error);
  }
}

module.exports = {
  data: commands,
  async execute(client, interaction) {
    await commandTranslate(client, interaction);
  },
};
