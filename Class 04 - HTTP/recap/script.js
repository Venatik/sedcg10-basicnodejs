let a1 = [1, 2, 3]
let a2 = a1;
a2 = [4, 5, 6];

console.log("a1:", a1); // [1, 2, 3]
console.log("a2:", a2); // [4, 5, 6]

// Define constants
const hoursPerDay = 2;
const workingDaysPerWeek = 5;
const weeksPerYear = 52;

// Calculate total hours
const totalHours = hoursPerDay * workingDaysPerWeek * weeksPerYear;
console.log(totalHours);