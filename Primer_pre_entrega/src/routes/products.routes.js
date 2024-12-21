import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.controller.js';


const router = Router();


//Importamos clase Manager - ProductManager.js
const productManager = new ProductManager()

// Aca van todas las APIS
//Listar
router.get('/' , getProducts)

//Obtener un producto por ID
router.get('/:pid' , getProduct)

//Crear un producto
router.post('/' , createProduct)


//Actualizar un producto por ID
router.put('/:pid' , updateProduct)

//Eliminar un producto por ID
router.delete('/:pid' , deleteProduct)


export default router;