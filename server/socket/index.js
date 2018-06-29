module.exports = io => {
  io.on('connection', serverSocket => {
    console.log(`A socket connection to the server has been made: ${serverSocket.id}`)

    serverSocket.on('draw-from-client', (start, end, strokeColor, lineWidth) => {
      serverSocket.broadcast.emit('draw-from-server', start, end, strokeColor, lineWidth)
    })

    serverSocket.on('disconnect', () => {
      console.log(`Connection ${serverSocket.id} has left the building`)
    })
  })
}
