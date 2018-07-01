module.exports = io => {
  io.on('connection', serverSocket => {
    console.log(`A socket connection to the server has been made: ${serverSocket.id}`)

    serverSocket.on('join-room', room => {
      console.log(room)
      serverSocket.join(room)
    })

    serverSocket.on('draw-from-client', (start, end, strokeColor, lineWidth, room) => {
      serverSocket.to(room).emit('draw-from-server', start, end, strokeColor, lineWidth)
    })

    serverSocket.on('fill-from-client', (fillColor, room) => {
      serverSocket.to(room).emit('fill-from-server', fillColor)
    })

    serverSocket.on('clear-from-client', room => {
      serverSocket.to(room).emit('clear-from-server')
    })

    serverSocket.on('test-from-client', userId => {
      console.log(userId)
      serverSocket.to(`/overlay/${userId}/3`).emit('test')
    })

    serverSocket.on('disconnect', () => {
      console.log(`Connection ${serverSocket.id} has left the building`)
    })
  })
}
