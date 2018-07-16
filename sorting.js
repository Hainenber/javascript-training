function insertion_sort(arr) {
    let sorted_arr = arr.slice();
    for (let index = 1; index < sorted_arr.length; index++) {
        let key = sorted_arr[index];
        let secondary_index = index - 1;
        while (secondary_index >= 0 && sorted_arr[secondary_index] > key) {
            sorted_arr[secondary_index + 1] = sorted_arr[secondary_index];
            secondary_index = secondary_index - 1;
        }
        sorted_arr[secondary_index + 1] = key;
    }
    return sorted_arr;
}

function descending_insertion_sort(arr) {
    let sorted_arr = arr;
    for (let index = 1; index < sorted_arr.length; index++) {
        let key = sorted_arr[index];
        let sec_index = index - 1;
        while (sec_index >= 0 && sorted_arr[sec_index] < key) {
            sorted_arr[sec_index + 1] = sorted_arr[sec_index];
            sec_index--;
        }
        sorted_arr[sec_index + 1] = key;
    }
    return sorted_arr;
}

function linear_search(arr, target) {
    let ele = arr[0]
    if (ele === target) {
        return true
    } else {
        for (let i = 1; i < arr.length; i++) {
            ele = arr[i]
            if (ele === target) {
                return true
            }
        }
    }
    return false
}

function add_binary_numbers(bin1, bin2) {
    let sum = []
    let intermediate_sum = 0
    let leftover = 0;
    if (bin1.length === bin2.length) {
        for (let i = bin1.length - 1; i >= 0; i--) {
            intermediate_sum = bin1[i] + bin2[i] + leftover
            if (intermediate_sum === 2) {
                sum = sum.concat(0)
                leftover = 1
            } else if (intermediate_sum === 1) {
                sum = sum.concat(0)
            } else if (intermediate_sum === 3)
                sum = sum.concat(1)
                leftover = 1
        }
        if (leftover = 1) sum = sum.concat(1)
        return sum.reverse()
    } else {
        return -1
    }
}

function selection_sort(arr) {
    function min_index(arr, start_index) {
        let min_index = 0
        let min = arr[0]
        for (let i = 1; i < arr.length; i++) {
            var element = arr[i]           
            if (element < min) {
                min_index = i
                min = element
            }
        }
        return start_index + min_index
    }

    let sorted_arr = arr
    let index = 0;
    let current_element = sorted_arr[index]
    let temp_min_index = min_index(sorted_arr, 0)
    let temp_min = sorted_arr[temp_min_index]


    while (index < sorted_arr.length - 1) {
        // Swap minimum element to i-th element
        sorted_arr[index] = temp_min
        sorted_arr[temp_min_index] = current_element

        index++;
        current_element = sorted_arr[index]
        temp_min_index = min_index(sorted_arr.slice(index), index)
        temp_min = sorted_arr[temp_min_index]
    }

    return sorted_arr
}

function merge_sort(array) {
    function merge_sorted(arr1, arr2) {
        let sorted_arr = []
        let index_1 = 0
        let index_2 = 0  

        while (index_1 < arr1.length && index_2 < arr2.length) {
            if (arr1[index_1] < arr2[index_2]) {
                sorted_arr.push(arr1[index_1])
                index_1++
            } else if (arr1[index_1] > arr2[index_2]) {
                sorted_arr.push(arr2[index_2])
                index_2++
            } else {
                sorted_arr.push(arr1[index_1])
                sorted_arr.push(arr2[index_2])
                index_1++
                index_2++
            }
        }

        
        if (index_1 >= arr1.length && index_2 < arr2.length) {
            for (let i = index_2; i < arr2.length; i++) {
                sorted_arr.push(arr2[i])
            }
        } else if (index_2 >= arr2.length && index_1 < arr1.length) {
            for (let j = index_1; j < arr1.length; j++) {
                sorted_arr.push(arr1[j])
            }
        }

        return sorted_arr;
        
    }

    function inner_merge_sort(arr) {
        if (arr.length > 1) {
            let middle = Math.floor(arr.length / 2)
            let sorted_first_half = inner_merge_sort(arr.slice(0, middle))
            let sorted_second_half = inner_merge_sort(arr.slice(middle))
            return merge_sorted(sorted_first_half, sorted_second_half)
        }
        return arr
    }

    return inner_merge_sort(array)
}

// function partition(arr) {
//     let end_value = arr[end]
//     let start_value = start - 1
//     for 
// }
    partitioned = partitioned(array)
    mid = Math.floor(partitioned.length / 2)
    quicksort()
}

let a = [21, 3, 46, 0]
console.log(insertion_sort(a))
console.log(descending_insertion_sort(a))
console.log(linear_search(a, 0))

let b1 = [1, 0, 1, 1]
let b2 = [1, 1, 0, 1]
console.log(add_binary_numbers(b1, b2))

let ab_rand = Array.from({length: 20}, () => Math.floor(Math.random() * 20))
console.log(`selection sort is`)
console.log(selection_sort(ab_rand))

let abc1 = Array.from({length: 30}, () => Math.floor(Math.random() * 30))
console.log(`merge sort is`)
console.log(merge_sort(abc1))