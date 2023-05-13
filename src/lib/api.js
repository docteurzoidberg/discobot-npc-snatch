const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config({ path: __dirname + "/../../.env" });
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || false,
});

module.exports = {
  translateToFrWithOpenAi: async (message) => {
    const openai = new OpenAIApi(configuration);
    const messages = [];
    const prompt = `Tu dois moderer en remplacant les messages saisis par des utilisateurs dans un salon de discussion. Voici un exemple message ecris par un francais. Si ce message contient des mots qu'il faut absolument moderer (c'est a dire trop vulgaire, ecrit en style sms entierement, de language manouche, language de rue ou de cité), je souhaite que tu traduises directement le message en language soutenu, en prefixant la réponse par "TRADUCTION:", repond par "RIEN" dans tous les autres cas, ou si le contexte est insuffisant, ou que tu ne comprend pas le message.\n\nMessage:\n`;

    const samples = [
      { user: "Bonjour", bot: "RIEN" },
      { user: "cool", bot: "RIEN" },
      { user: "c'est ok pour moi", bot: "RIEN" },
      { user: "ok c'est bon", bot: "RIEN" },
      { user: "c'est cool", bot: "RIEN" },
      { user: "bof", bot: "RIEN" },
      { user: "ta vu ca?", bot: "RIEN" },
      {
        user: "J'entrave keudal",
        bot: "TRADUCTION: Je ne comprends strictement rien",
      },
      {
        user: "ce type est un narvalo",
        bot: "TRADUCTION: Je penses que cette personne est un guignol",
      },
      {
        user: "bon aller. jme nachave",
        bot: "TRADUCTION: Je crois que c'est le moment ou je vais partir",
      },
      {
        user: "pwet",
        bot: "TRADUCTION: Salut!",
      },
      { user: "mouais", bot: "TRADUCTION: Cela me laisse sceptique." },
      { user: "mwé", bot: "TRADUCTION: Cela me laisse sceptique." },
      { user: "Wesh!", bot: "TRADUCTION: Salut!" },
    ];

    samples.forEach((sample) => {
      messages.push({ role: "user", content: sample.user });
      messages.push({ role: "assistant", content: sample.bot });
    });

    messages.push({ role: "user", content: prompt + message });
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      const completion_text = completion.data.choices[0].message.content;
      if (completion_text.startsWith("TRADUCTION:")) {
        return completion_text.replace("TRADUCTION:", "").trim();
      } else if (completion_text.startsWith("RIEN")) {
        return "RIEN";
      }

      throw new Error("Unexpected response from OpenAI: " + completion_text);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  },
  translateToManoucheWithOpenAi: async (message) => {
    const openai = new OpenAIApi(configuration);
    const messages = [];
    const prompt = `Tu dois traduire en manouche les messages saisis en par des utilisateurs dans un salon de discussion. Voici un exemple message ecris par un francais. Je souhaite que tu traduises directement le message en language manouche, en prefixant la réponse par "TRADUCTION:", repond par "RIEN" dans tous les autres cas, ou si le contexte est insuffisant, ou que tu ne comprend pas le message.\n\nMessage:\n`;

    const samples = [
      {
        user: "je ne comprend rien",
        bot: "TRADUCTION: J'entrave keudal",
      },
      {
        user: "quel abruti",
        bot: "TRADUCTION: c'koi ce narvalo?!",
      },
    ];

    samples.forEach((sample) => {
      messages.push({ role: "user", content: sample.user });
      messages.push({ role: "assistant", content: sample.bot });
    });

    messages.push({ role: "user", content: prompt + message });
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      const completion_text = completion.data.choices[0].message.content;
      if (completion_text.startsWith("TRADUCTION:")) {
        return completion_text.replace("TRADUCTION:", "").trim();
      } else if (completion_text.startsWith("RIEN")) {
        return "RIEN";
      }

      throw new Error("Unexpected response from OpenAI: " + completion_text);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  },
  translateToChtimiWithOpenAi: async (message) => {
    const openai = new OpenAIApi(configuration);
    const messages = [];
    const prompt = `Tu dois traduire en ch'timi des messages saisis par des utilisateurs dans un salon de discussion. Voici un message ecris en francais. Je souhaite que tu traduises directement le message en language ch'timi, en prefixant la réponse par "TRADUCTION:", repond par "RIEN" dans tous les autres cas, ou si le contexte est insuffisant, ou que tu ne comprend pas le message.\n\nMessage:\n`;

    const samples = [
      {
        user: "je ne comprend rien",
        bot: "TRADUCTION: M'comprinds pos, mi.",
      },
      {
        user: "quel abruti",
        bot: "TRADUCTION: Quel andoule !",
      },
    ];

    samples.forEach((sample) => {
      messages.push({ role: "user", content: sample.user });
      messages.push({ role: "assistant", content: sample.bot });
    });

    messages.push({ role: "user", content: prompt + message });
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      const completion_text = completion.data.choices[0].message.content;
      if (completion_text.startsWith("TRADUCTION:")) {
        return completion_text.replace("TRADUCTION:", "").trim();
      } else if (completion_text.startsWith("RIEN")) {
        return "RIEN";
      }

      throw new Error("Unexpected response from OpenAI: " + completion_text);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  },
  callOpenAi: async (prompt, history = []) => {
    const openai = new OpenAIApi(configuration);
    const messages = [];

    history.forEach((sample) => {
      messages.push({ role: "user", content: sample.user });
      messages.push({ role: "assistant", content: sample.bot });
    });

    messages.push({ role: "user", content: prompt });
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      const completion_text = completion.data.choices[0].message.content;
      return completion_text;
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  },
};
