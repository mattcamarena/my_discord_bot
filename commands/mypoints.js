module.exports = {
	name: 'myprofiles',
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
			rpsa: Number,
			htw: Number,
			hta: Number,
		});

		const User = mongoose.models.User || mongoose.model("User", userSchema);
		const uname = message.member.user.tag;
		User.find({username:uname}, function(err,res){
			if(err){
				console.log(err);
			}else{

				if(res){ //exists
					console.log(res);
					
					var wins = res[0].rpsw;
					var total = res[0].rpsa;
					var winss = res[0].htw;
					var totals = res[0].hta;
					message.channel.send("Profile for ["+ uname + "]\n");
					message.channel.send("Rock Paper Scissors Wins/Total: " + wins + "/" + total);
					message.channel.send("CoinFlip Wins/Total: "+ winss + "/" + totals )
				}else{//doesnt exist
					message.channel.send('Use !trackmyscores to start tracking your scores!');
					
				}
			}
		});

	}
}

