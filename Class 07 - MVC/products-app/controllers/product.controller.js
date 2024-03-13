import ProductService from "../services/product.service.js";

// This is the products controller
// It's main responsibility is to:
// 1. receive the request
// 2. return a response
//   - Positive response if all goes well
//   - Negative response (error) if something goes wrong (ex. product can't be found)

export default class ProductController {
    // Each route gets its own controller method
    // Each method handles request and response
    // In each method we ALWAYS handle two cases:
    // 1. SUCCESS - try block - when everything goes right
    // 2. FAILURE - catch block - when error occurs

    static async getProducts(req, res) {
        try {
            const products = await ProductService.getProducts();
            res.send(products); // status 200 will be sent by default
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async getProduct(req, res) {
        try {
            const product = await ProductService.getProduct(req.params.id);
            res.send(product);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async createProduct(req, res) {
        try {
            const productBody = req.body;
            const product = await ProductService.createProduct(productBody);
            res.status(201).send(product);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async updateProduct(req, res) {
        try {
            const product = await ProductService.updateProduct(req.params.id, req.body);
            res.send(product);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async updateProductPrice(req, res) {
        try {
            const product = await ProductService.updateProductPrice(req.params.id, req.body.price);
            res.send(product);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async deleteProduct(req, res) {
        try {
            await ProductService.deleteProduct(req.params.id);
            res.status(204).send({ message: "Product deleted" });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}