const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = "$"//بريفكس بوتك
const db = require('quick.db')
console.log('alla yslmlk')
const channelss = ['']//ايدي الروم بتاعت لوق البان وفك البان
client.on("message", async message => {
  if(message.content.startsWith(prefix + "set-ch")){
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`تبغي تزرفني والله ما اشتغل`);
  if(message.author.bot)return
  let channel = message.mentions.channels.first();
  if(!channel)return message.channel.send("id Channel")
  db.set(`channel_${message.guild.id}` , channel.id)
  message.channel.send(`Done Has Been Added`).then(msg => msg.delete({timeout: 20000}));
}})


client.on('messageDelete', async message => {  
  let channel = await db.get(`channel_${message.guild.id}`)
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;  
  if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;  
  if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;  

  var logChannel = message.guild.channels.cache.find(c => c.id === channel);  
  if(!logChannel) return;  

  let messageDelete = new Discord.MessageEmbed()  
  .setColor(`#2f3136`)
  .setAuthor(`MessageDelete`, message.author.avatarURL({dynamic: true}))
  .setDescription(`Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
  .setTimestamp()
  .setThumbnail(`https://cdn.discordapp.com/emojis/863383452791734272.gif?size=80`)
  .setFooter(message.guild.name, message.guild.iconURL({dynamic: true})) 

  logChannel.send(messageDelete);
});
client.on('messageUpdate', async (oldMessage, newMessage) => {  
let channel = await db.get(`channel_${oldMessage.guild.id}`)
  if(oldMessage.author.bot) return;
  if(!oldMessage.channel.type === 'dm') return;
  if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;

  var logChannel = oldMessage.guild.channels.cache.find(c => c.id === channel);
  if(!logChannel) return;

  if(oldMessage.content.startsWith('https://')) return;  

  let messageUpdate = new Discord.MessageEmbed()
  .setAuthor(`MessageEdit`, oldMessage.author.avatarURL({dynamic: true}))
  .setThumbnail(`https://cdn.discordapp.com/emojis/854132515979919380.png?size=80`)
  .setColor(`#2f3136`)
  .setDescription(`\nSuccessfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
  .setTimestamp()
  .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL({dynamic: true})) 

  logChannel.send(messageUpdate);
});



client.on('roleCreate',async role => {
  let channel = await db.get(`channel_${role.guild.id}`)

  if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = role.guild.channels.cache.find(c => c.id === channel);
  if(!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor.id;
      var usertag = logs.entries.first().executor.tag;
      var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});

      let roleCreate = new Discord.MessageEmbed()
      .setAuthor(`Role Create`,userAvatar)
      .setThumbnail('https://cdn.discordapp.com/emojis/853547759269576715.png?size=80')  
      .setDescription(`\n **Info Of User:** \`\`\`CreatedBy: ${usertag} \nUserID: ${userID}\`\`\`
      **Info Of Role:** \`\`\`RoleName: ${role.name}\nRoleID: ${role.id}\`\`\``)
      .setColor(`#2f3136`)
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL({dynamic: true}))  
 
      logChannel.send(roleCreate);
  })
});
client.on('roleDelete', async role => {  
  let channel = await db.get(`channel_${role.guild.id}`)

  if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = role.guild.channels.cache.find(c => c.id === channel);
  if(!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor.id;
      var usertag = logs.entries.first().executor.tag;
      var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});

      let roleDelete = new Discord.MessageEmbed()
      .setAuthor('Role Delete', userAvatar)
      .setThumbnail(`https://cdn.discordapp.com/emojis/863383452791734272.gif?size=80`)  
      .setDescription(`\n **Info Of User:** \`\`\`DeletedBy: ${usertag} \nUserID: ${userID}\`\`\`
      **Info Of Role:** \`\`\`RoleName: ${role.name}\nRoleID: ${role.id}\`\`\``)
      .setColor(`#2f3136`)
      .setTimestamp()  
      .setFooter(role.guild.name, role.guild.iconURL)

      logChannel.send(roleDelete);  
  })
});
client.on('roleUpdate', async (oldRole, newRole) => {
  let channel = await db.get(`channel_${oldRole.guild.id}`)

  if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = oldRole.guild.channels.cache.find(c => c.id === channel);
  if(!logChannel) return;
 
  oldRole.guild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor.id;
      var usertag = logs.entries.first().executor.tag;
      var userAvatar = logs.entries.first().executor.avatarURL({dynamic: true});
 
      if(oldRole.name !== newRole.name) {
          let roleUpdateName = new Discord.MessageEmbed()
          .setAuthor('Role Name Update',userAvatar)  
          .setThumbnail('https://cdn.discordapp.com/emojis/854132515979919380.png?size=80')  
          .setColor(`#2f3136`)
          .setDescription(`\n **Info Of User:** \`\`\`UpdateBy: ${usertag} \nUserID: ${userID}\`\`\`
      **Info Of Role:** \`\`\`OldName: ${oldRole.name}\nNewRoleName: ${newRole.name}\nRoleID: ${oldRole.id}\`\`\``)
          .setTimestamp()
          .setFooter(oldRole.guild.name, oldRole.guild.iconURL({dynamic: true}))

          logChannel.send(roleUpdateName);  
      }
      if(oldRole.hexColor !== newRole.hexColor) {  
          if(oldRole.hexColor === '#000000') {  
              var oldColor = '`Default`';  
          }else {
              var oldColor = oldRole.hexColor;
          }    
          if(newRole.hexColor === '#000000') {  
              var newColor = '`Default`';  
          }else {
              var newColor = newRole.hexColor;  
          }  
          let roleUpdateColor = new Discord.MessageEmbed()  
          .setTitle('Role Color Update', userAvatar)  
          .setThumbnail('https://cdn.discordapp.com/emojis/911385098413281300.png?size=80')  
          .setColor(`#2f3136`)
          .setDescription(`\n **Info Of User:** \`\`\`UpdateBy: ${usertag} \nUserID: ${userID}\`\`\`
      **Info Of Role:** \`\`\`RoleName: ${oldRole.name}\nOldColor: ${oldColor}\nNewColor: ${newColor}\nRoleID: ${oldRole.id}\`\`\``)
          .setTimestamp()  
          .setFooter(oldRole.guild.name, oldRole.guild.iconURL({dynamic: true}))
 
          logChannel.send(roleUpdateColor);
      }
  })
});



