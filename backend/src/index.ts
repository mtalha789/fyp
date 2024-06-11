import { createServer } from 'http'
import app from './app'
import { Server } from 'socket.io'
import { initializeSocketIo } from './socket'
import { verifyUser } from './middlewares/authSocket.middleware'

const server = createServer(app)

const io = new Server(server,{
    cors : {
        origin : 'http://localhost:3000',
        credentials : true,
    }
})

app.set('io',io)
io.use(verifyUser)
initializeSocketIo(io)
server.listen(process.env.PORT || 3001, () => {
    console.log(`Server started on port ${process.env.PORT || 3001}`)
})