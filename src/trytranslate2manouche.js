const readlineSync = require("readline-sync");
const api = require("./lib/api.js");

(async () => {
  while (true) {
    const user_input = readlineSync.question("Your input: ");
    const response = await api.translateToManoucheWithOpenAi(user_input);
    console.log(response);
  }
})();
