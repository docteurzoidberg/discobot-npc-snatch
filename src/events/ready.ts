/* eslint-disable @typescript-eslint/no-explicit-any */
module.exports = {
  name: "ready",
  once: true,
  async execute(app) {
    const guilds = app.client.guilds.cache;
    const serverArray: Array<any> = [];

    //populate server names and guild ids
    guilds.forEach(async (guild) => {
      //in cache ?
      if (!guild.available) {
        //fetch
        await guild.fetch();
      }
      serverArray.push({
        name: guild.name,
        id: guild.id,
      });
    });

    const serverList = serverArray.map((server) => {
      return `${server.name} (${server.id})`;
    });

    app.logger.info(`NPC-Snatch v${app.version} ready !`);
    app.logger.info(
      `Logged in as ${app.client.user.tag} on ${guilds.size
      } servers: ${serverList.join(", ")}`
    );
    if (app.invisible) {
      app.logger.warn("Bot status set to invisible !");
      app.client.user.setStatus("invisible");
    }
  },
};
