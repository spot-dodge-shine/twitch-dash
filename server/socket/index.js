module.exports = io => {
  io.on('connection', serverSocket => {
    console.log(`A socket connection to the server has been made: ${serverSocket.id}`)

    serverSocket.on('join-room', room => {
      serverSocket.join(room)
      console.log('joined room', room)
    })

    serverSocket.on('draw-from-client', (start, end, strokeColor, lineWidth, room) => {
      serverSocket.broadcast.emit('draw-from-server', start, end, strokeColor, lineWidth)
    })

    serverSocket.on('disconnect', () => {
      console.log(`Connection ${serverSocket.id} has left the building`)
    })
  })
}
