# NPC Snatch

Le bot qui traduit le / en manouche les messages discord !

## setup

```
git clone ...
cd npc-snatch
npm install
```

## configuration

```
cp .env-sample .env
nano .env
```

-> renseigner le .env avec l'apikey OpenAI, le token discord, etc

## register les commandes sur l'api discord

```
npm run register
```

## lancer le bot

```
npm run start
```

## jouer avec les fonctions

```
npm run tryprompt         //tester directement des prompts openai
npm run tryfr             //tester le prompt de traduction vers FR
npm run trymanouche       //tester le prompt de traduction vers Manouche
```

## docker

```
cp docker-compose.sample.yml docker-compose.yml
nano docker-compose.yml   //editer la config si besoin
docker compose up -d
```
