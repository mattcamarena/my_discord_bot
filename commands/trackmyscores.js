module.exports = {
	name: 'trackmyscores',
	description: "trackmyscores",
	execute(message,args){
		let mongoose;
		const monLog = "key"
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
					message.channel.send("You've already created a profile silly!");
				}else{//doesnt exist
					message.channel.send('Creating profile...\n');
					var nUser = new User({username: uname, rpsw: 0, rpsl: 0, rpst: 0, rpsa: 0, htw: 0, htl: 0,hta: 0});
					nUser.save();
					message.channel.send('Success!');
				}
			}
		});
	}
}

