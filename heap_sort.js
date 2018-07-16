
function makeHeap(arr) {
    let heap = arr.slice()
    let heap_length = heap.length
    return {heap, heap_length}
}
function parent(i) {
    return Math.floor((i - 1) / 2)
}

function left(i) {
    return 2 * i
}

function right(i) {
    return 2 * i + 1
}

function swap(index1, index2, arr) {
    let temp = arr[index2]
    arr[index2] = arr[index1]
    arr[index1] = temp
}

function maxHeapify(arr, i, heap_length) {
    let left_node_index = left(i)
    let right_node_index = right(i)
    let largest = i

    if (left_node_index < heap_length && left_node_index > arr[i]) {
        largest = left_node_index
    }

    if (right_node_index < heap_length && right_node_index > largest) {
        largest = right_node_index
    }

    if (largest !== i) {
        swap(largest, i, arr.heap)
        maxHeapify(arr, largest)
    }
}

function minHeapify(arr, i, heap_length) {
    let left_node_index = left(i)
    let right_node_index = right(i)
    let smallest = i

    if (left_node_index < arr.heap_length && left_node_index < arr.heap[i]) {
        smallest = left_node_index
    }

    if (right < arr.heap_length && right < smallest) {
        smallest = right_node_index
    }

    if (smallest !== i) {
        swap(smallest, i, arr.heap)
        maxHeapify(arr.heap, smallest)
    }
}

function buildMaxHeap(arr, heap_length) {
    for (let i = Math.floor(heap_length / 2); i >= 0; i--) {
        maxHeapify(arr, i, heap_length)
    }
}

function heapSort(arr) {
    let heapifiedArr = makeHeap(arr)
    buildMaxHeap(heapifiedArr, heapifiedArr.heap_length)
    for (let i = heapifiedArr.length - 1; i > 1; i--) {
        heapifiedArr.heap_length--
        maxHeapify(heapifiedArr, i)
    }
    return heapifiedArr.heap
}

let unsorted = [8, 14, 9, 3, 2, 1, 16, 13, 4, 10]
console.log(heapSort(unsorted))