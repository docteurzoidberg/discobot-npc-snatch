import { setTimeout as wait } from 'node:timers/promises';
import { ContextMenuCommandBuilder, ApplicationCommandType } from 'discord.js';
import * as api from '../lib/openai-gpt';

const commands = new ContextMenuCommandBuilder()
  .setName("Trad 〉Chtimi")
  .setType(ApplicationCommandType.Message);

/* COMMANDS */

async function commandTranslate(app, interaction) {
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
    app.logger.debug("message: " + messageContent);

    const response = await api.translateToChtimi(messageContent);
    app.logger.debug("response: " + response);

    if (!response) return;
    //si response contient RIEN, ne rien faire
    if (response === "RIEN") return;

    const responseMessage = `Ouais bé j'pinse qu'c'que le ch'ti biloute ${messageAuthor} voulait dire, ch'est qu'.. \n${response}`;

    interaction.targetMessage.reply(responseMessage);

    const loggerMsg = `Traduction du message ${targetMessage.id} demandée par ${interaction.user.username}`;
    app.logger.info(loggerMsg);
    interaction.editReply({
      content: "traduction effectuée !",
      ephemeral: true,
    });
    await wait(3000);
    interaction.deleteReply();
  } catch (error) {
    app.logger.error(error);
  }
}

module.exports = {
  data: commands,
  async execute(app, interaction) {
    await commandTranslate(app, interaction);
  },
};
