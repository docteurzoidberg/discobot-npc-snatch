import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import * as api from "../lib/openai-gpt";

const commands = new SlashCommandBuilder()
  .setName("trad")
  .setDescription("Traduire du texte")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("chti")
      .setDescription("Traduire en ch'ti")
      .addStringOption((option) =>
        option
          .setName("texte")
          .setDescription("Texte à traduire")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("fr")
      .setDescription("Traduire en français")
      .addStringOption((option) =>
        option
          .setName("texte")
          .setDescription("Texte à traduire")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("manouche")
      .setDescription("Traduire en manouche")
      .addStringOption((option) =>
        option
          .setName("texte")
          .setDescription("Texte à traduire")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("murloc")
      .setDescription("Traduire en murloc")
      .addStringOption((option) =>
        option
          .setName("texte")
          .setDescription("Texte à traduire")
          .setRequired(true)
      )
  );

/* COMMANDS */
const commandTranslate = async (app, interaction) => {
  const subcommand = interaction.options.getSubcommand();
  const text = interaction.options.getString("texte");

  await interaction.deferReply({ content: "Ok, je traduis...", ephemeral: true });

  let response = "";
  let languageName = "";

  switch (subcommand) {
    case "chti":
      response = await api.translateToChtimi(text);
      languageName = "ch'ti";
      break;
    case "fr":
      response = await api.translateToFr(text);
      languageName = "français";
      break;
    case "manouche":
      response = await api.translateToManouche(text);
      languageName = "manouche";
      break;
    case "murloc":
      response = await api.translateToMurloc(text);
      languageName = "murloc";
      break;
    default:
      app.logger.error(`Unknown subcommand ${subcommand}`);
      await interaction.editReply({
        content: `Erreur, la sous-commande ${subcommand} n'existe pas`, ephemeral: true
      });
      break;
  }

  interaction.deleteReply();
  //todo: embed

  const msgEmbed = new EmbedBuilder()
    .setTitle("Traduction en " + languageName)
    .setDescription(`**Message**: ${text.indexOf('\n') > 0 ? '\n' + text : text}\n**Traduction**:${response.indexOf('\n') > 0 ? '\n' + response : response}`)
    .setFooter({ text: `Demandé par ${interaction.user.username}` })
    .setTimestamp(new Date());

  interaction.channel.send({
    content: `${interaction.user} a demandé une traduction!`,
    embeds: [msgEmbed]
  });
};

module.exports = {
  data: commands,
  async execute(app, interaction) {
    const command = interaction.commandName;
    switch (command) {
      case "trad":
        await commandTranslate(app, interaction);
        break;
      default:
        app.logger.error(`Unknown command ${command}`);
        break;
    }
  },
};
