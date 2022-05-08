module.exports = {
	name: 'editprofile',
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

		User.findOneAndUpdate({username:uname}, {rpsw: 1}).then(updatedDocument => {
		    if(updatedDocument) {
		      	console.log(`Successfully updated document: ${updatedDocument}.`)
		    }else{
		      	console.log("No document matches the provided query.")
		    }
		    	return updatedDocument;
		  	})
		  .catch(err => console.error(`Failed to find and update document: ${err}`))


	}
}

