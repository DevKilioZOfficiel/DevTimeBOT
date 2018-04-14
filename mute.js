const Discord = require("discord.js");
	function mute(message,prefix,client){
	
		if(message.content.startsWith(prefix + "mute"))
	if(message.member.hasPermission("BAN_MEMBERS")) {

        if(message.mentions.members.size > 0) {


            const muteRole = message.guild.roles.find("name", "Mute");

            if(message.mentions.members.first().roles.has(muteRole)) {

                message.reply(" cet utilisateur a déjà été mute !");

                message.delete();

            } else if(message.mentions.members.first().toString() == message.member.toString()) {

                

                message.channel.sendMessage(message.member.toString() + " vous ne pouvez pas vous mute vous même !");

                message.delete();

                

            } else {

                message.mentions.members.first().addRole(muteRole);

                message.channel.sendMessage(message.mentions.members.first().toString() + " a bien été mute !");

                message.delete();

            }


        } else {

            message.reply(":x: veuillez mentionner un utilisateur valide !");

            message.delete();

        }

       } else {

        message.reply(":x: vous ne pouvez pas exécuter cette commande !");

        message.delete();

       }

    }

module.exports = mute