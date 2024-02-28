import fs from "fs";

// Function to read all users from a file
const readUsersFromFile = () => {
    const existingUsers = fs.readFileSync("users.json", "utf8");
    return JSON.parse(existingUsers);
};

// Function to add users to a file
// get users from users.json = as array
// push the new user to the array
// stringify the data to JSON format
// write the data to the file
const addUser = (user) => {
    const existingUsers = readUsersFromFile();

    console.log(user);
    existingUsers.push(user);
    const updatedUsersJSON = JSON.stringify(existingUsers);
    fs.writeFileSync("users.json", updatedUsersJSON);

    console.log("Additional user added to the users.json file.");
};

export { readUsersFromFile, addUser, fs };