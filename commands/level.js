const { MessageEmbed } = require('discord.js')

exports.run = (client, msg, args) => {
	let user = msg.mentions.users.first() || msg.guild.members.cache.find(mem => mem.user.username.toLowerCase() === args.join(" ").toLowerCase()) || msg.guild.members.cache.get(args[0])
	if (!user) user = msg.author
    const xpForLevel = level => Math.ceil(level*level*100);
    const calcLevel = xp => Math.floor(0.1*Math.sqrt(xp));
    const curLevel = calcLevel(client.profile.get(`${msg.guild.id}-${user.id}`, "levelpoints")) // 2
    const pointsNeeded = xpForLevel(curLevel + 1);
    let embed = new MessageEmbed()
    .setAuthor(user.tag, user.displayAvatarURL)
    .setColor("RANDOM")
    .setDescription(`Level: **` + client.profile.get(`${msg.guild.id}-${user.id}`, "level") + '**' + '\n' + `XP: ${client.profile.get(`${msg.guild.id}-${user.id}`, "levelpoints")}/${pointsNeeded} (${pointsNeeded - client.profile.get(`${msg.guild.id}-${user.id}`, "levelpoints")} needed)`)
    
    msg.channel.send(embed)

}

module.exports.help = {
    name:"level",
    usage: "!level"
  }