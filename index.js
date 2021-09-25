const {Client, Intents } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection} = require('@discordjs/voice');
const { prefix, token } = require("./config.json");
const { Player } = require("discord-music-player");


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]  });

const player = new Player(client, {
    leaveOnEmpty: false, 
});

client.player = player;

const samuel = [
    "cawendios",
    "¿dónde están las pizzas?",
    "aaaaah aaaaah",
    "hazle un culiraji"
];

const ernesto = [
    "si me quisieras...",
    "yo no conozco a ese tal ernesto...",
    "HIJODEPUTA TE ODIO",
    "PUEDES PARAR YA DE FEDEAR??????"
];

const mario = [
    "toni dame un toni",
    "descapotao jaja",
    "toni dame un toni",
    "descapotao jaja"
];

const marko = [
    "no tiene flash, ahora jugará más defensivo",
    "tiene flash, va a jugar mas agresivo",
    "no tiene flash, ahora jugará más defensivo",
    "tiene flash, va a jugar mas agresivo"
];

const guille = [
    "QUEHIJADEPUTA QUE HIJA DE PUTA",
    "QUEHIJADEPUTA QUE HIJA DE PUTA",
    "PUTA MORGANA DE MIERDA",
    "¿Qué hora es?"
];

var fraseRandom = (vivaldi) =>{
    return vivaldi[Math.floor(Math.random()*3)]
}


client.once("ready", () => {
  console.log("ready");
});

client.once("reconnecting", () => {
  console.log("reconnecting");
});

client.once("disconnect", () => {
  console.log("disconnected");
});

client.on('messageCreate', async message =>{
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    //Avoid infinite message loop bug
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let guildQueue = client.player.getQueue(message.guild.id);

    if(command === 'play') {
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.play(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
    }
    else if(command === 'skip') {
        guildQueue.skip();
    }else if(command === 'stop') {
        guildQueue.stop();
    }else if(command === 'pause') {
        guildQueue.setPaused(true);
    }else if(command === 'continue') {
        guildQueue.setPaused(false);
    }else if(command === 'samuel'){
        return message.channel.send(fraseRandom(samuel));
    }else if(command === 'ernesto'){
        return message.channel.send(fraseRandom(ernesto));
    }else if(command === 'mario'){
        return message.channel.send(fraseRandom(mario));
    }else if(command === 'guille'){
        return message.channel.send(fraseRandom(guille));
    }else if(command === 'marko'){
        return message.channel.send(fraseRandom(marko));
    }else{
        return message.channel.send("¿Pero eres tonto? ¿No sabes escribir ni un puto comando o que?");
    }
    
});





client.login(token);