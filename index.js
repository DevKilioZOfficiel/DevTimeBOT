const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env.TOKEN;
const fs = require('fs');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

//=====Variables-Constances=====//
const prefix = "devtime!";
const memberCount = client.users.size;
const servercount = client.guilds.size;
const channels = client.channels.size;
const name = client.guilds.name;
const version_bot = "1.0.4_BETA_DEV";
const changelog_1_0_4_BETA_DEV = "Nouveauté: Ajout de la commande devtime!xp, devtime!changelog et la commande devtime!sondage {question} ! Et aussi, un système de Bienvenue / Au revoir !"; // 14 Avril 2018
const changelog_1_0_3_BETA_DEV = "Ajout de la commande devtime!blagues et devtime!kill {utilisateur}"; // 2 Avril 2018
const changelog_1_0_2_BETA_DEV = "Passage du Bot de **DiscordPHP** à **DiscordJS** !"; // 23 Janvier 2018
const changelog_1_0_0_BETA_DEV = "Création du bot discord sous **DiscordPHP**!"; // 17 Novembre 2017
const url_bot = "https://dev-time.eu/discordbot";

//=====Démarrage=====//
client.on("ready", () => {
client.user.setStatus("online");
var nombreAleatoire2 = Math.round(Math.random()*4);
    //console.log(nombreAleatoire);
    var reponse;
    if(nombreAleatoire2 == 1) {
        client.user.setActivity("DevTimeEU " + client.users.size + " Membres");
	}
    if(nombreAleatoire2 == 2) {
        client.user.setActivity(client.guilds.size + " Serveurs");
	}
    if(nombreAleatoire2 == 3) {
        client.user.setActivity("https://dev-time.eu/");
	}
	if(nombreAleatoire2 == 4) {
        client.user.setActivity("Version: "+ version_bot +"");
	}
console.log('[!]Le préfix actuelle:  ' + prefix + "\n[!]Nombre de membres: " + client.users.size + "\n[!]Nombre de serveurs: " + client.guilds.size +"\nNoms de serveurs: " + client.guilds.array().map(g => g.name).join('\n '));
});


// Welcome new user/bye bye
	client.on("guildMemberAdd", member => {
	if(message.guild.id == "240182977202618370"){
		member.guild.channels.find("name", "autre").send(`Bienvenue à ${member}`)
	}
	})
	client.on("guildMemberRemove", member => {
	if(message.guild.id == "240182977202618370"){
		member.guild.channels.find("name", "autre").send(`Au revoir ${member} ! Il vient juste de nous quitter :'(`)
	}
	})


//Logs
client.on("messageDelete", (message) => {
	const embed = new Discord.RichEmbed()
	   .setColor("#EB2626")
    .addField("Suppresion d'un message", "Un message a été supprimé de " + message.member.user.toString() + "\n il contenait "+ "```" + message + "```")
    .addField("Salons", "Supprimé du salons " + message.channel.name)
    	message.member.guild.channels.find("name", "logs").sendEmbed(embed)
})

