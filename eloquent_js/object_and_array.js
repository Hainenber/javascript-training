let journal = []

var JOURNAL = require("./journal.js")

function addEntry(events, squirrel) {
    journal.push({events, squirrel})
}

function phi([n00, n01, n10, n11]) {
    return (n11 * n00 - n10 * n01) / Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10))
}

function tableFor(event, journal) {
    let table = [0, 0, 0, 0]
    for (let entry of journal) {
        let index = 0
        if (entry.events.includes(event)) index += 1
        if (entry.squirrel) index += 2
        table[index] += 1
    }
    return table
}

function journalEvents(journal) {
    let events = new Array()
    for (let entry of journal) {
        for (let event of entry.events) {
            if (!events.includes(event)) {
                events.push(event)
            }
        }
    }
    return events
}

// for (let event of journalEvents(JOURNAL)) {
//     let correlation = phi(tableFor(event, JOURNAL))
//     if (correlation > 0.1 || correlation < -0.1) {
//         console.log(`${event}: ${correlation}`)
//     }
// }

// for (let entry of JOURNAL) {
//     if (entry.events.includes("peanuts") && !entry.events.includes("brushed teeth")) {
//         entry.events.push("peanut teeth")
//     }
// }

// console.log(phi(tableFor("peanut teeth", JOURNAL)))

// FURTHER ARRAYOLOGY
let todoList = []

function remember(task) {
    todoList.push(task)
}

function getTask() {
    return todoList.shift()
}

function rememberUrgently(task) {
    todoList.unshift(task)
}

// REST parameter
function max(...numbers) {
    let result = -Infinity
    for (let number of numbers) {
        if (number > result) result = number
    }
    return result
}

let ab = Array.from({length: 10}, () => Math.floor(Math.random() * 200))
// console.log(ab)
// console.log(`max of ab is ${max(...ab)}`)

// Sum of a range
function range(start, end, step = 1) {
    let range = new Array()
    if (start <= end) {
        for (let i = start; i <= end; i += step) {
            range.push(i)
        }
    } else {
        for (let i = start; i >= end; i += step) {
            range.push(i)
        }
    }
    return range
}

function sum(range) {
    let sum = 0
    for (let ele of range) {
        sum += ele
    }
    return sum
}

// console.log(range(1, 10))
// console.log(range(5, 2, -1))
// console.log(sum(range(1, 10)))

// Reversing an array
function reverseArray(arr) {
    let reversed_arr = new Array()
    for (let ele of arr) {
        reversed_arr.unshift(ele)
    }
    return reversed_arr
}

function reverseArrayInPlace(arr) {
    let start_index = 0, end_index = arr.length - 1
    while (start_index < end_index) {
        let temp = arr[end_index]
        arr[end_index] = arr[start_index]
        arr[start_index] = temp
        start_index++
        end_index--
    }
    return arr
}

// console.log(reverseArray([1, 2, 3]))
// console.log(reverseArrayInPlace([1,2,3,5]))

// A List
function arrayToList(arr) {
    if (arr.length === 0) {
        return {}
    } else if (arr.length === 1) {
        return {value: arr[0], rest: null}
    } else {
        return {value: arr[0], rest: arrayToList(arr.slice(1))}
    }
}

function listToArray(list) {
    if (Object.keys(list).includes("value") && Object.keys(list).includes("rest")) {
        let array = [list["value"]]
        let current_ref = list["rest"]
        while (current_ref !== null) {
            array.push(current_ref["value"])
            current_ref = current_ref["rest"]
        }
        return array
    } else {
        return new Array()
    }
}

function prepend(ele, list) {
    return {value: ele, rest: list}
}

function nth(list, index) {
    function nthHelper(nh_list, nh_index, nh_inc_index) {
        if (Object.keys(nh_list).includes("value") && Object.keys(nh_list).includes("rest")) {
            if (nh_list["rest"] !== null) {
                if (nh_inc_index === nh_index) {
                    return nh_list["value"]
                } else if (nh_inc_index < nh_index) {
                    return nthHelper(nh_list["rest"], nh_index, nh_inc_index + 1)
                }
            }
            return undefined
        }
    }

    return nthHelper(list, index, 0)
}

// let test_list = arrayToList([10, 5, 2, 3, 4])
// console.log(arrayToList([10, 2, 3]))
// console.log(`1th element of test_list is ${nth(test_list, 0)}`)

// console.log(arrayToList([1, 2, 3]))
// console.log(arrayToList([]))
// console.log(arrayToList([1]))

// console.log(listToArray(arrayToList([10, 2, 13])))
// console.log(listToArray(arrayToList([2])))
// console.log(listToArray(arrayToList([])))

// console.log(prepend(4, test_list))

// Deep comparison
function deepEqual(obj1, obj2) {
    let type_obj1 = typeof obj1, type_obj2 = typeof obj2
    if (type_obj1 === "string" && type_obj2 === "string") {
        return obj1 === obj2
    } else if (type_obj1 === "number" && type_obj2 === "number") {
        return obj1 === obj2
    } else if (type_obj1 === "boolean" && type_obj2 === "boolean") {
        return obj1 === obj2
    } else if (obj1 !== null || obj2 !== null) {
        if (type_obj1 === "object" && type_obj2 === "object") {
            let deep_comparison_result = new Array()
            for (let key of Object.keys(obj1)) {
                if (!Object.keys(obj2).includes(key)) {
                    return false
                } else {
                    deep_comparison_result.push(deepEqual(obj1[key], obj2[key]))
                }
            }
            console.log(deep_comparison_result)
            if (deep_comparison_result.includes(false)) {
                return false
            } else {
                return true
            }
        }
    } else if (obj1 === null && obj2 === null) {
        return obj1 === obj2
    }
}

let obj = {here: {is: "an"}, object: 2}
console.log(deepEqual(obj, obj))
console.log(deepEqual(obj, {here: 1, object: 2}))