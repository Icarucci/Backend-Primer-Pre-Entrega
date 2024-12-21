import { Router } from 'express';
import { __dirname } from '../path.js';
import { promises as fs} from 'fs';
import CartManager from '../services/CartManager.js';
import ProductManager from '../services/ProductManager.js';
import { createCart, getCart, insertProductCart } from '../controllers/cart.controller.js';

export const cartsRouter = Router()

//Importamos clase Manager - CartManager.js
const cartManager = new CartManager()
const productManager = new ProductManager()


cartsRouter.get('/:id', getCart)

cartsRouter.post('/', createCart)

cartsRouter.post('/:cartid/products/:id', insertProductCart)