//Les commandes / message
client.on('message', message => {
	
// XP LEVEL
    if(message.author.bot)return;
	
	if(!db.get("xp").find({user: message.author.id}).value()){
		db.get("xp").push({user: message.author.id, xp: 1}).write();
	}else{
		var userxpdb = db.get("xp").filter({user: message.author.id}).find('xp').value();
		console.log(userxpdb);
		var userxp = Object.values(userxpdb)
		console.log(userxp)
		console.log(`Nombre d'XP: ${userxp[1]}`)
		
		db.get("xp").find({user: message.author.id}).assign({user: message.author.id, xp: userxp[1] += 1}).write();
		
	if(message.content == prefix +"xp"){
		var xp = db.get("xp").filter({user: message.author.id}).find('xp').value()
		var xpfinal = Object.values(xp);
		var xp_embed = new Discord.RichEmbed()
		    .setTitle(`Statistiques de ${message.author.username}`)
			.setColor('#F4D03F')
			.setDescription('Nombre d\'XP')
			.addField("XP:", `${xpfinal[1]} xp`)
			.setFooter("A Bientôt")
		message.channel.send({embed: xp_embed});
		
	}}	
	
	
	
	
	
	
	//constence
  		 const ban = require("./ban.js");
					ban(message, prefix, client)
					const mute = require("./mute.js");
					mute(message, prefix, client)
					const unmute = require("./unmute.js");
					unmute(message, prefix, client)
					//const mots = require("./utiles/mots.js");
					//mots(message, prefix, client)
					const pf = require("./pf.js");
					pf(message, prefix, client)
					
    //AutoRoles
let autorole = JSON.parse(fs.readFileSync("./autoRole.json", "utf8"));
var defaultmodrole = '';
var autoRole;
if(autorole[message.guild.id]){
var autoRole = autorole[message.guild.id].autoRole;
}else{
var autoRole = '';
}
if(message.content.startsWith(prefix + "setautorole")){
if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")){return message.reply("**❌ Vous n'avez pas les permissions dans ce serveur**").catch(console.error);
}else{
let args = message.content.split(' ').slice(1);
if(!args) return message.channel.send('**❌ Merci de specifier un rôle**')
autorole[message.guild.id] = {"autoRole": args.join(" ")};
message.channel.send("Mon autoRole est `"+ args.join(" ") + "`");
message.delete();
fs.writeFile("./autoRole.json", JSON.stringify(autorole), (err) => {if (err) console.error(err);});
}
}

//Commandes
        if(message.content.startsWith(prefix + "help")) {
        	var htest = new Discord.RichEmbed()
        	 .setColor("#4B63EC")
        	 .addField("devtime!info", "Des informations sur DevTimeEU")
        	 .addField("devtime!serveur", "Des informations sur le Serveur")
        	 .addField("devtime!admin", "Les commandes Administrateur")
        	 .addField("devtime!avatar {mention}", "Voir l'Avatar d'un utilisateur")
			 .addField("devtime!blagues", "Des blagues créé et ajouté par nos membres. Si vous avez une blague à ajouter rendez-vous sur notre [Discord](https://discord.gg/35WNp5d). Ajouté dans la version 1.0.3_BETA_DEV")
        	 message.channel.sendEmbed(htest);
        	 message.delete();
        }
		
if(message.guild.id == "240182977202618370"){
if (message.content.startsWith("")) { 
if (message.content.includes("discordapp.com")) {
message.delete();
}}

if (message.content.startsWith("")) { 
if (message.content.includes("discord.me")) {
message.delete();
}}

if (message.content.startsWith("")) { 
if (message.content.includes("discord.gg")) {
message.delete();
}}

}
        if(message.content.startsWith(prefix + "changelog")) {
        	var htest = new Discord.RichEmbed()
        	    .setColor("#4B63EC")
				.setTitle("Notes des mises à jours du bot")
        	    .addField("Mise à jour 1_0_4_BETA_DEV le 14 Avril 2018", changelog_1_0_4_BETA_DEV)
				.addField("Mise à jour 1_0_3_BETA_DEV le 2 Avril 2018", changelog_1_0_3_BETA_DEV)
				.addField("Mise à jour 1_0_2_BETA_DEV le 23 Janvier 2018", changelog_1_0_2_BETA_DEV)
				.addField("Mise à jour 1_0_0_BETA_DEV le 17 Novembre 2017", changelog_1_0_0_BETA_DEV)
				.setFooter("Pour toute suggestion sur notre bot, rendez-vous sur " +url_bot + "!")
        	 message.channel.sendEmbed(htest);
        	 message.delete();
        }
		
		if(message.content.startsWith(prefix + "admin")) {
        	var htest = new Discord.RichEmbed()
        	    .setColor("#4B63EC")
        	    .addField("devtime!setautorole", "Definir le role par default")
        	    .addField("devtime!ban {Membre}", "Bannir un membres")
			    .addField("devtime!mute {Membre}", "Mute un membres **(Requis: Grade Mute)**")
				.addField("devtime!unmute {Membre}", "Unmute un membres **(Requis: Grade Mute)**")
				.addField("devtime!warn {Chiffre} (facultatif si c'est le premier !) {Membre}", "Avertir un membres (Ajouté lors de la mise à jour 1.0.2_BETA_DEV) **(Requis: Grades \"1er Avertissement\", \"2e Avertissement\", \"3e Avertissement\")**")
        	 message.channel.sendEmbed(htest);
        	 message.delete();
        }
	
        	if(message.content.startsWith(prefix + "info")) {
        	var htest = new Discord.RichEmbed()
        	 .setColor("#4B63EC")
        	 .addField("Ce bot est créé par @KilioZ - Développeur Web#5207  en Novembre 2017. Il est actuellement en version "+ version_bot +"", "© 2016-2018. Tous droits réservés par [Dev-Time](" +url_bot+ ").")
        	 message.channel.sendEmbed(htest);
        	 message.delete();
        	}
        
        if(message.content.startsWith(prefix + "serveur")) {
        	var htest = new Discord.RichEmbed()
        	 .setColor("#4B63EC")
        	 .addField("Rôles", "Il y a " + message.guild.roles.size + " Rôles")
        	 .addField("Membres", "Il y a " + message.guild.members.size + " Membres")
          message.channel.sendEmbed(htest);
          message.delete();
        	}
		
	if (message.content == "clear") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages()
               .then(function(list){
                    message.channel.bulkDelete(list);
                    message.reply("Tous les messages ont été supprimés");
                }, function(err){message.channel.send("ERREUR: AUCUN MESSAGE NE PEUT ETRE SUPPRIMÉS !!")})                        
        }
    }
	
    //donner l'avatar de quelqu'un
    const user = message.mentions.users.first()
       if(message.content.startsWith(prefix + "avatar")){
        	var htest = new Discord.RichEmbed()
        	 .setColor("#4B63EC")
        	 .addField("L'avatar de " + user.toString() + "est: " + message.mentions.users.first().displayAvatarURL, "© 2016-2018. Tous droits réservés par [Dev-Time](" +url_bot+ ").")
        	 message.channel.sendEmbed(htest);
        message.delete();
};

