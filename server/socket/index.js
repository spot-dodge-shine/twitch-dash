module.exports = io => {
  io.on('connection', serverSocket => {
    console.log(`A socket connection to the server has been made: ${serverSocket.id}`)

    serverSocket.on('join-room', room => {
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

    serverSocket.on('load-file-client', (userId, filename, binaryString) => {
      serverSocket.to(`/overlay/${userId}/3`).emit('load-file-server', filename, binaryString)
    })

    serverSocket.on('pause-resume-client', userId => {
      serverSocket.to(`/overlay/${userId}/3`).emit('pause-resume-server')
    })

    serverSocket.on('reset-client', userId => {
      serverSocket.to(`/overlay/${userId}/3`).emit('reset-server')
    })

    serverSocket.on('disconnect', () => {
      console.log(`Connection ${serverSocket.id} has left the building`)
    })
  })
}
