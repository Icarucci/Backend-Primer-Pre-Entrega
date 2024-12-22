import { Schema, model } from'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
    categoria: { type: String, required: true },
    imagen: { type: [String], default: [] },
    status: { type: Boolean, default: true },
});

productSchema.plugin(mongoosePaginate);
export const productsModel = model("products", productSchema);