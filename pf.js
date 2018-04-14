const Discord = require("discord.js");
	function pf(message,prefix,client){
    var nombreAleatoire = Math.round(Math.random()*2);
     var reponse;
     if(message.content.startsWith(prefix +'pf')){
	message.reply("Pari des maintenant sur Pile ou sur Face pour parier fait \n```B-p (pour pile)``` \n```B-f (pour face)```");
	message.delete();
	} if(message.content.startsWith(prefix + "-p")){
			if(nombreAleatoire == 2){
					message.reply("Tu as gagné Gege !");
					message.delete();
				} else{
					message.reply("Tu a perdu la réponse* étais Face");
					message.delete();
				}
		} if(message.content.startsWith(prefix + "-f")){
				if(nombreAleatoire == 1){
						message.reply("Tu as gagné Gege !");
						message.delete();
					} else {
						message.reply("tu a perdu :wink:");
						message.delete();
					}
			}
}
module.exports = pf