// English alphabet consisted of both lowercase and uppercase
const alphabet = 
    new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i)).concat(
        new Array(26).fill(1).map((_, i) => String.fromCharCode(97 + i))
    )

// Alpha value, i.e size of alphabe
const alpha = 52

// Return an English letter's index in the alphabet
function char(x) {
    return alphabet.findIndex(i => i === x)
}

// Hash a string
function hash(x) {
    let hash_result = 0
    let x_length = x.length
    for (let index = 0; index < x.length; index++) {
        hash_result += Math.pow(alpha, x_length - (index + 1)) * char(x[index])
    }
    return hash_result
}

// Split the string into even-sized substring 
// Return an array of objects, each contain the substring and the prior letter
function stringPartitionForRabinKarp(string, length) {
    let partitions = new Array()
    let partition
    for (let index = 1; index <= string.length - length; index++) {
        partition = string.slice(index, index + length)
        partitions.push({partition, previous_letter: string[index - 1]})
    }
    return partitions
}

// Rabin-Karp
function rabinKarp(string, pattern) {
    // TODO :: Deploy modular arithmetic to hashed value of pattern string-sized substring
    // Compute the specific alpha value
    let precomputed_alpha = Math.pow(alpha, pattern.length - 1)
    // Chop the text string into even-sized substring called "windows"
    let chopped_string = stringPartitionForRabinKarp(string, pattern.length)
    // Hash the pattern string
    let hashed_pattern = hash(pattern)
    // Hash the first substring
    let hashed = hash(string.slice(0, pattern.length))
    
    // Compare the first string's hashed value and the pattern string's
    if (hashed === hashed_pattern) {
        for (let index = 0; index < pattern.length; index++) {
            if (window[index] !== pattern[index]) {
                break
            }
        }
        return true
    }
    
    
    // Iterate over the substring
    for (let window of chopped_string) {
        // Compute the hash value of current substring using hash value of previous substring
        hashed = alpha * (hashed - precomputed_alpha * char(window.previous_letter)) + char(window.partition[window.partition.length - 1])
        // Only compare the substring and the pattern letter-by-letter if their hash values are similar
        if (hashed === hashed_pattern) {
            for (let index = 0; index < pattern.length; index++) {
                if (window.partition[index] !== pattern[index]) {
                    break
                }
            }
            return true
        }
    }

    return false
}

let text_string = "ifthesetwostringsaredifferentthehashvalueswillalmostcertainlybedifferent"
let pattern_string = "willals"

console.log(rabinKarp(text_string, pattern_string))