//Logout
if (message.content.startsWith(prefix + "logout")) {

     if(message.author.id == "368832865850621952"){

      message.reply("Arrêt en cours");

        console.log('/ Je suis désormais offline / ');

        client.destroy();

        process.exit()

    } else {
    }
  }
  
    if(message.content.startsWith(prefix + "sondage")){
        if(message.member.hasPermission("BAN_MEMBERS")) {
			
			let args = message.content.split(" ").slice(1);
			let thingToEcho = args.join(" ")
			var embed = new Discord.RichEmbed()
			    .setDescription('Sondage')
				.addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
				.setColor("0xB40404")
				.setTimestamp()
			message.channel.sendEmbed(embed)
			.then(function (message){
				message.react("✅")
				message.react("❌")
			}).catch(function(){
				
			});
			message.delete()
		}else{
			return message.reply("Tu n'as pas la permission.")
        }
	}  
  // Rank NOUVEAU Membres
  
    if(message.content.startsWith(prefix + "membre")){
        if(message.member.hasPermission("BAN_MEMBERS")) {

        if(message.mentions.members.size > 0) {


            const member = message.guild.roles.find("name", "Membre");

                message.mentions.members.first().addRole(member);
                message.delete();

        } else {

            message.reply("❌ veuillez mentionner un utilisateur valide !");

            message.delete();

        }

        } else {

            message.reply("❌ vous ne pouvez pas exécuter cette commande !");
            message.delete();

        }
	}
	
	//if (message.content == "test") {
    //        message.channel.fetchMessages()
    //           .then(function(list){
    //                message.channel.bulkDelete(list);
    //                message.reply("Tous les messages ont été supprimés");
    //            }, function(err){message.channel.send("ERREUR: AUCUN MESSAGE NE PEUT ETRE SUPPRIMÉS !!")})                        
    //}
		   
	   
	   
	   
