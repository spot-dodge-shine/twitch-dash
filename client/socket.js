import io from 'socket.io-client'
import { events } from './components/whiteboard/whiteboard-dashboard'

const clientSocket = io(window.location.origin)

clientSocket.on('connect', () => {
  console.log('Connected!')
  events.on('draw', (start, end, strokeColor, lineWidth, room) => {
    console.log('emitting draw', start, end, strokeColor, lineWidth, room)
    clientSocket.emit('draw-from-client', start, end, strokeColor, lineWidth, room)
  })
})

export default clientSocket
