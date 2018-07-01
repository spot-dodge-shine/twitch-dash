import io from 'socket.io-client'
import { events } from './components/whiteboard/whiteboard-dashboard'
import { gameboyEvents } from './components/gameboy/gameboy-dashboard'

const clientSocket = io(window.location.origin)
const roomName = window.location.pathname

clientSocket.on('connect', () => {
  console.log('Socket connected!')
  clientSocket.emit('join-room', roomName)
})

events.on('draw', (start, end, strokeColor, lineWidth, room) => {
  clientSocket.emit('draw-from-client', start, end, strokeColor, lineWidth, room)
})

events.on('fill', (fillColor, room) => {
  clientSocket.emit('fill-from-client', fillColor, room)
})

events.on('clear', room => {
  clientSocket.emit('clear-from-client', room)
})

gameboyEvents.on('test', userId => {
  clientSocket.emit('test-from-client', userId)
})

export default clientSocket
