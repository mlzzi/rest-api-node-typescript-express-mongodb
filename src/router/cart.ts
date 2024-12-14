import express from 'express';
import { getAllCartProducts, getCartProductById, addProductToCart, deleteCartProductById } from '../controllers/cart';

export default (router: express.Router) => {
    // Route to get all products in the cart
    router.get('/cart', getAllCartProducts);

    // Route to get a product in the cart by ID
    router.get('/cart/:id', getCartProductById);

    // Route to add a product to the cart
    router.post('/cart/:id', addProductToCart);

    // Route to delete a product from the cart by ID
    router.delete('/cart/:id', deleteCartProductById);
};
