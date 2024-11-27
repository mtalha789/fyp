import { createServer } from 'http'
import app from './app'
import { Server } from 'socket.io'
import { initializeSocketIo } from './socket'
import { verifyUser } from './middlewares/authSocket.middleware'

const server = createServer(app)

const io = new Server(server,{
    cors : {
        origin : ['http://localhost:5713','http://192.168.0.142:5173/'],
        credentials : true,
    }
})

app.set('io',io)
// io.use(verifyUser)
initializeSocketIo(io)
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`)
})
// app.listen( 3000, '0.0.0.0', () => {
//     console.log(`Server started on port ${process.env.PORT || 3000}`)
// })