client.on('channelCreate', async (channel) => { 
  if(!channel.guild) return;
  if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
  const channel2 = await db.get(`channel_${channel.guild.id}`)
  var logChannel = channel.guild.channels.cache.find(c => c.id === channel2);
  if(!logChannel) return;

  if(channel.type === 'text') {
      var roomType = 'Text';
  }else
  if(channel.type === 'voice') { 
      var roomType = 'Voice';
  }else
  if(channel.type === 'category') { 
      var roomType = 'Category';
  }

  channel.guild.fetchAuditLogs().then(logs => { 
      var userID = logs.entries.first().executor.id;  
      let channelCreate = new Discord.MessageEmbed() 
      .setTitle('Channel Create') 
      .setThumbnail('https://cdn.discordapp.com/emojis/872432417758121984.png?size=80')
      .setDescription(`\`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
      .setColor(`#2f3136`)
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL({dynamic: true}))

      logChannel.send(channelCreate);
  })
}); 
client.on('channelDelete',  async channel => { 

  if(!channel.guild) return;
  if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
  const channel2 = await db.get(`channel_${channel.guild.id}`)
  var logChannel = channel.guild.channels.cache.find(c => c.id === channel2);
  if(!logChannel) return; 

  if(channel.type === 'text') { 
      var roomType = 'Text';
  }else
  if(channel.type === 'voice') { 
      var roomType = 'Voice';
  }else
  if(channel.type === 'category') { 
      var roomType = 'Category';
  }

  channel.guild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor.id;
      var userAvatar = logs.entries.first().executor.avatarURL;

      let channelDelete = new Discord.MessageEmbed()
      .setTitle('Chanel Delete')
      .setThumbnail(userAvatar) 
      .setDescription(`\`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
      .setColor(`#2f3136`)
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL)

      logChannel.send(channelDelete); 
  })
});
client.on('channelUpdate', async (oldChannel, newChannel) => {
    let channel = await db.get(`channel_${oldChannel.guild.id}`)
  if(!oldChannel.guild) return;

  var logChannel = oldChannel.guild.channels.cache.find(c => c.id === channel);
  if(!logChannel) return;

  if(oldChannel.type === 'text') {
      var channelType = 'Text';
  }else
  if(oldChannel.type === 'voice') {
      var channelType = 'Voice';
  }else
  if(oldChannel.type === 'category') {
      var channelType = 'Category';
  }
 
  oldChannel.guild.fetchAuditLogs().then(logs => { 
      var userID = logs.entries.first().executor.id;
      var userAvatar = logs.entries.first().executor.avatarURL;

      if(oldChannel.name !== newChannel.name) {
          let newName = new Discord.MessageEmbed()
          .setTitle('CHANNEL EDIT')
          .setThumbnail(userAvatar)
          .setColor(`#2f3136`)
          .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
          .setTimestamp() 
          .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL) 

          logChannel.send(newName); 
      }
      if(oldChannel.topic !== newChannel.topic) { 
          let newTopic = new Discord.MessageEmbed() 
          .setTitle('CHANNEL EDIT') 
          .setThumbnail(userAvatar)
          .setColor(`#2f3136`)
          .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
          .setTimestamp()
          .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

          logChannel.send(newTopic);
      }
  })
});

