import express from 'express';
import productsRouter from './routes/products.routes.js';

const app = express();

//Preparar config 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
app.get('ping' , (req, res) => {
    res.send('pong');
})
app.use('/api/products' , productsRouter);



const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: "+ SERVER_PORT);
});