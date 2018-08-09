import io from 'socket.io-client'
import { whiteboardEvents } from './components/widgets/whiteboard'
import { gameboyEvents } from './components/widgets/gameboy'

const clientSocket = io(window.location.origin)
const roomName = window.location.pathname

clientSocket.on('connect', () => {
  console.log('Socket connected!')
  clientSocket.emit('join-room', roomName)
})

whiteboardEvents.on('draw', (start, end, strokeColor, lineWidth, room) => {
  clientSocket.emit('draw-from-client', start, end, strokeColor, lineWidth, room)
})

whiteboardEvents.on('fill', (fillColor, room) => {
  clientSocket.emit('fill-from-client', fillColor, room)
})

whiteboardEvents.on('clear', room => {
  clientSocket.emit('clear-from-client', room)
})

gameboyEvents.on('load-file', (userId, filename, binaryString) => {
  clientSocket.emit('load-file-client', userId, filename, binaryString)
})

gameboyEvents.on('pause-resume', userId => {
  clientSocket.emit('pause-resume-client', userId)
})

gameboyEvents.on('reset', userId => {
  clientSocket.emit('reset-client', userId)
})

export default clientSocket
