import express from 'express';
import productsRouter from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { Server } from 'socket.io';
import { create } from 'express-handlebars';
import path from 'path';
import { __dirname } from './path.js';
import viewRouter from './routes/view.routes.js';
import fs from 'fs/promises';


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
app.use('/home' , viewRouter)
app.use('/realTimeProducts' , viewRouter);
app.use('/public', express.static(__dirname + '/public'));


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


io.on('connection', async (socket) => {

    console.log('Un usuario se ha conectado', socket.id);

    //Cargar productos desde el archivo JSON a penas inicio el servidor
    // Función para cargar productos desde el archivo JSON
const loadProducts = async () => {
    const productosFilePath = path.resolve('data', 'productos.json');
    try {
        const data = await fs.readFile(productosFilePath, 'utf-8');
        return JSON.parse(data); // Devuelve los productos cargados desde el archivo
    } catch (error) {
        console.error("Error al leer productos:", error);
        return []; // Si hay error, devolver un arreglo vacío
    }
};
        const products = await loadProducts();
        socket.emit('productosIniciales', products);

    socket.on('mensaje', (data) => {
        console.log("Mensaje recibido; ", data);
        messages.push(data);
        socket.emit('Respuesta', message);
    });
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado', socket.id);
    });


    socket.on('borrarproducto', async (id) => {
        const productosFilePath = path.resolve('data', 'productos.json');
        const data = await fs.readFile(productosFilePath, 'utf-8');
        const products = JSON.parse(data);
        const productosActualizados = products.filter(producto => producto.id !== parseInt(id.id));
        await fs.writeFile(productosFilePath, JSON.stringify(productosActualizados, null, 2));
        socket.emit('productoEliminado', data.id);
        console.log('Se eliminó el producton con la id:', id.id);
        console.log(productosActualizados);
    })

    socket.on('agregarProducto', async (nuevoProducto) => {
        const productosFilePath = path.resolve('data', 'productos.json');
        const data = await fs.readFile(productosFilePath, 'utf-8');
        const products = JSON.parse(data);
    
        let newId = 1;
        
        // Si hay productos en el archivo, se calcula la nueva ID
        if (products.length > 0) {
            
            let lastProductId = products[products.length - 1].id;
            newId = lastProductId + 1;
    
            while (products.some(product => product.id === newId)) {
                newId++;
            }
        }
        const productoConId = { ...nuevoProducto, id: newId };
        products.push(productoConId);
        await fs.writeFile(productosFilePath, JSON.stringify(products, null, 2));
    
        socket.emit('productoAgregado', productoConId);
        console.log('Nuevo producto agregado:', productoConId);
        
    });
});



