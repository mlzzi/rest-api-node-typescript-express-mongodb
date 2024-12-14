import mongoose from "mongoose";

// Define the schema for the cart collection
const CartSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the product
    price: { type: Number, required: true }, // Price of the product
    category: { type: String, required: true }, // Category of the product
    quantity: { type: Number, required: true, default: 1 }, // Quantity of the product, defaults to 1
});

// Create the model for the cart collection
export const CartModel = mongoose.model('Cart', CartSchema);

// Function to retrieve all products from the cart
export const getProducts = () => CartModel.find();

// Function to retrieve a specific product from the cart by its ID
export const getProductCartById = (id: string) => CartModel.findById(id);

// Function to create and save a new product in the cart
export const createProduct = (values: Record<string, any>) => new CartModel(values)
    .save().then((product) => product.toObject());

// Function to delete a product from the cart by its ID
export const deleteProductById = (id: string) => CartModel.findOneAndDelete({ _id: id });