// Rank NOUVEAU Avertissement
  
    if(message.content.startsWith(prefix + "warn")){
        if(message.member.hasPermission("BAN_MEMBERS")) {

        if(message.mentions.members.size > 0) {


            const member = message.guild.roles.find("name", "1er Avertissement");

                message.mentions.members.first().addRole(member);
                message.delete();

        } else {

            message.reply("❌ veuillez mentionner un utilisateur valide !");

            message.delete();

        }

        } else {

            message.reply("❌ vous ne pouvez pas exécuter cette commande !");
            message.delete();

        }
	}
    if(message.content.startsWith(prefix + "warn 2")){
        if(message.member.hasPermission("BAN_MEMBERS")) {

        if(message.mentions.members.size > 0) {


            const member = message.guild.roles.find("name", "2e Avertissement");

                message.mentions.members.first().addRole(member);
                message.delete();

        } else {

            message.reply("❌ veuillez mentionner un utilisateur valide !");

            message.delete();

        }

        } else {

            message.reply("❌ vous ne pouvez pas exécuter cette commande !");
            message.delete();

        }
	}
    if(message.content.startsWith(prefix + "warn 3")){
        if(message.member.hasPermission("BAN_MEMBERS")) {

        if(message.mentions.members.size > 0) {


            const member = message.guild.roles.find("name", "3e Avertissement");

                message.mentions.members.first().addRole(member);
                message.delete();

        } else {

            message.reply("❌ veuillez mentionner un utilisateur valide !");

            message.delete();

        }

        } else {

            message.reply("❌ vous ne pouvez pas exécuter cette commande !");
            message.delete();

        }
	}
	
	
    if(message.content.startsWith(prefix + "webhosting")){
        if(message.member.hasPermission("BAN_MEMBERS")) {

        if(message.mentions.members.size > 0) {


            message.author.send(message.mentions.members.first() + ", Vous devez **payer** votre hébergement web car il est passé en Suspendu !");

        } else {

            message.reply("❌ veuillez mentionner un utilisateur valide !");

            message.delete();

        }

        } else {

            message.reply("❌ vous ne pouvez pas exécuter cette commande !");
            message.delete();

        }
	}
  
    if(message.content === prefix + "servers") {
	    if(message.author.id == "368832865850621952"){
            message.channel.send("Voici la liste des serveurs ou le bot est disponible: \n" + client.guilds.array().map(g => g.name).join('\n') )
		}
    }
  
  
  //Les blagues
    if(message.content.startsWith(prefix + "blagues")) {
    	 var nombreAleatoire = Math.round(Math.random()*3);
    //console.log(nombreAleatoire);
     var reponse;
     if(nombreAleatoire == 1) {
    message.reply("```De nos jours le ZIP ca devient RAR```")
   } else if(nombreAleatoire == 2) {
     message.reply("```De quelle couleur son tes Yeux ? #2E9AFE est toi ?```");
   } else if(nombreAleatoire == 3) {
   	  message.reply("```Que dit une mère à son fils geek quand le diner est servi ? \n Alt Tab !!! ```");
   }
   message.delete();
 }
 
 
    if(message.content.startsWith(prefix + "kill")) {
    	 var nombreAleatoire_kill = Math.round(Math.random()*3);
    //console.log(nombreAleatoire);
     var reponse;
     if(nombreAleatoire_kill == 1) {
		 if(message.content.startsWith(prefix + "kill <@368832865850621952>")){
			message.reply("ERREUR 666: Le tir n'est pas effectué !");
			message.reply("Vous allez vous faire **bombarder** votre maison dans 5 minutes !");
		 }else{
			 if(message.content.startsWith(prefix + "kill <@363466789042126858>")){
			message.reply("ERREUR 666: Le tir n'est pas effectué !");
			message.reply("<@363466789042126858> vient d'appeler des **renforts** pour vous arréter pour tentative d'attentat !");
		 }else{
    message.reply(message.mentions.members.first() + " est mort par "+ message.author)
		 } }
   } else if(nombreAleatoire_kill == 2) {
	   		 if(message.content.startsWith(prefix + "kill <@368832865850621952>")){
			message.reply("ERREUR 666: Le tir n'est pas effectué !");
			message.reply("Vous allez vous faire **bombarder** votre maison dans 5 minutes !");
		 }else{
			 if(message.content.startsWith(prefix + "kill <@363466789042126858>")){
			message.reply("ERREUR 666: Le tir n'est pas effectué !");
			message.reply("<@363466789042126858> vient d'appeler des **renforts** pour vous arréter pour tentative d'attentat !");
		 }else{
     message.reply(message.mentions.members.first() + " n'es pas mort ! Par contre, il à tuer "+ message.author);
		 } }
   } else if(nombreAleatoire_kill == 3) {
	   		 if(message.content.startsWith(prefix + "kill <@368832865850621952>")){
			message.reply("ERREUR 666: Le tir n'est pas effectué !");
			message.reply("Vous allez vous faire **bombarder** votre maison dans 5 minutes !");
		 }else{
			 if(message.content.startsWith(prefix + "kill <@363466789042126858>")){
			message.reply("ERREUR 666: Le tir n'est pas effectué !");
			message.reply("<@363466789042126858> vient d'appeler des **renforts** pour vous arréter pour tentative d'attentat !");
		 }else{
   	  message.reply("ERREUR 666: Le tir n'est pas effectué !");
		 } }
   }
   message.delete();
 }
 
	if(message.content === "Demande d'aide"){
		  message.reply("Bonjour, comment puis-je vous aider ?" + "```CallStaff - Appeler un membre de l'équipe```") ;
		  message.delete();
		} if(message.content === "CallStaff") {
			  message.reply("Ceci est encore en développement !") ;
			  message.delete();
			}
 });
 
 client.on('guildMemberAdd', member => {
	let autorole = JSON.parse(fs.readFileSync("./autoRole.json", "utf8"));
var defaultmodrole = 'membres';
var autoRole;
if(autorole[member.guild.id]){
var autoRole = autorole[member.guild.id].autoRole;
}else{
var autoRole = 'membres';
}
 let guild = member.guild;
  member.addRole(member.guild.roles.find("name", `${autoRole}`));

});
  
client.login(process.env.TOKEN)
