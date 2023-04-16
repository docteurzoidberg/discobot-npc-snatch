const api = require("../lib/api");
module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    //return false
    return;

    console.log("messageCreate");
    //ignore bot messages
    if (message.author.bot) return;
    const username = message.author.username;
    console.log("username", username);
    if (message.partial) {
      console.log("message is partial");
      await message.fetch();
    }
    const content = message.content;

    //call openai api
    try {
      const response = await api.translateWithOpenAi(content);
      if (!response) return;
      //si response contient RIEN, ne rien faire
      if (response === "RIEN") return;
      const responseMessage = `Je pense que ce que **${username}** souhaitait exprimer était plutot ceci: \n${response}`;
      message.reply({ content: responseMessage });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
};
