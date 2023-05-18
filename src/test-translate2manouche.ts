/* eslint-disable no-constant-condition */
import * as readlineSync from "readline-sync";
import * as api from "./lib/openai-gpt";

console.log('Tester la traduction en manouche.\nSaisir un message et valider avec la touche "Entrée". pour quitter tapper exit, ou appuyer sur "Ctrl+C"');

(async () => {
  while (true) {
    const user_input = readlineSync.question("Message> ");
    if (user_input.toLowerCase() === "exit" || user_input.toLowerCase() === "quit") {
      process.exit(0);
    }
    const response = await api.translateToManouche(user_input);
    console.log(response);
  }
})();
