module.exports = {
    name: "updateUserDB",
    description: "Updates user-database",
    execute(message, client) {
        message.channel.guild.members.list({ limit: 1000 }).then(memberList => {
    
            for(let member of memberList){
                
                
                 let getUser = client.users.fetch(member[0]);
                 getUser.then(function(userObject) {
                    
                    client.functions.get("userUpdate").execute(userObject, message);    
                    
                 });
                
                
            }
        })
    }}