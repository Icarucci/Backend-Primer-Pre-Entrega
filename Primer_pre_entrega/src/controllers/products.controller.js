import { productsModel } from "../models/products.model.js";

export const getProducts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined
        const prods = await productsModel.find().limit(limit)
        res.status(200).render("templates/home", {products: prods });
    } catch (error) {
        res.status(500).send('Error al obtener los productos')
    }
}

export const getProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsModel.findById(productId)
        if(!product) {
            return res.status(404).send('Producto no encontrado');
        }
        return res.status(200).render("templates/home", {product: product });
    } catch (error) {
        res.status(500).send('Error al obtener el producto')
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const respuesta = await productsModel.create(product);
        res.status(201).send({message: "Producto creado correctamente", product: respuesta });
    
    } catch (error) {
        res.status(500).send('Error al crear el producto')
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = request.params.id;
        const updateProduct = req.body;
        const respuesta = await productsModel.findByIdAndUpdate(id, updateProduct);
        res.status(200).send({message: "Producto actualizado", respuesta})
    } catch (error) {
        res.status(500).send('Error al actualizar el producto')
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await productsModel.findByIdAndDelete(id);
        res.status(200).send({ message: "Producto eliminado", respuesta})
    } catch (error) {
        res.status(500).send('Error al borrar el producto')
    }
}
