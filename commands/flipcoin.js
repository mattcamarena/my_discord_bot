module.exports = {
	name: 'flipcoin',
	description: "Flips A coin",
	execute(message,args){

		let mongoose;
		const monLog = "mongodb+srv://discU:passU@cluster0.rhufk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
		try {
			mongoose = require("mongoose");
		}catch(e){
			console.log(e);
		}

		mongoose.connect(monLog);

		const User = mongoose.models.User;
		const uname = message.member.user.tag;

		

		const bChoice = Math.floor(Math.random() * 2);
		
		if(args.length === 0){
			if(bChoice == 0) {
			message.channel.send("Heads");
		}else{
			message.channel.send("Tails");
		}
		}else if(args.length === 1){
			const uChoice = args[0].toLowerCase();
			if(uChoice === "heads"){
				if(bChoice === 0){
					message.channel.send("Bot chose Heads You Win");
				}else{
					message.channel.send("Bot Chose Tails You Lose!");
				}
				
			}else if(uChoice === "tails"){
				if(bChoice === 0){
					message.channel.send("Bot chose Heads You Lose");
				}else{
					message.channel.send("Bot Chose Tails You Win!");
				}
			}else{
				message.channel.send("Invalid input");
			}
		}else{
			message.channel.send("Invalid input");
		}
	}
}
