// ABSTRACTION
function repeatLog(n) {
    for (let i = 0; i < n; i++) {
        console.log(i)
    }
}

// repeatLog(10)

function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i)
    }
}
// repeat(10, console.log)

// Creating function value on the spot
let labels = []
repeat(5, i => labels.push(`Unit ${i + 1}`))
// labels.forEach(i => console.log(i)) --> Unit 1, Unit 2, ...

// HIGHER-ORDER FUNCTION
// Functions that return function values
function greaterThan(n) {
    return m => m > n
}
let greaterThan10 = greaterThan(10)
// console.log(greaterThan10(5)) --> false

// Functions that change other functions
function noisy(f) {
    return (...args) => {
        console.log("calling with", args)
        let result = f(...args)
        console.log("called with", args, " returned", result)
        return result
    }
}
// noisy(Math.min)(3, 2, 1)
// --> calling with [3, 2, 1]
// --> called with [3, 2, 1] returned 1

// Functions that provides new types of control flow
function unless(test, then) {
    if (!test) then()
}
repeat(3, n => unless(n % 2 == 1, () => console.log(n, "is even")))

// Built-in array method, `forEach`
let ab = ["A", "B"]
ab.forEach(i => console.log(i))


// SCRIPT DATASET
const SCRIPTS = require("./scripts.js") 

// Filtering arrays
function filter(array, test) {
    let filtered_array = new Array()
    for (let ele of array) {
        if (test(ele)) {
            filtered_array.push(ele)
        }
    }
    return filtered_array
}

// Transforming with map
function map(array, transform) {
    let transformed = new Array()
    for (let ele of array) {
        transformed.push(transform(ele))
    }
    return transformed
}

// Summarizing with reduce
function reduce(array, combine, start) {
    let current = start
    for (let ele of array) {
        current = combine(current, ele)
    }
    return current
}
console.log(reduce([4, 5, 19, 23], (a, b) => a + b, 0))

// Find the script with most character
function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => count + (to -from), 0)
}

let mostCharacterScript = SCRIPTS.reduce((a, b) => characterCount(a) > characterCount(b) ? a : b)
// console.log(mostCharacterScript) ---> {name: "Han", ...}


// COMPOSABILITY
function average(array) {
    return array.reduce((a, b) => a + b) / array.length
}
let average_year_of_living_langs = Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year)))
let average_year_of_dead_langs   = Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year)))
console.log(`Average year of living languages is ${average_year_of_living_langs}`)
console.log(`Average year of dead languages is ${average_year_of_dead_langs}`)


// STRINGS AND CHARACTER CODES
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => code >= from && code < to)) {
            return script
        }
    }
    return null
}

// Emojis
let horseShoe = "🐴👟"
// console.log(horseShoe.length)
// --> 🐴
// --> 👟

// Loop over a string to gain access to real characters
let roseDragon = "🌹🐉"
for (let char of roseDragon) {
    // console.log(char)
}
// --> 🌹
// --> 🐉

// RECOGNIZING TEXT
function countBy(items, groupName) {
    let counts = new Array()
    for (let item of items) {
        let name = groupName(item)
        let known = counts.findIndex(c => c.name === name)
        if (known === -1) {
            counts.push({name, count: 1})
        } else {
            counts[known].count++
        }
    }
    return counts
}
// console.log(countBy([1, 2, 3, 4, 5], n => n > 2))  --> [ { name: false, count: 2 }, { name: true, count: 3 } ]

function textScripts(text) {
    // Counts characters by associated script's name and filter out characters that dont belong to any scripts
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))
        return script !== null ? script.name : "none"
    }).filter(({name}) => name !== "none")

    // Computes total number of characters that belong to a script
    let total = scripts.reduce((n, {count}) => n + count, 0)
    if (total == 0) return "No script found"

    return scripts.map(({name, count}) => {
        return `${Math.round(count * 100 / total)}% ${name}`
    }).join(", ")
}
// console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// --> "61% Han, 22% Latin, 17% Cyrillic"

// EXERCISES
// Flattening
function flatten(arr) {
    return arr.reduce((total, ele) => Object.getPrototypeOf(ele) === Array.prototype ? total.concat(ele) : total.push(ele), new Array())
}
// console.log(flatten([[1, 2, 3], [4, 5], [6]])) --> [1, 2, 3, 4, 5, 6]

// Customized loop
function loop(value, test, update, body) {
    for (let i = value; test(i); i = update(i)) {
        body(i)
    }
}
// console.log(loop(3, n => n > 0, n => n - 1, console.log))
// --> 3
// --> 2
// --> 1
// --> undefined

// Everything
function every(array, test) {
    let passed = array.map(ele => test(ele))
    return passed.filter(s => !s).length > 0 ? false : true
}
// console.log(every([1, 3, 5], n => n < 10))   --> true
// console.log(every([2, 4, 16], n => n < 10))  --> false
// console.log(every([], n => n < 10))          --> true

// Dominant writing direction
function dominantDirection(text) {
    // Counts the character by their scripts
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))
        return script !== null ? script.direction : "none"
    }).filter(s => s !== "none")

    // Computes the most dominant text direction
    let dominantDirection = scripts.reduce((a, b) => a.count > b.count ? a : b)["name"]

    // Return the result
    return dominantDirection

}

// console.log(dominantDirection("Hello!"))             --> "ltr"
// console.log(dominantDirection("Hey, مساء الخير"))    --> "rtl"

