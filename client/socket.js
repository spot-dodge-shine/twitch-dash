import io from 'socket.io-client'
import { events } from './components/whiteboard/whiteboard-dashboard'

const clientSocket = io(window.location.origin)
const roomName = window.location.pathname

clientSocket.on('connect', () => {
  console.log('Socket connected!')
  clientSocket.emit('join-room', roomName)
})

clientSocket.on('hello', () => {
  console.log('hello from the frontend!')
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

export default clientSocket
