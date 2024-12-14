import express from 'express';
import axios from 'axios';

const router = express.Router();

// Function to get all products
export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Internal Server Error
    }
};

// Function to get a product by ID
export const getProductById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Internal Server Error
    }
};

export default router;
