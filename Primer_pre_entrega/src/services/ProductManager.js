import fs from 'fs/promises';
import path from 'path';

const productosFilePath = path.resolve('data', 'productos.json'); // Indica que va a ir a la carpeta data y va a buscar el archivo productos.json

export default class ProductManager {

//Constructor
constructor(){
    this.products = [];
    this.init();
}

async init() {
    try {
        const data = await fs.readFile(productosFilePath, 'utf-8');
        this.products = JSON.parse(data);
    } catch (error) {
        this.products = [];
    }
}

//Metodos
async saveToFile() {
    const jsonData = JSON.stringify(this.products, null, 2);
    await fs.writeFile(productosFilePath, jsonData);
}

//getAllProducts
async getAllProducts(limit) {
    if(limit) {
        return this.products.slice(0, limit);
    }
    return this.products;
}

//getProductsById
async getProductById(id) {
    return this.products.find(product => product.id === id);
}
//addProduct
async addProduct(product) {
    const newProduct = {
        id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
        ...product,
        status: true,
    }
    // Lo guardo en el array
    this.products.push(newProduct);

    this.saveToFile() // hacer guardado en el archivo con la funcion saveToFile

    return newProduct
}
//updateProduct
async updateProduct(id, updateFields) {
    const productIndex = this.products.findIndex( product => product.id === id);
    if (productIndex === -1) return null;

    const updateProduct = {
        ...this.products[productIndex],
        ...updateFields,
        id: this.products[productIndex].id,
    };
    
    this.products[productIndex] = updateProduct;
    this.saveToFile()
    return updateProduct;
}

//deleteProduct
    deleteProduct(id) {
        const productIndex = this.products.findIndex( product => product.id === id);
        if (productIndex === -1) return null;

        const deleteProduct = this.products.splice(productIndex, 1);
        this.saveToFile()
        return deleteProduct[0];
    }


}