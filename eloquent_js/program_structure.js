// BINDINGS
let caught = 5 * 5;
let ten = 10;
let mood = "light";
// console.log(mood); // --> "light"
// Mutable binding
let luigisDebt = 140;
luigisDebt -= 20;
// console.log(luigisDebt); // --> 120
// Multiple definiation of bindings
let one = 1, two = 2;
// console.log(one + two); // --> 3
// Similar keyword: `const` and `var`
var name = "Ayda";
const greeting = "Hello";
// Template literals
let greeting_string = `${greeting} ${name}`;
// console.log(greeting_string); // --> "Hello Ayda"

// FUNCTIONS
// Return values
let max_of_Four_and_Two = Math.max(4, 2);
let sum_of_min_of_Two_and_Four_with_One_Hundred = Math.min(2, 4) + 100;
// console.log(max_of_Four_and_Two); // --> 4
// console.log(sum_of_min_of_Two_and_Four_with_One_Hundred); // --> 102

// CONTROL FLOW
// Conditional execution
let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN())


