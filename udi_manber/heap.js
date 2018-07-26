// Heap
class Heap {
    constructor(eles, isHeap = false) {
        if (isHeap) {
            // Input array is a heap already
            // Assign the heap and its length to the class's attributes
            this.arr = eles           
            this.length = eles.length
        } else {
            // Input array is not a heap
            // Construct a heap incrementally by adding each element to an empty heap
            // and validate whether inserted satisying a heap's constraint
            let arr = new Array()
            for (let ele of eles) {
                arr = this.insert(arr, ele)
            }
            // Assign the created heap and its length to the class's attribute
            this.arr = arr
            this.length = arr.length
        }
    }

    insert(arr, x) {
        // Add a new value at the end of array
        arr.push(x)
        // Initialize child node's index with the last index
        let child = arr.length - 1
        let parent = this.parent(child)

        // Bubble up the inserted element until it's unable to meet heap constraint or root node
        // is reached
        while (parent >= 0) {
            if (arr[child] > arr[parent]) {
                // Swap the violating child node with its parent
                let temp = arr[child]
                arr[child] = arr[parent]
                arr[parent] = temp
                // Prepare to go up the heap
                child = parent
                parent = this.parent(child)
            } else {
                // End the bubbling process
                parent = -1
            }
        }

        return arr
    }

    remove() {
        // Remove last element of the heap
        let newRoot = this.arr.pop()
        // Retain the first element 
        let removed = this.arr[0]
        // Assign last element to the root 
        this.arr[0] = newRoot
        // Re-heapify the heap, starting from the root
        this.maxHeapify(0)
        // Return the maximum element, i.e root node
        return removed
    }

    maxHeapify(index) {
        let largest = index
        let leftNode = this.leftNode(index)
        let rightNode = this.rightNode(index)

        if (leftNode < this.length && this.arr[leftNode] > this.arr[largest]) {
            largest = leftNode
        }

        if (rightNode < this.length && this.arr[rightNode] > this.arr[largest]) {
            largest = rightNode
        }

        if (largest !== index) {
            let temp = this.arr[index]
            this.arr[index] = this.arr[largest]
            this.arr[largest] = temp
            this.maxHeapify(largest)
        }
    }

    heapsort() {
       // TODO: Implement heapsort 
    }

    parent(index) {
        return Math.floor((index - 1) / 2)
    }
    
    leftNode(index) {
        return 2 * index + 1
    }
    
    rightNode(index) {
        return 2 * index + 2
    }
}

let a = new Heap([2, 1, 3, 10, 23, -1, 21, 11])
console.log(a.arr)
a.remove()
console.log(a.arr)