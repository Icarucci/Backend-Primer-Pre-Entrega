import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';


//Preparar el router para las rutas
const viewRouter = Router();

//Importamos clase Manager - ProductManager.js
const productManager = new ProductManager()

// Aca van todas las APIS
//Listar
viewRouter.get('/' , async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined
        const products = await productManager.getAllProducts(limit)
        res.render('templates/home', { products })
    } catch (error) {
        console.log(error);
    }
})

//Obtener un producto por ID
viewRouter.get('/:pid' , async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if(!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render("templates/home", { product })
    } catch (error) {
        console.log(error);
    }
})


export default viewRouter;