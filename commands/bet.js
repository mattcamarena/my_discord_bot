module.exports = {
	name: 'deleteprofile',
	description: "bet",
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
		User.exists({username:uname}, function(err,res){
			if(err){
				console.log(err);
			}else{

				if(res){ //exists
					User.remove({username:uname},function(err,res){
						if(err){
						}else{
							message.channel.send("Your profile is removed" + res);
						}
					});
					
				}else{//doesnt exist
					message.channel.send('You already dont have a profile...');
					


				}
				
			}
			
		});

		
	}
}

