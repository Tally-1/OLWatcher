module.exports = {
    name: "logUserAction",
    description: "sends a log message into the console explaining the action requested by a user",
    execute(message, action, finalStatusMessage){
        let logMessage = "\n\n  User: " + message.author.username + "#" + message.author.discriminator + " \n " +
        " User ID: " + message.author.id + " \n " +
        " server ID: " + message.channel.guildId + " \n " +
        " channel ID: " + message.channel.id + " \n " +
        " Message ID: " + message.id + " \n " +
        " action: "+action+ " \n " +
        finalStatusMessage;
        
        console.log(logMessage);
    }}