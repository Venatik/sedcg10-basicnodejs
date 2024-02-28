const greetUser = (userName) => {
    console.log(`Hello, ${userName}! Welcome to the app!`);
}

export const password = "1234";

export { greetUser };

// module.exports = greetUser;  // This is the same as export default greetUser; in ES6