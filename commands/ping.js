const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
let users={};


module.exports = {
    data: new SlashCommandBuilder()
        .setName('sans')
        .setDescription('理智满了会提醒你哦!')
        .addIntegerOption(option => option.setName('理智剩余').setDescription('理智剩余')),

        //.addUserOption(option => option.setName('目标').setDescription('目标（选自己）')),
    async execute(interaction,client) {
        const integer = interaction.options.getInteger('理智剩余');
        const user = interaction.user;
        if (user&&(integer>=0)&&(integer<=135)){
            if (users[user]){
                await interaction.reply('收到，倒计时已更新！');
            }else {
                await interaction.reply('收到！');
            }
            let x = Date()
            users[user]=x;
            await wait((135-integer)*6*60*1000);
            if (users[user]===x){
                await client.channels.cache.get('933472514028494899').send(`清理智啦！${user}`);
            }
        }else {
            await interaction.reply('输入有误!');
        }
    },
};
