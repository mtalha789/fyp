import { createServer } from 'http'
import app from './app'
import { Server } from 'socket.io'

const server = createServer(app)

const io = new Server(server,{
    cors : {
        origin : 'http://localhost:3000',
        credentials : true,
    }
})

server.listen(3001, () => {
    console.log('Server started on port 3001')
})