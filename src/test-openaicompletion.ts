
import * as readlineSync from "readline-sync";
import * as openai from "./lib/openai-gpt";

(async () => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const user_input = readlineSync.question("Prompt: ");
    const response = await openai.callCompletion(user_input);
    console.log(response);
  }
})();
