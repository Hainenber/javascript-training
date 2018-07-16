// METHODS
let rabbit = {}
rabbit.speak = (line) => console.log(`The rabbit says ${line}`)
rabbit.speak("chirp chirp")

// `this` keyword
function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`)
}
let whiteRabbit = {type: "white", speak}
let hungryRabbit = {type: "hungry", speak}
whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!")
hungryRabbit.speak("I could use some carrots right now.")

// Special case of arrow functions
function normalize() {
    console.log(this.coords.map(n => n/ this.length))
}
normalize.call({coords: [0, 2, 3], length: 5})

// PROTOTYPES
let empty = {}
console.log(empty.toString)
// Ancestral prototype of all objects in JS: Object.prototype
console.log(Object.getPrototypeOf(empty) === Object.prototype)
// Prototypes of some objects
let arr_proto = Object.getPrototypeOf([]) === Array.prototype // --> true
let func_proto = Object.getPrototypeOf(() => null) === Function.prototype // --> true
// Create an object with specific prototype
let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`)
    }
}
let killerRabbit = Object.create(protoRabbit)
killerRabbit.type = "killer"
killerRabbit.speak("SKREEEEE!")

// CLASSES
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit)
    rabbit.type = type
    return rabbit
}
let zenRabbit = makeRabbit("peace")
zenRabbit.speak("I come for peace")

// Pre-ES6 constructor syntax
// function Rabbit(type) {
//     this.type = type
// }
// Rabbit.prototype.speak = function(line) {
//     console.log(`The ${this.type} rabbits says ${line}`)
// }
// let weirdRabbit = new Rabbit("weird")

// CLASS NOTATION
class Rabbit {
    constructor(type) {
        this.type = type
    }
    
    speak(line) {
        console.log(`The ${this.type} says ${line}`)
    }
}

let killingRabbit = new Rabbit("killer")
let blackRabbit = new Rabbit("black")
blackRabbit.origin = "UK"

// Overriding derived properties
Rabbit.prototype.teeth = "small"
// console.log(killingRabbit.teeth) --> "small"
killingRabbit.teeth = "long, sharp, and bloody"
// console.log(killingRabbit.teeth) --> "long, sharp, and bloody"

// MAPS
// Using object as Map data structure could be harmful as its prototype can 
// have unexpected property, violating access rule of typical Map data structure
let ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62
}
// console.log(`Julia is ${ages["Julia"]}`)                         // --> "Julia is 62"
// console.log(`Is Jack's age known? ${"Jack" in ages}`)            // --> "Is Jack's age known? false"
// console.log(`Is toString's age known? ${"toString" in ages}`)    // --> "Is toString's age known? true"

// Map class
let ages_map = new Map()
ages_map.set("Boris", 20)
ages_map.set("Liang", 31)
ages_map.set("Julia", 35)
// console.log(`Julia is ${ages_map.get["Julia"]}`)                       // --> "Julia is 62"
// console.log(`Is Jack's age known? ${ages_map.has("Jack")}`)            // --> "Is Jack's age known? false"
// console.log(`Is toString's age known? ${ages_map.has("toString")}`)    // --> "Is toString's age known? false"

// Use `Object.keys()` or `hasOwnProperty` to look for the object's own keys, not of prototype
// console.log(ages.hasOwnProperty("Boris"))            // --> true
// console.log(ages.hasOwnProperty("toString"))         // --> false
// console.log(Object.keys(ages).includes("Boris"))     // --> true
// console.log(Object.keys(ages).includes("toString"))  // --> false

// POLYMORPHISM
Rabbit.prototype.toString = function() {
    return `a ${this.type} rabbit`
}
console.log(killingRabbit.toString())

// SYMBOLS
let sym = Symbol("name")
// Multiple name-similar symbols within one object 
const toStringSymbol = Symbol("toString")
Array.prototype[toStringSymbol] = function() {
    return `${this.length} cm of blue yarn`
}
// console.log([1, 2].toString())          // --> "1,2"
// console.log([1, 2][toStringSymbol]())   // --> "2cm of blue yarn"

// Inclusion of symbol in object declaration with surrounding square bracket
let stringObject = {
    [toStringSymbol]() {
        return "a jute rope"
    }
}

// console.log(stringObject[toStringSymbol]())  // --> "a jute rope" 


