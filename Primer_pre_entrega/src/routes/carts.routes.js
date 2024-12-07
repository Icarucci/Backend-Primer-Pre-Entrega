import { Router } from 'express';
import { __dirname } from '../path.js';
import { promises as fs} from 'fs';
import CartManager from '../services/CartManager.js';
import ProductManager from '../services/ProductManager.js';

export const cartsRouter = Router()

//Importamos clase Manager - CartManager.js
const cartManager = new CartManager()
const productManager = new ProductManager()


cartsRouter.get('/:id', (req, res) =>{
    const cart = cartManager.getCartById(req.params.id);
    if(cart){
        res.status(200).send({productos: cart.product, message: `Id de carrito: ${req.params.id}`});
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
})

cartsRouter.post('/', async (req, res) => {
    try{
        const newCart = await cartManager.addCart();
        res.status(201).send(newCart);
    }
    catch(error){
        res.status(500).json({ message: 'Error al crear el carrito', error });
    }

})
cartsRouter.post('/:cartid/products/:id', async (req, res,)=>{
    try {
        const producto = await productManager.getProductById(parseInt(req.params.id));
        console.log(producto);
        const { quantity } = req.body;
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }else{
        const newProductAdd = await cartManager.addProductToCart(producto.id, quantity, req.params.cartid)
        console.log(newProductAdd);
        res.status(200).send({producto : newProductAdd, message: 'Producto agregado'});
        }
        
    } catch (error) {
        res.status(404).json({ message: 'El carrito no existe', error})
    }
}
)


