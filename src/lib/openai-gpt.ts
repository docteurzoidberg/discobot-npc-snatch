/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenAIApi, Configuration } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config({
  path:
    __dirname +
    '/../../.env' +
    (process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''),
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const callCompletion = async (
  prompt,
  model = 'text-davinci-003',
) => {
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: model,
    prompt: prompt
  });
  const completion_text = completion.data.choices[0].text;
  return completion_text;
};

export const callChatCompletion = async (
  prompt,
  history: Array<any> = [],
  model = 'gpt-3.5-turbo'
) => {
  const openai = new OpenAIApi(configuration);
  const messages: Array<any> = [];
  history.forEach((sample) => {
    messages.push({ role: 'user', content: sample.user });
    messages.push({ role: 'assistant', content: sample.bot });
  });
  messages.push({ role: 'user', content: prompt });
  const completion = await openai.createChatCompletion({
    model: model,
    messages: messages,
  });
  if (completion.data) {
    const firstChoice = completion.data.choices[0];
    if (firstChoice) {
      const completion_text = firstChoice.message?.content;
      return completion_text;
    }
  }
};

export const translateToFr = async (text) => {
  const prompt = `Traduire en francais soutenu les messages suivants:
  
  Message> ${text}
  Reponse>`;

  const response = await callCompletion(prompt);
  return response || '';
};

export const translateToChtimi = async (text) => {
  const prompt = `Traduire en ch'timi les messages suivants:
  
  Message> je ne comprend rien
  Traduction> M'comprinds pos, mi
  
  Message> quel abruti
  Traduction> Quel andoule !
      
  Message> ${text}
  Reponse>`;
  const response = await callCompletion(prompt);
  return response || '';
};

export const translateToManouche = async (text) => {
  const prompt = `Traduire en manouche / argot / language familier les messages suivants:

  Message> ${text}
  Manouche>`;
  const response = await callCompletion(prompt);
  return response || '';
};

export const translateToMurloc = async (text) => {

  const prompt = `Voici une série de messages en français avec leurs correspondances en murloc :

Message en français : "Bonjour, comment ça va aujourd'hui ?"
Correspondance en murloc : "Mmmurlok, mrgle mmmml mmmrlgggl nkk mmmrlgggl mmrggl!"

Message en français : "Je suis ravi de vous rencontrer, mon ami."
Correspondance en murloc : "Mmmrrgglllm mllgggrrrr mmmglrmglmgl, mmmmurlok."

Message en français : "Voulez-vous pêcher avec moi demain ?"
Correspondance en murloc : "Mrgle mmmrlgggl mgrrrl mmmgr flllurlokkr mllgggrrrr mmmllgrrr?"

Message en français : "Les murlocs sont des créatures fascinantes."
Correspondance en murloc : "Mmmmurlok mmmllgggrrrr furl mmmml mllgggrrrr mmmmmmmrrrgllm."

Message en français : "Le printemps est une saison merveilleuse."
Correspondance en murloc : "Mmmrrgglm srng mmmml mllgggrrrr mmmml mrgllll mmmrrglllm."

Message en français : "Non, je ne suis pas un ogre."
Correspondance en murloc : "Nk, mmmrrgll nkk mllgggrrrr n mmmrlgggl rrrgrrr."

Message en français : "Je chante joyeusement avec mes amis."
Correspondance en murloc : "Mmmrrggllm shng mmm- mmmgr mmmrrglllm."

Message en français : "J'ai une cicatrice sur mon bras gauche."
Correspondance en murloc : "Mmmml urka skr mmmml mllgggrrrr mmmrrgglm."

Message en français : "Je suis honoré de faire votre connaissance."
Correspondance en murloc : "Mmmrrgglllm uuuua mmmrrgglllm mmmmmmllgggrrrr mmmllgggrrrr mmmrrggllm."

Message en français : "Les dieux murlocs sont puissants."
Correspondance en murloc : "Mglrmglmglmgl mmmllgggrrrr furl mmm- mmmrrgllm."

Message en français : "J'ai soif, pouvez-vous me donner de l'eau ?"
Correspondance en murloc : "Mllgggrrrr mmmmmrlgggl, mrgle mmmrrggllm mmmrrglllm mllgggrrrr mmmrrglllm mmmmmmllgggrrrr?"

Message en francais: ${text}
Correspondance en murloc: `;

  const response = await callCompletion(prompt);
  return response || '';
};

export const convertMovieTitleToEmojis = async (movieTitle) => {
  const prompt = `
  Convert movie titles into emojis (some may be french titles).
  use maximum of 5 most relevant emojis.

  Back to the Future => 👨👴🚗🕒 
  Batman => 🤵🦇 
  Transformers => 🚗🤖 
  Star Wars => 🌟🚀🙌
  ${movieTitle} => `;
  //const response = await callChatCompletion(prompt, history);
  const response = await callCompletion(prompt);
  return response || '';
};

export const convertMovieToEmojis = async (title = '', story = '') => {

  const prompt = `Convert movies into emojis.
  
  - Here are some examples of famous movies  when converted to emojis.
  - Please respond with a maximum of 5 most relevant emojis.
  - Use provided resume if you don't know about the movie.

  Exemples:

    Back to the Future => 👨👴🚗🕒 
    Batman => 🤵🦇 
    Transformers => 🚗🤖 
    Star Wars => 🌟🚀🙌
  
  Movie title in french: ${title} 

  Movie resume in french: 
  
    ${story}

  Result:
    ${title} => `;
  //const response = await callChatCompletion(prompt, history);
  const response = await callCompletion(prompt);
  response?.replace(/(\r\n|\n|\r)/gm, '').trim();
  return response || '';
};

