const tmi = require('tmi.js')
const axios = require('axios')

module.exports = async () => {
  console.log('CREATING NEW TWITCHBOT')
  // Valid commands start with:
  let commandPrefix = '!'

  // Get all active channels
  // TODO: change this link to make it work in deployed version
  const {data} = await axios.get(`http://localhost:${process.env.PORT}/api/users/active`)
  const channels = data.map((user) => {
    return user.twitchLogin
  })
  const opts = {
    identity: {
      username: 'musicvoteb0t',
      password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels
  }

    // .then((res) => {
    //   return res.data.map((user) => {
    //     return user.twitchLogin
    //   })
    // })
    // .then((myChannels) => {
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  
  // Define configuration options:
  console.log('channels', channels)

  // These are the commands the bot knows (defined below):
  let knownCommands = { echo, musicvote, random }

  // Function called when the "echo" command is issued:
  function echo (target, context, params) {
    // console.log('target', target)
    // console.log('context', context)
    // If there's something to echo:
    if (params.length) {
      // Join the params into a string:
      const msg = params.join(' ')
      // Send it back to the correct place:
      sendMessage(target, context, msg)
    } else { // Nothing to echo
      console.log(`* Nothing to echo`)
    }
  }

  function random (target, context, params) {
    console.log('target', target)
    console.log('context', context)
    console.log('random')
    // TODO: replace socket stuff with database calls

    // io.emit('random')
  }

  async function musicvote (target, context, params) {
    if (params.length) {
      if (parseInt(params[0])) {
        // TODO: change link
        const {data} = await axios.get(`http://localhost:${process.env.PORT}/api/users/username/${target.slice(1)}/enum/${params[0]}`)
        await axios.post(`http://localhost:${process.env.PORT}/api/votes`, {votechoiceId: data.id})
      }
    }
  }

  // Helper function to send the correct type of message:
  function sendMessage (target, context, message) {
    if (context['message-type'] === 'whisper') {
      client.whisper(target, message)
    } else {
      client.say(target, message)
    }
  }

  // Create a client with our options:
  let client = new tmi.client(opts)

  // Register our event handlers (defined below):
  client.on('message', onMessageHandler)
  client.on('connected', onConnectedHandler)
  client.on('disconnected', onDisconnectedHandler)

  // Connect to Twitch:
  client.connect()

  // Called every time a message comes in:
  function onMessageHandler (target, context, msg, self) {
    if (self) { return } // Ignore messages from the bot

    // This isn't a command since it has no prefix:
    if (msg.substr(0, 1) !== commandPrefix) {
      console.log(`[${target} (${context['message-type']})] ${context.username}: ${msg}`)
      return
    }

    // Split the message into individual words:
    const parse = msg.slice(1).split(' ')
    // The command name is the first (0th) one:
    const commandName = parse[0]
    // The rest (if any) are the parameters:
    const params = parse.splice(1)

    // If the command is known, let's execute it:
    if (commandName in knownCommands) {
      // Retrieve the function by its name:
      const command = knownCommands[commandName]
      // Then call the command with parameters:
      command(target, context, params)
      console.log(`* Executed ${commandName} command for ${context.username}`)
    } else {
      console.log(`* Unknown command ${commandName} from ${context.username}`)
    }
  }

  // Called every time the bot connects to Twitch chat:
  function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`)
  }

  // Called every time the bot disconnects from Twitch:
  function onDisconnectedHandler (reason) {
    console.log(`Womp womp, disconnected: ${reason}`)
    process.exit(1)
  }
}

const getActiveUsers = async () => {
  return await axios.get(`http://localhost:${process.env.PORT}/api/users/active`)
}