// THE ITERATOR INTERFACE
// `for/of` loop only iterate an object if `Symbol.iterator`-identified method is present
let okIterator = "OK"[Symbol.iterator]()
// console.log(okIterator.next())   // --> {value: 'O', done: false}
// console.log(okIterator.next())   // --> {value: 'K', done: false}
// console.log(okIterator.next())   // --> {value: undefined, done: true}

// Matrix class
class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width
        this.height = height
        this.content = new Array()

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y)
            }
        }
    }

    get(x, y) {
        return this.content[y * this.width + x]
    }

    set(x, y, value) {
        this.content[y * this.width + x] = value
    }
}

class MatrixIterator {
    constructor(matrix) {
        this.x = 0
        this.y = 0
        this.matrix = matrix
    }

    next() {
        if (this.y === this.matrix.height) return {done: true}
        
        let value = {
            x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)
        }

        this.x++
        if (this.x === this.matrix.width) {
            this.x = 0
            this.y++
        }

        return {value, done: false}
    }
}

// Assign Iterable interface to Matrix class
Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this)
}

// Testing
// let matrix = new Matrix(2, 3, (x, y) => `value ${x}, ${y}`)
// for (let {x, y, value} of matrix) {
//     console.log(x, y, value)
// }

class RealMatrix {
    constructor(row, column, element = (x, y) => undefined) {
        this.row = row
        this.column = column
        this.matrix = new Array()

        for (let x = 0; x < row; x++) {
            this.matrix.push(new Array())
            let vector = this.matrix[x]
            for (let y = 0; y < column; y++) {
                vector[y] = element(x, y)
            }
        }
    }

    get(x, y) {
        return matrix[x][y]
    }

    set(x, y, value) {
        matrix[x][y] = value
    }

    [Symbol.iterator]() {
        return class RealMatrixIterator {
            constructor(matrix) {
                this.x = 0
                this.y = 0
                this.matrix = matrix
            }
            
            next() {
                if (this.y === this.matrix.row) return {done: true}
                let value = {
                    x: this.x,
                    y: this.y,
                    value: this.matrix.get(x, y)
                }
                // TODO: Finish the Iterator interface for RealMatrix class
            }
        }
    }
}


// GETTERS, SETTERS, AND STATICS
// Getters
let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100)
    }
}
console.log(varyingSize.size)

// Setters and Statics
class Temperature {
    constructor(celsius) {
        this.celsius = celsius
    }
    get fahrenheit() {
        return this.celsius * 1.8 + 32
    }
    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8
    }
    static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8)
    }
}
let temp = new Temperature(22)
console.log(temp.fahrenheit)
temp.fahrenheit = 86
console.log(temp.celsius)


// INHERITANCE
class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x)
            else return element(x, y)
        })
    }

    set(x, y, value) {
        super.set(x, y, value)
        if (x != y) {
            super.set(y, x, value)
        }
    }
}

// EXERCISES
// A Vector type
class Vec {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(vec) {
        let new_x = this.x + vec.x
        let new_y = this.y + vec.y
        return new Vec(new_x, new_y)
    }

    minus(vec) {
        let new_x = this.x - vec.x
        let new_y = this.y - vec.y
        return new Vec(new_x, new_y)
    }

    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)))
console.log(new Vec(1, 2).minus(new Vec(2, 3)))
console.log(new Vec(3, 4).length)

// Groups
class Group {
    constructor() {
        this.group = new Array()
    }

    add(value) {
        if (!this.group.includes(value)) {
            this.group.push(value)
        }
    }

    delete(value) {
        this.group = this.group.filter(n => n !== value)
    }

    has(value) {
        return this.group.some(n => n === value)
    }

    static from(iterable) {
        let new_group = new Group()
        for (let ele of iterable) {
            new_group.group.push(ele)
        }
        return new_group
    }
    
    [Symbol.iterator]() {
        return new GroupIterator(this)
    }
}

let group = Group.from([10, 20])
// console.log(group.has(10)) // --> true
// console.log(group.has(30)) // --> false
group.add(10)
group.delete(10)
// console.log(group.has(10)) // --> false

// Iterable groups
class GroupIterator {
    constructor(group) {
        this.group = group
        this.index = 0
    }
    next() {
        if (this.index >= this.group.group.length) return {done: true}
        let value = {
            value: this.group.group[this.index]
        }
        this.index++
        return {value, done: false}
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value)
}

// Borrowing a method
let map = {one: true, two: true, hasOwnProperty: true}

Object.prototype.hasOwnProperty.call(map, key) {
    return this.hasOwnProperty(key)
}

console.log(map.hasOwnProperty("one"))

