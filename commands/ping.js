module.exports = {
    name: "ping",
    description: "answers with pong",
    execute(message, client){
        message.channel.send("pong")
    }
}