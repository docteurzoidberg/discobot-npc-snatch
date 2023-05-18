//this module handles all the interactions
module.exports = {
  name: "interactionCreate",
  async execute(app, interaction) {
    //command
    if (interaction.isMessageContextMenuCommand()) {
      app.logger.info(
        `<${interaction.user.tag
        }> used command ${interaction.commandName.toUpperCase()} in #${interaction.channel.name.toUpperCase()}`
      );

      const command = app.commands.get(interaction.commandName);
      if (!command) return;
      if (!command.execute) return;
      try {
        await command.execute(app, interaction);
      } catch (error) {
        app.logger.error(error);
        await interaction.reply({
          content:
            "Erreur lors de l'execution de la commande. (Dire a l'admin de look les logs) !",
          ephemeral: true,
        });
      }
    }
    //unhandled interaction
    else {
      app.logger.warn(
        `<${interaction.user.tag
        }> in #${interaction.channel.name.toUpperCase()} triggered an unhandled interaction`
      );
    }
    return;
  },
};
