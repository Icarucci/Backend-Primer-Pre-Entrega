import express from 'express';
import productsRouter from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { Server } from 'socket.io';
import { create } from 'express-handlebars';

const app = express();
const hbs = create();

//Preparar config 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

//Routers
app.get('ping' , (req, res) => {
    res.send('pong');
})
app.use('/api/products' , productsRouter);
app.use('/api/cart' , cartsRouter);



const SERVER_PORT = 8080;
//app.listen(SERVER_PORT, () => {
//    console.log("Servidor escuchando por el puerto: "+ SERVER_PORT);
//});

const server = app.listen(SERVER_PORT,() => {
    console.log(`Servidor corriendo en puerto: ${SERVER_PORT}`);
});

const io = new Server (server);

//Websocket
let messages = [];

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado', socked.id);

    socket.on('mensaje', (data) => {
        console-console.log("Mensaje recibido; ", data);
        messages.push(data);
        socket.emit('Respuesta', message);
    });
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado', socket.id);
    });
});