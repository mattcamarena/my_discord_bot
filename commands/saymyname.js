module.exports = {
	name: 'saymyname',
	description: "sayname",
	execute(message,args){
		message.channel.send(message.member.user.tag);
	}
}

