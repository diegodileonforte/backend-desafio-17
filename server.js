import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { sqlite3, mysql } from './db/config.js'
import router from './routes/productos.routes.js';

import {createTableMessage, newMessage} from './controllers/Mensaje.js';
createTableMessage(sqlite3)


import { createTableProd, get} from './controllers/Producto.js';
createTableProd(mysql)

let productoEnDB = await get()

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', router);

let mensajesDB = []

io.on('connection', socket => {
    console.log(`Cliente ID:${socket.id} inició conexión`)
    socket.emit('message', mensajesDB)
    socket.emit('all-productos', productoEnDB)

    socket.on('new-message', async (data) => {
        mensajesDB.push(data)
        await newMessage(data)
        io.sockets.emit('message', mensajesDB )
    });

    io.sockets.emit('all-productos', productoEnDB)
    socket.on('update', () => {
        io.sockets.emit('updateProductos', productoEnDB)
    })
});

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));



