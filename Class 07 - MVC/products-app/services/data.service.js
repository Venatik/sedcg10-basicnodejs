import fs from "fs/promises";

// We are going to store all the functions in a class
export default class DataService {
    static async readData(filePath) {
        const arr = await fs.readFile(filePath, "utf-8");
        return JSON.parse(arr);
    }

    // static means that the method is called on the class itself, not an instance of the class
    // DataService is a service class, so we don't need to create an instance of it to use its methods
    static async writeData(filePath, data = []) { // assigned an empty array as default value
        await fs.writeFile(filePath, JSON.stringify(data));
    }
}