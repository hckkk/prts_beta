const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
token = process.env.DISCORD_TOKEN
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'GUILD_MEMBER', 'CHANNEL', 'REACTION'],

});
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction,client);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});
let admin;//get me
client.users.fetch('670504322684944396').then((res)=>{
    admin=res
});
let users={};
client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) {
        try {
            await reaction.message.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
        }
    }
    if (reaction.message.id == 937225782042968164) {
        if (users[user]){
            reaction.remove()
        }else {
            users[user]=1
            if (reaction.emoji.name == 'LDD') await reaction.message.guild.members.cache.get(user.id).roles.add('931753997390450740');
            if (reaction.emoji.name == 'QEWL') await reaction.message.guild.members.cache.get(user.id).roles.add('931752853972852787');
            if (reaction.emoji.name == 'KLMY') await reaction.message.guild.members.cache.get(user.id).roles.add('931753268772765727');
            if (reaction.emoji.name == 'LYSM') await reaction.message.guild.members.cache.get(user.id).roles.add('931753172593147964');
            if (reaction.emoji.name == 'SHLR') await reaction.message.guild.members.cache.get(user.id).roles.add('931753458795708496');
            if (reaction.emoji.name == 'WSS') await reaction.message.guild.members.cache.get(user.id).roles.add('931753413144883211');

        }
    }
    //console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) {
        try {
            await reaction.message.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
        }
    }
    if (reaction.message.id == 937225782042968164) {
        if (users[user]){
            delete users[user]
            if (reaction.emoji.name == 'LDD') await reaction.message.guild.members.cache.get(user.id).roles.remove('931753997390450740');
            if (reaction.emoji.name == 'QEWL') await reaction.message.guild.members.cache.get(user.id).roles.remove('931752853972852787');
            if (reaction.emoji.name == 'KLMY') await reaction.message.guild.members.cache.get(user.id).roles.remove('931753268772765727');
            if (reaction.emoji.name == 'LYSM') await reaction.message.guild.members.cache.get(user.id).roles.remove('931753172593147964');
            if (reaction.emoji.name == 'SHLR') await reaction.message.guild.members.cache.get(user.id).roles.remove('931753458795708496');
            if (reaction.emoji.name == 'WSS') await reaction.message.guild.members.cache.get(user.id).roles.remove('931753413144883211');
        }else{
            await client.channels.cache.get('933472514028494899').send(`err, should not reach here${admin}`)
        }
    }
});

client.login(token);
