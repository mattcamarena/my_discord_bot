//DB connection for leaderboard

const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const prefix = "!";

const fs = require('fs');

const list =[];

client.commands = new Discord.Collection();
// load commands 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));

for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	list.push(command.name);
	client.commands.set(command.name,command);
}
client.once('ready', () => {
    console.log('<Bot Name> is online!');
});

client.on('messageCreate', message =>{

	if(!message.content.startsWith(prefix)|| message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);

	const command = args.shift().toLowerCase();
	if(command === 'commands'){
		message.channel.send("Commands: "+ list);
	}
	if(client.commands.has(command)){
		client.commands.get(command).execute(message,args);
	}else{
		message.channel.send('Command not found.')
;	}

});

client.login(discord_api_key);