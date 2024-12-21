import { Schema, model } from'mongoose';

const productSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
    categoria: { type: String, required: true },
    imagen: { default: []},
    status: { type: Boolean, default: true },
});

export const productsModel = model("products", productSchema);