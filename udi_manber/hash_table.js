class HashTable {
    constructor(input, size = 20, chaining=true, open_addressing=false) {
        this.alphabet =
            new Array(26).fill(1).map((_, i) => String.fromCharCode(97 + i)).concat(
                new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i))
            )
        this.alpha = 52
        if (size % 2 === 0) {
            this.size = size + 1
        }
        if (chaining) {
            this.table = this.make_2D_array(this.size)
            for (let index = 0; index < input.length; index++) {
                let hashed_ele = this.hash(input[index].key)
                let fitted_hashed_ele = Math.floor(hashed_ele % this.size)
                // Apply chaining to resolve collisions
                this.table[fitted_hashed_ele].push(input[index].value)
            }
        } else if (open_addressing) {
            // Deploy open addressing scheme
            if (input.length > this.size) {
                this.size = input.length + this.size
            }
            this.table = new Array(this.size).fill(null)
            for (let ele of input) {
                let hashed_ele = this.hash(ele)
                let fitted_hashed_ele = Math.floor(hashed_ele % this.size)
                // Apply sequential probing 
                let right_index = fitted_hashed_ele
                let inserted = false
                // Check the right wing
                while (right_index < this.size && !inserted) { 
                    if (this.table[right_index] === null) {
                        this.table[right_index] = ele
                        inserted = true
                    }
                    right_index++
                }

                // Check the left side if the right side are all occupied
                let left_index = fitted_hashed_ele
                if (!inserted) {
                    while (left_index >= 0) {
                        if (this.table[left_index] === null) {
                            this.table[left_index] = ele
                            break
                        }
                        left_index--
                    }
                }
            }
        }
    }

    char(x) {
        return this.alphabet.findIndex(i => i === x)
    }

    hash(x) {
        let hash_result = 0
        let x_length = x.length
        let charIndex
        for (let index = 0; index < x.length; index++ ) {
            charIndex = this.char(x[index])
            console.log(`x[index] = ${x[index]}, string[index] = ${charIndex}`)
            hash_result += Math.pow(this.alpha, x_length - (index + 1)) * this.char(x[index])
        }
        return hash_result
    }

    delete(key, value) {
        let fitted_hashed_key = Math.floor(this.hash(key) % this.size)
        this.table[fitted_hashed_key] = this.table[fitted_hashed_key].filter(i => i !== value)
    }

    insert(key, value) {
        let fitted_hashed_key = Math.floor(this.hash(key) % this.size)
        if (Array.isArray(this.table[fitted_hashed_key])) {
            this.table[fitted_hashed_key].push(value)
        }
    }

    search(key) {
        let fitted_hashed_key = Math.floor(this.hash(key) % this.size)
        return (this.table[fitted_hashed_key].length === 1)
            ? this.table[fitted_hashed_key][0]
            : this.table[fitted_hashed_key]
    }

    make_2D_array(size) {
        let parent_array = []
        for (let i of Array(size)) {
            parent_array.push([])
        }
        return parent_array
    }

}

let input = [
    {key: "Pandas", value: "Data Analysis"},
    {key: "NumPy", value: "Array-based Computing"},
    {key: "SciPy", value: "Scientific Computing"},
    {key: "AstroPy", value: "Astronomic Computing"}
]
let hash_table = new HashTable(input, input.length, chaining = true)
console.log(hash_table.table)
hash_table.insert("BioPython", "Bioinformatics")
console.log(hash_table.table)
console.log(hash_table.search('SciPy'))
hash_table.delete('Pandas', 'Data Analysis')
console.log(hash_table.table)