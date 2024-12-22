import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';
import { viewProducts } from '../controllers/products.controller.js';
import { viewCart } from '../controllers/cart.controller.js';


//Preparar el router para las rutas
const viewRouter = Router();

//Importamos clase Manager - ProductManager.js
const productManager = new ProductManager()

// Aca van todas las APIS
//Listar
viewRouter.get('/products' , viewProducts)

//Obtener un producto por ID
viewRouter.get('/products/:pid' , viewProducts)

//Obtener el carrito
viewRouter.get('/:cartId' , viewCart)

//Obtener RealTimeProducts
viewRouter.get('/', async (req, res) => {
    try {
        const products = await productManager.getAllProducts();
        res.status(200).render('templates/realTimeProducts', { products , js:'realTime.js' } );
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener el RealTimeProducts');
    }
});


export default viewRouter;