client.on('guildBanAdd', async(guild, user) => {
if (!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
if (!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
  var logChannel = guild.channels.cache.find(c => c.id === channelss); 
  if(!logChannel) return;
let embed = new Discord.MessageEmbed()
.setColor(`#2f3136`)
.setTitle('New User Banned')
.setThumbnail('https://cdn.discordapp.com/emojis/888952938800762950.png?size=80')
.setDescription(`** Successfully Banned User:** \`\`\`${user.tag}\`\`\` `)
.setTimestamp()
.setFooter(guild.name, guild.iconURL({dynamic: true}))
logChannel.send(embed)
})
 
client.on('guildBanRemove', async(guild, user) => {
if (!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
if (!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
  var logChannel = guild.channels.cache.find(c => c.id === channelss); 
  if(!logChannel) return;
let embed = new Discord.MessageEmbed()
.setColor(`#2f3136`)
.setTitle('New User UnBanned')
.setThumbnail('https://cdn.discordapp.com/emojis/863372572010479637.gif?size=80')
.setDescription(`** Successfully Unbanned From:** \`\`\`${user.tag}\`\`\` `)
.setTimestamp()
.setFooter(guild.name, guild.iconURL())
logChannel.send(embed)
})

client.on('guildBanRemove', async (guild, user) => {
    let channel = await db.get(`channel_${user.guild.id}`)
  if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return; 
  if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = guild.channels.cache.find(c => c.id === channel); 
  if(!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor.id;
      var userAvatar = logs.entries.first().executor.avatarURL;

      let unBanInfo = new Discord.MessageEmbed()
      .setTitle('UnBanned')
      .setThumbnail('https://cdn.discordapp.com/emojis/863372572010479637.gif?size=80')
      .setColor(`#2f3136`)
      .setDescription(`\n**User:** ${user.username}\n**By:** <@${userID}> (ID: ${userID})`)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL({dynamic: true}))

      logChannel.send(unBanInfo);
  })
});
client.on('guildMemberUpdate', async (oldMember, newMember) => { 
    let channel = await db.get(`channel_${oldMember.guild.id}`)

  var logChannel = oldMember.guild.channels.cache.find(c => c.id === channel); 
  if(!logChannel) return;

  oldMember.guild.fetchAuditLogs().then(logs => {
      var userID = logs.entries.first().executor.id; 

      if(oldMember.nickname !== newMember.nickname) {
          if(oldMember.nickname === null) {
              var oldNM = '\`\`Original Name\`\`';
          }else {
              var oldNM = oldMember.nickname;
          }
          if(newMember.nickname === null) {
              var newNM = '\`\`Original Name\`\`'; 
          }else {
              var newNM = newMember.nickname;
          }
          let updateNickname = new Discord.MessageEmbed()
          .setTitle('Update Mmember Nickname')
          .setThumbnail('https://cdn.discordapp.com/emojis/863383470717534208.gif?size=80')
          .setColor(`#2f3136`)
          .setDescription(`\n**User:** ${oldMember}\n**Old Nickname:** \`\`\`${oldNM}\`\`\`\n**New Nickname:** \`\`\`${newNM}\`\`\`\n**By:** <@${userID}>`)
          .setTimestamp()
          .setFooter(oldMember.guild.name, oldMember.guild.iconURL({dynamic: true}))

          logChannel.send(updateNickname)
      }})
})
client.on('guildMemberAdd', async member => {
    let channel = await db.get(`channel_${member.guild.id}`)
var logChannel = member.guild.channels.cache.find(c => c.id === channel); 
if(!logChannel) return;

let newMember = new Discord.MessageEmbed()
.setTitle('New Mmember Joined') 
.setThumbnail('https://cdn.discordapp.com/emojis/899050879511035944.png?size=80')
.setColor(`#2f3136`)
.setDescription(`Joined **${member.user.username}** To the server!\n**Joined Discord: ${Days(member.user.createdAt)},(<t:${parseInt(member.user.createdAt / 1000)}:R>)**
\`\`\`User: ${member.user.tag}\nUserID: ${member.user.id}\n\`\`\` `)
.setTimestamp()
.setFooter(member.user.tag, member.user.avatarURL({dynamic: true}))

logChannel.send(newMember);
});
function Days(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
}
client.on('guildMemberRemove', async member => { 
    let channel = await db.get(`channel_${member.guild.id}`)
var logChannel = member.guild.channels.cache.find(c => c.id === channel); 
if(!logChannel) return; 

let leaveMember = new Discord.MessageEmbed()
.setTitle('New Mmember Leave Lol')
.setThumbnail('https://cdn.discordapp.com/emojis/863496676621549569.gif?size=80')
.setColor(`#2f3136`)
.setDescription(`Leave **${member.user.username}** From the server.!\n**Joined Discord: ${Days(member.user.createdAt)},(<t:${parseInt(member.user.createdAt / 1000)}:R>)**
\`\`\`User: <@${member.user.tag}>\nUserID: ${member.user.id}\n\`\`\` `)
.setTimestamp() 
.setFooter(member.user.tag, member.user.avatarURL({dynamic: true}))

logChannel.send(leaveMember);
});

client.on('voiceStateUpdate', async (voiceOld, voiceNew) => {
  let channel = await db.get(`channel_${voiceOld.guild.id}`)

  if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
  if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

  var logChannel = voiceOld.guild.channels.cache.find(c => c.id === channel);
  if(!logChannel) return;
/*//تحت الصيانة
  voiceOld.guild.fetchAuditLogs().then(logs => {
      var userID = voiceOld.author

      if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
          let = serverMutev = new Discord.MessageEmbed()
          .setTitle('Voice Mute')
          .setThumbnail('https://cdn.discordapp.com/emojis/863316829715955783.gif?.size=80')
          .setColor(`#2f3136`)
          .setDescription(`**User:** <@${voiceOld.user}> (ID: ${voiceOld.user})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.channel.name}\`\` (ID: ${voiceOld.channel})`)
          .setTimestamp()

          logChannel.send(serverMutev);
      }

      if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
          let serverUnmutev = new Discord.MessageEmbed()
          .setTitle('Voice Unmute')
          .setThumbnail('https://cdn.discordapp.com/emojis/863316828256337920.gif?size=80')
          .setColor(`#2f3136`)
          .setDescription(`**User:** <@${voiceOld.author.name}> (ID: ${voiceOld.user})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.channel.name}\`\` (ID: ${voiceOld.channel})`)
          .setTimestamp()

          logChannel.send(serverUnmutev);
      }

      if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
          let serverDeafv = new Discord.MessageEmbed()
          .setTitle('VOICE DEAFEN')
          .setThumbnail('https://cdn.discordapp.com/emojis/889519299776110733.png?size=80')
          .setColor(`#2f3136`)
          .setDescription(`**User:** <@${voiceOld.user}> (ID: ${voiceOld.user})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.channel.name}\`\` (ID: ${voiceOld.channel})`)
          .setTimestamp()

          logChannel.send(serverDeafv);
      }

      if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
          let serverUndeafv = new Discord.MessageEmbed() 
          .setTitle('Voice UnDefen')
          .setThumbnail('https://cdn.discordapp.com/emojis/889519299436359760.png?size=80')
          .setColor(`#2f3136`)
          .setDescription(`**User:** <@${voiceOld.user}> (ID: ${voiceOld.user})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.channel.name}\`\` (ID: ${voiceOld.channel})`)
          .setTimestamp()

          logChannel.send(serverUndeafv); 
      }
  })
*/
  if(voiceOld.channelID !== voiceNew.channelID && !voiceOld.channel) {
      let voiceJoin = new Discord.MessageEmbed()
      .setTitle('Join Voice Room')
      .setColor(`#2f3136`)
      .setThumbnail('https://cdn.discordapp.com/emojis/863316830633197578.gif?size=80')
      .setDescription(`\n\`\`\`ChannelName: ${voiceNew.channel.name}\nChannelID: ${voiceNew.channelID}\nUserID: ${voiceOld.id}\`\`\` `)
      .setTimestamp()
      logChannel.send(voiceJoin);
  }

  if(voiceOld.channelID !== voiceNew.channelID && !voiceNew.channel) {
      let voiceLeave = new Discord.MessageEmbed()
      .setTitle('Leave Voice Room')
      .setColor(`#2f3136`)
      .setThumbnail('https://cdn.discordapp.com/emojis/853547756001296425.png?size=80')
      .setDescription(`\n\`\`\`ChannelName: ${voiceOld.channel.name}\nChannelID: ${voiceOld.channelID}\nUserID: ${voiceOld.id} \`\`\` `)
      .setTimestamp()

      logChannel.send(voiceLeave); 
  }
})
/*//تحت الصيانة
  if(voiceOld.channelID !== voiceNew.channelID && voiceNew.channel && voiceOld.channel != null) {
      let voiceLeave = new Discord.MessageEmbed()
      .setTitle('**[CHANGED VOICE ROOM]**')
      .setColor(`#2f3136`)
      .setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.channel.name}\`\` (ID: ${voiceOld.channelID})\n**To:** \`\`${voiceNew.channel.name}\`\` (ID: ${voiceNew.channelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
      .setTimestamp()
      logChannel.send(voiceLeave);
  }  
});
*/

client.login(process.env.token)