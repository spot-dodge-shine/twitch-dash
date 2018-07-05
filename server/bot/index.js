const tmi = require('tmi.js')
const axios = require('axios')

module.exports = async (io) => {
  console.log('CREATING NEW TWITCHBOT')
  // Valid commands start with:
  let commandPrefix = '!'

  const appUrl = (process.env.NODE_ENV === 'production')
  ? `https://twitch-dash.herokuapp.com`
  : `http://localhost:${process.env.PORT}`

  // Get all active channels
  // TODO: change this link to make it work in deployed version
  const {data} = await axios.get(`${appUrl}/api/users/active`)
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

  // Define configuration options:
  console.log('channels', channels)

  // These are the commands the bot knows (defined below):
  let knownCommands = { echo, musicvote, random, gameboy, help }

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

  function help (target, context, params) {
    const helpMessage = 'Hello! This channel uses Twitch Dash to add a few features to the stream. There are two modules currently available to viewers: Spotify music voting and the Gameboy emulator. For more information, please access the help commands dedicated to these modules through `!musicvote help` and `!gameboy help`!'
    client.whisper(context.username, helpMessage)
  }

  function random (target, context, params) {
    console.log('target', target)
    console.log('context', context)
    console.log('random')
    // TODO: replace socket stuff with database calls

    // io.emit('random')
  }

  async function gameboy (target, context, params) {
    const { data } = await axios.get(`${appUrl}/api/users/twitch/${target.slice(1)}/`)
    const emitKey = keyCode => io.to(`/overlay/${data}/3`).emit('input-from-chat', keyCode)
    const gameboyHelp = 'Use the `!gameboy` command followed by a valid button input - for example, `!gameboy a` for pressing the a button. Valid button inputs are: a, b, up, down, left, right, start, and select. Please be sure to include a space and only use lowercase letters. Enjoy playing the game!'
    if (params.length) {
      switch (params[0]) {
        case 'help':
          client.whisper(context.username, gameboyHelp)
          break
        case 'up':
          emitKey('38')
          break
        case 'down':
          emitKey('40')
          break
        case 'left':
          emitKey('37')
          break
        case 'right':
          emitKey('39')
          break
        case 'a':
          emitKey('88')
          break
        case 'b':
          emitKey('90')
          break
        case 'start':
          emitKey('13')
          break
        case 'select':
          emitKey('16')
          break
        default:
          
      }
    }
  }

  async function musicvote (target, context, params) {
    const musicvoteHelp = 'Use the `!musicvote` command follow by a number between 1 and 3 to vote for the corresponding song choice displayed on stream. At the end of the current song, the song with the most number of votes will automatically play next!'
    if (params.length) {
      if (params[0] === 'help') {
        client.whisper(context.username, musicvoteHelp)
      }
      else if (parseInt(params[0])) {
        // TODO: change link
        const {data} = await axios.get(`${appUrl}/api/users/username/${target.slice(1)}/${params[0]}`)
        await axios.post(`${appUrl}/api/votes`, {votechoiceId: data.id})
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

  // Send help message
  setInterval(() => {
    console.log('interval')
    channels.forEach(channel => {
      client.say(channel, 'This channel uses Twitch Dash! Use command !help to learn more.')
    })
  }, 90000)

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
  return await axios.get(`${appUrl}/api/users/active`)
}
