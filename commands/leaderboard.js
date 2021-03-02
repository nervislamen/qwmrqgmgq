
const { MessageEmbed } = require('discord.js')
const { util } = require('discord.js-commando')
exports.run = (client, msg, args) => {
  
    if (!args[0]) args[0] = 1

    let page = args[0]
    let thing = 1;
    let data = client.profile.filter(p => p.guild === msg.guild.id).array()
    let d = data.sort((a, b) => b.level - a.level)
    const paginated = util.paginate(d, page, Math.floor(10))
    let embed = new MessageEmbed()
    .setTitle(`Level Leaderboard for ${msg.guild.name}! 📋`)
    .setColor("RANDOM")
    .setDescription(paginated.items.map(user => 
    
        client.users.cache.get(user.id) ? `${thing++}. ` + `**${client.users.cache.get(user.id).tag}** \`${user.level}\` 🔰` : "Unknown User").join("\n"))
        msg.channel.send(embed)

}

module.exports.help = {
    name:"leaderboard",
    usage:"!leaderboard <page>",
  }
