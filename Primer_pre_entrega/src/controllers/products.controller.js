import { productsModel } from "../models/products.model.js";


export const getProducts = async (req, res) => {
    try {
        const {limit, page, filter, metfilter, order} = req.query ? parseInt(req.query.limit) : undefined
        const pag = page !== undefined ? page: 1
        const lim = limit !== undefined ? limit: 3
        const query = metfilter !== undefined ? {[metfilter]: filter} : {}
        const ord = order !== undefined ? {precio : order} : {}
        


        const prods = await productsModel.paginate(query, {limit: lim, page: pag, ord})
        res.status(200).send({products: prods });
    } catch (error) {
        res.status(500).send('Error al obtener los productos')
    }
}

export const viewProducts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined
        const prods = await productsModel.find().limit(limit).lean()
        res.status(200).render("templates/home", {products: prods });
    } catch (error) {
        res.status(500).render("templates/error")
    }
}

export const viewProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsModel.findById(productId)
        if(!product) {
            return res.status(404).render("templates/error");
        }
        return res.status(200).render("templates/home", {product: product });
    } catch (error) {
        res.status(500).send('Error al obtener el producto')
    }
}

export const getProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsModel.findById(productId)
        if(!product) {
            return res.status(404).send('Producto no encontrado');
        }
        return res.status(200).send({product: product });
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
