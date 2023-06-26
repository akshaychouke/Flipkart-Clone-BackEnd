import mongoose from "mongoose";
//basic structure for the collection in the database
const productSchema = new mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

//creating the model here the product is name of the collection
const products = mongoose.model('product', productSchema);  

export default products;