import express from 'express';
import { getAllProducts, getProductById } from '../controllers/products';

export default (router: express.Router) => {

    // Route to get all products
    router.get('/products', getAllProducts);

    // Route to get a product by ID
    router.get('/products/:id', getProductById);

};
