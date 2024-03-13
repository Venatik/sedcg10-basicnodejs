import ProductModel from "../models/product.model.js";
import { v4 as uuidv4 } from "uuid";

// The service is responsive for all business logic
// Business logic is the logic that is not generic, yet specific to the application (this implementation)
// The service doesn't care who calls it, it just does its job
// The service doesn't care where we get the data from, which database we use, etc.

export default class ProductService {
    static async getProducts() {
        // Get all products from the Model. We don't care where does the Model get the data from
        return await ProductModel.getAll();
    }

    static async getProduct(id) {
        const product = await ProductModel.getById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    static async createProduct(body) {
        const product = {
            ...body,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
        }

        return ProductModel.create(product);
    }

    static async updateProduct(id, body) {
        const product = await ProductModel.getById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        const updatedProduct = {
            ...body,
            id,
            updatedAt: new Date().toISOString(),
        }

        return await ProductModel.update(id, updatedProduct);
    }

    static async updateProductPrice(id, price) {
        const product = await ProductModel.getById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        const updatedProduct = {
            ...product,
            price,
            id,
            updatedAt: new Date().toISOString(),
        };

        return await ProductModel.update(id, updatedProduct);
    }

    static async deleteProduct(id) {
        return await ProductModel.delete(id);
    }
}