const readlineSync = require("readline-sync");
const api = require("./lib/api.js");

(async () => {
  while (true) {
    const user_input = readlineSync.question("Prompt: ");
    const response = await api.callOpenAi(user_input);
    console.log(response);
  }
})();
