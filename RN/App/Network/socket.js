import io from 'socket.io-client'

const socket = io('http://liuarui.top:8080', {
  path: '/test',
})

module.exports = socket
