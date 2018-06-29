import io from 'socket.io-client'
import { events } from './components/whiteboard/whiteboard-dashboard'

const clientSocket = io(window.location.origin)
const roomName = window.location.pathname

clientSocket.on('connect', () => {
  console.log('Socket connected!')
  clientSocket.emit('join-room', roomName)
})

events.on('draw', (start, end, strokeColor, lineWidth, room) => {
  clientSocket.emit('draw-from-client', start, end, strokeColor, lineWidth, room)
})

export default clientSocket
