const Discord = require("discord.js");
	function ban(message,prefix,client){
    
     if(message.content.startsWith(prefix +'ban')){
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `manage-guild` dans ce serveur**").catch(console.error);
if(message.mentions.users.size === 0) {
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
}
let banMember = message.guild.member(message.mentions.users.first());
if(!banMember) {
  return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**");
}
if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
  return message.reply("**:x: Je n'ai pas la permission pour ban...**").catch(console.error);
}
         
banMember.ban().then(member => {
    const embed = new Discord.RichEmbed()
	   .setColor("#4B63EC")
    .addField("Banned", "Un utilisateur a ete banni" + member.user.tag)
     message.member.guild.channels.find("name", "logs").sendEmbed(embed)
		message.delete();
        });
      }
    }

    module.exports = ban