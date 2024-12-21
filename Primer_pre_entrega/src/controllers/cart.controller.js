import { cartModel } from "../models/cart.model.js";

export const getCart = async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await cartModel.findById(id);
        if(respuesta){
            res.status(200).send(respuesta);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }    
    } catch (error) {
        res.status(404).send(error) 
    }
}

export const createCart = async (req, res) => {
    try {
        const respuesta = await cartModel.create({product: []})
        res.status(201).send({ message: 'Carrito creado correctamente', respuesta: respuesta});
    } catch (error) {
        res.status(404).send(error)  
    }
}
export const insertProductCart = async (req, res) => {
    try {
        const cartId = req.params.cartid
        const productId = req.params.id
        const {quantity} = req.body
        const cart = await cartModel.findById(cartId)
        const indice = cart.products.findIndex(product => product.id === productId)

        if(indice != -1){
            cart.products[indice].cantidad += quantity
            console.log("IF")
        }
        else {
            cart.products.push({productId: productId, cantidad: quantity})
            console.log("ELSE")
        }
        const respuesta = await cartModel.findByIdAndUpdate(cartId, cart);
        res.status(200).send({message: "Producto agregado correctamente", respuesta: respuesta});
     }

    catch (error) {
        res.status(404).send(error)  
    }
}
