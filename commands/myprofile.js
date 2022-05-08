module.exports = {
	name: 'myprofile',
	description: "user profile",
	execute(message,args){
		let mongoose;
		const monLog = "key";
		try {
			mongoose = require("mongoose");
		}catch(e){
			console.log(e);
		}

		mongoose.connect(monLog);


		const Schema = mongoose.Schema;

		const userSchema = Schema({
			username: {type: String, required: true},
			rpsw: Number,
			rpsl: Number,
			rpst: Number,
			rpsa: Number,
			htw: Number,
			htl: Number,
			hta: Number,
		});

		const User = mongoose.models.User || mongoose.model("User", userSchema);
		const uname = message.member.user.tag;
		User.exists({username:uname}, function(err,res){
			if(err){
				console.log(err);
			}else{

				if(res){ //exists
					
				}else{//doesnt exist
					message.channel.send('Use !trackmyscores to start tracking your scores!');
					return;

				}
			}
		});

		User.find({username:uname}, function(err,res){
			if(err){
				console.log(err);
			}else{

				if(res){ //exists
					
					
					var uwu = res[0];
					var rwins = uwu.rpsw;
					var rloses = uwu.rpsl;
					var rties = uwu.rpst;
					var rattempts = uwu.rpsa;

					var hwins = uwu.htw;
					var hloses = uwu.htl;
					var hattempts = uwu.hta;

					message.channel.send("Profile for ["+ uname + "]\n");
					message.channel.send("Rock Paper Scissors \nWins: " + rwins + "\nLoses: " + rloses + "\nTies: " + rties + "\nTotalGames: "  +rattempts + "\nWin Rate: [to be done]");
					message.channel.send("CoinFlip Wins/Loses/Total: "+ hwins + "/" + hloses +"/" + hattempts + "Not Available WIP");
					
				}else{//doesnt exist
					message.channel.send('Use !trackmyscores to start tracking your scores!');
					
				}
			}
		});

	}
}

