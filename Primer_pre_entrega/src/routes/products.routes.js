import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';
const router = Router();

//Importamos clase Manager - ProductManager.js
const productManager = new ProductManager()

// Aca van todas las APIS
//Listar
router.get('/' , async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined
        const products = await productManager.getAllProducts(limit)
        res.json(products)
    } catch (error) {
        console.log(error);
    }
})

//Obtener un producto por ID
router.get('/:pid' , async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if(!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(products)
    } catch (error) {
        console.log(error);
    }
})

//Crear un producto
router.post('/' , async (req, res) => {
    try {
        const { titulo, descripcion, codigo, precio, stock, categoria, imagen} = req.body
        if(!titulo || !descripcion || !codigo || !precio || !stock || !categoria ) {
            return res.status(400).json({ error: 'Todos los campos son requeridos excepto Imagen'});
        }

        const newProduct = await productManager.addProduct({ titulo, descripcion, codigo, precio, stock, categoria, imagen});

        res.status(201).json(newProduct)


    } catch (error) {
        console.log(error);
    }
})


//Actualizar un producto por ID
router.put('/:pid' , async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        const product = await productManager.updateProduct(productId, req.body);
        if (updateProduct) {
            res.json(updateProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado'});
        }

    } catch (error) {
        console.log(error);
    }
})

//Eliminar un producto por ID
router.delete('/:pid' , async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deleteProduct = await productManager.deleteProduct(productId);
        if (deleteProduct) {
            res.json(deleteProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado'});
        }
    } catch (error) {
        console.log(error);
        
    }
})


export default router;