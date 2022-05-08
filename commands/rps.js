module.exports = {
	name: 'rps',
	description: "Rock Paper Scissors",
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


		const bChoice = Math.floor(Math.random() * 3);
		var win = 0, lose = 0, tie = 0, total = 1;
		if(args.length === 0){
			total--;
			if(bChoice === 0){
					message.channel.send("Rock");
				}else if(bChoice ===1){
					message.channel.send("Paper");
				}else{
					message.channel.send("Scissors")
				}
		}else if(args.length === 1){
			const uChoice = args[0].toLowerCase();
			if(uChoice === "rock"){
				if(bChoice === 0){
					message.channel.send("Bot Chose Rock Tie Game!");
					tie++;
				}else if(bChoice ===1){
					message.channel.send("Bot Chose Paper You Lose!");
					lose++;
				}else{
					message.channel.send("Bot chose Scissors You Win!");
					win++;
				}
				
			}else if(uChoice === "paper"){
				if(bChoice === 0){
					message.channel.send("Bot Chose Rock You Win!");
					win++;
				}else if(bChoice ===1){
					message.channel.send("Bot Chose Paper Tie Game!");
					tie++;
				}else{
					message.channel.send("Bot chose Scissors You Lose!");
					lose++;
				}
			}else if(uChoice ==="scissors"){
				if(bChoice === 0){
					message.channel.send("Bot Chose Rock You Lose!");
					lose++;
				}else if(bChoice ===1){
					message.channel.send("Bot Chose Paper You Win!");
					win++;
				}else{
					message.channel.send("Bot chose Scissors Tie Game!");
					tie++;
				}
			}else{
				message.channel.send("Invalid input");
				total--;
			}
		}else{
			total--;
			message.channel.send("Invalid input");
		}


		User.find({username:uname}, function(err,res){
			if(err){
				console.log(err);
			}else{

				if(res){ //exists
					User.findOneAndUpdate({username:uname}, {rpsw: win+res[0].rpsw,
					rpsl: lose+res[0].rpsl, rpst: tie+res[0].rpst, rpsa: total+res[0].rpsa,
						}).then(updatedDocument => {
		    			if(updatedDocument) {
		      				//console.log(`Successfully updated document: ${updatedDocument}.`)
		    			}else{
		      				console.log("No document matches the provided query.")
		    			}
		    			return updatedDocument
		  				})
		  				.catch(err => console.error(`Failed to find and update document: ${err}`))
				

				}else{//doesnt exist 
					console.log("wtf");
				}
			}
		});
	
	}
}

