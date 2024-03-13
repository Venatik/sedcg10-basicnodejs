import DataService from "../services/data.service.js";
import path from "path";
import { fileURLToPath } from "url";

const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl); // /e/SEDC/repos/sedcg10-basicnodejs/Class 07 - MVC/products-app/models/product.model.js
const projectPath = path.dirname(currentFilePath); // /e/SEDC/repos/sedcg10-basicnodejs/Class 07 - MVC/products-app/models
const productsPath = path.join(projectPath, "..", "data", "products.json");

export default class ProductModel {
    static async getAll() {
        return await DataService.readData(productsPath);
    }

    static async getById(id) {
        const products = await DataService.readData(productsPath);
        // const products = await this.getAll();
        const foundProduct = products.find((product) => product.id === id);
        return foundProduct;
    }

    static async create(body) {
        const products = await this.getAll();
        products.push(body);
        await DataService.writeData(productsPath, products);
        return body;
    }

    static async update(id, body) {
        const products = await this.getAll();
        const index = products.findIndex((product) => product.id === id);
        if (index < 0) {
            throw new Error("Product not found");
        }
        products[index] = body;
        await DataService.writeData(productsPath, products);
        return body;
    }

    static async delete(id) {
        const products = await this.getAll();
        const filteredProducts = products.filter((product) => product.id !== id);
        await DataService.writeData(productsPath, filteredProducts);
        // by convention nothing is returned when deleting
    }
}