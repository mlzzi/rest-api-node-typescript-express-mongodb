import express from 'express';
import { getProducts, getProductCartById, createProduct, deleteProductById, CartModel } from '../db/cart';
import axios from 'axios';

// Function to get all products in the cart
export const getAllCartProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Internal Server Error
    }
};

// Function to get a product in the cart by ID
export const getCartProductById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const product = await getProductCartById(id);
        if (!product) {
            res.sendStatus(404); // Not Found
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Internal Server Error
    }
};

// Function to add a product to the cart
export const addProductToCart = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        const { title, price, category } = response.data;
        console.log({ title, price, category });

        let product = await CartModel.findOne({ title: String(title) });

        if (product) {
            product.quantity += 1;
            await product.save();
        } else {
            await createProduct({ title, price, category });
        }
        res.status(201).json(product); // Created
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Internal Server Error
    }
};

// Function to delete a product from the cart by ID
export const deleteCartProductById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const product = await getProductCartById(id);

        if (product) {
            if (product.quantity > 1) {
                await product.quantity--;
                await product.save();
            } else {
                await deleteProductById(id);
            }
        }

        if (!product) {
            res.sendStatus(404); // Not Found
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Internal Server Error
    }
};
