import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';


const cartFilePath = path.resolve('data', 'carritos.json'); // Indica que va a ir a la carpeta data y va a buscar el archivo carritos.json

export default class CartManager {

//Constructor
constructor(){
    this.carts = [];
    this.init();
}

async init() {
    try {
        const data = await fs.readFile(cartFilePath, 'utf-8');
        this.carts = JSON.parse(data);
    } catch (error) {
        this.carts = [];
    }
}

//Metodos
async saveToFile() {
    const jsonData = JSON.stringify(this.carts, null, 2);
    await fs.writeFile(cartFilePath, jsonData);
}

//getCartsById
async getCartById(id) {
    return this.carts.find(cart => cart.id === id);
}

//addCart
async addCart() {
    const newCart = {
        id: crypto.randomBytes(5).toString('hex'),
        products: []
    }
    // Lo guardo en el array
    this.carts.push(newCart);

    this.saveToFile() // hacer guardado en el archivo con la funcion saveToFile

    return newCart
}

//addProductToCart
async addProductToCart(productId, cantidad, cartId){
    const product = {
        productId,
        cantidad
    }
    const cart = this.carts.find(cart => cart.id === cartId);
    cart.products.push(product);

    this.saveToFile() // hacer guardado en el archivo con la funcion saveToFile

    return product;
}
}