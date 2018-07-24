// Arrays
let arr = new Array() 

// Records (or objects in JS)
let rec = {
    int1: 1,
    int2: 3,
    int3: new Array(10)
}

// Singly Linked List
class LinkedList {
    constructor(nums, bottom = true) {
        // Build up the linked list from the null node
        if (bottom) {
            // Create a list with first member from last element of input values
            let arr = Object.create(null)
            arr["value"] = nums[nums.length - 1]
            arr["next"] = null
            // Refer to the whole list
            let ptr = arr

            for (let ele of nums.slice(0, nums.length - 1).reverse()) {
                // Assign the previously created list to the current node's pointer
                arr = {
                    value: ele,
                    next: ptr
                }
                // Once again, refer to the whole list
                ptr = arr
            }

            this.arr = arr
            this.length = nums.length
        } else {
            // Build up the linked list from the first element
            let arr1 = {
                value: nums[0],
                next: (nums.length > 1) ? new Object() : null
            }
            let ptr1 = arr1["next"]
            

            for (let i = 1; i < nums.length;) {
                ptr1["value"] = nums[i]
                if (++i === nums.length) {
                    ptr1["next"] = null
                } else {
                    ptr1["next"] = new Object()
                }
                ptr1 = ptr1["next"]
            }

            this.arr = arr1
            this.length = nums.length
        }
    }

    unshift(num) {
        this.arr = {
            value: num,
            // Assign the previous list to this node's pointer
            next: this.arr
        }
        this.length++
    }

    append(num) {
        let ptr = this.arr["next"]
        // Remember the node right before the null node
        let prev_ptr = new Object()
        // Traverse the list
        while (ptr !== null) {
            prev_ptr = ptr
            ptr = ptr["next"]
        }
        // Traversal pointer is now assigned to `null`
        // Use the neighbor's pointer to access last element
        prev_ptr["next"] = {
            value: num,
            next: null
        }
        this.length++
    }

    insert(num, index) {
        if (index >= this.length - 1) {
            // Apply `append` operation for inserting elements at the end of list
            this.append(num)
            return
        } else if (index <= 0) {
            // Apply `unshift` operation for inserting elements at the head of list
            this.unshift(num)
            return
        } else if (index === 1) {
            // Attach new node of element at the first node's pointer
            let ptr = this.arr["next"]
            let new_node = {
                value: num,
                next: ptr
            }
            this.arr["next"] = new_node
        } else {
            // Create bindings for storing pointers
            let count = 0
            let ptr = this.arr["next"]
            let prev_ptr = new Object()

            // Traverse the list and stop at 2 nodes away from `index` position
            while (count < index - 1) {
                prev_ptr = ptr
                ptr = ptr["next"]
                count++
            }

            // Create new node containing new element with `next` pointer refers to the remaining list
            let new_node = {
                value: num,
                next: ptr
            }

            // Attach said node to pointer right before destination position
            prev_ptr["next"] = new_node
        }

        this.length++
    }

    truncate() {
        // Create bindings for list traversal
        let ptr = this.arr["next"]
        let cache_ptr = new Object()
        let prev_ptr = new Object()

        // Traverse the list until one node away from the end
        while (ptr !== null) {
            prev_ptr = cache_ptr
            cache_ptr = ptr
            ptr = ptr["next"]
        }

        // Nullify the node most adjacent to the end node
        prev_ptr["next"] = null

        // Reduce the length by 1
        this.length--
    }

    shift() {
        // Bypass first node and re-assign the list to be the first node's referenced list
        this.arr = this.arr["next"]
        // Reduce the length by 1
        this.length--
    }

    delete(index) {
        if (index >= this.length - 1) {
            this.truncate()
            return
        } else if (index <= 0) {
            this.shift()
            return
        } else if (index == 1) {
            let first_node_ele = this.arr["value"]
            let first_node_ptr = this.arr["next"]
            this.arr = {
                value: first_node_ele,
                next: first_node_ptr["next"]
            }
            this.length--
            return 
        } else {
            let count = 0
            let ptr = this.arr["next"]
            let prev_ptr = new Object()

            while (count < index - 1) {
                prev_ptr = ptr
                ptr = ptr["next"]
                count++
            }

            prev_ptr["next"] = ptr["next"]

            this.length--
        }
    }
}

let a = new LinkedList([2], bottom = false)
// console.log(a.arr)
a.unshift(9)
// console.log(a.arr)
a.append(10)
// console.log(a.arr)
a.append(312)
console.log(`a is ${JSON.stringify(a.arr)}`)
a.insert(88, 1)
console.log(JSON.stringify(a.arr))
a.insert(100, 3)
console.log(JSON.stringify(a.arr))
a.delete(4)
console.log(JSON.stringify(a.arr))
