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
    const voiceChannel = message.member.voice.channel;
    let guildQueue = client.player.getQueue(message.guild.id);

    if(command === 'play') {
        if(voiceChannel){
            let queue = client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channel);
            let song = await queue.play(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
                message.channel.send("test");
        });
        }else{
            return message.channel.send("METETE EN UN PUTO CANAL DE VOZ HOSTIA");
        }
    }
    else if(command === 'skip') {
    if(voiceChannel){

        guildQueue.skip();

    }else{

        return message.channel.send("METETE EN UN PUTO CANAL DE VOZ HOSTIA");

    }}

    else if(command === 'stop') {
    if(voiceChannel){
        guildQueue.stop();
    }else{
       return message.channel.send("METETE EN UN PUTO CANAL DE VOZ HOSTIA"); 
    }}

    else if(command === 'pause') {
        if(voiceChannel){
        guildQueue.setPaused(true);
    }else{
        return message.channel.send("METETE EN UN PUTO CANAL DE VOZ HOSTIA");
    }
    }
    
    else if(command === 'continue') {
        if(voiceChannel){
        guildQueue.setPaused(false);
    }else{
        return message.channel.send("METETE EN UN PUTO CANAL DE VOZ HOSTIA")
    }
    }
    
    else if(command === 'samuel'){
        return message.channel.send(fraseRandom(samuel));
    }
    else if(command === 'ernesto'){
        return message.channel.send(fraseRandom(ernesto));
    }
    else if(command === 'mario'){
        return message.channel.send(fraseRandom(mario));
    }else if(command === 'guille'){
        return message.channel.send(fraseRandom(guille));
    }else if(command === 'marko'){
        return message.channel.send(fraseRandom(marko));
    }else{
        return message.channel.send("¿Pero eres tonto? ¿No sabes escribir ni un puto comando o que?");
    }
    
});

client.player
    // Emitted when channel was empty.
    .on('channelEmpty',  (queue) =>
        console.log(`Everyone left the Voice Channel, queue ended.`))
    // Emitted when a song was added to the queue.
    .on('songAdd',  (queue, song) =>
        console.log(`Song ${song} was added to the queue.`))
    // Emitted when a playlist was added to the queue.
    .on('playlistAdd',  (queue, playlist) =>
        console.log(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`))
    // Emitted when there was no more music to play.
    .on('queueEnd',  (queue) =>
        console.log(`The queue has ended.`))
    // Emitted when a song changed.
    .on('songChanged', (queue, newSong, oldSong) =>
        console.log(`${newSong} is now playing.`))
    // Emitted when a first song in the queue started playing.
    .on('songFirst',  (queue, song) =>
        console.log(`Started playing ${song}.`))
    // Emitted when someone disconnected the bot from the channel.
    .on('clientDisconnect', (queue) =>
        console.log(`I was kicked from the Voice Channel, queue ended.`))
    // Emitted when deafenOnJoin is true and the bot was undeafened
    .on('clientUndeafen', (queue) =>
        console.log(`I got undefeanded.`))
    // Emitted when there was an error in runtime
    .on('error', (error, queue) => {
        console.log(`Error: ${error} in ${queue.guild.name}`);
    });



client.login(token);