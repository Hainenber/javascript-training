// Import Graph module
const Graph = require(`${__dirname}/graph.js`)

// Make an adjacency list from a graph file
let graph = new Graph(`${__dirname}/graph.txt`).getAdjacencyList()

// Breadth-first-search
function breadth_first_search(graph, input_element, input_parent, input_undiscovered) {
    // Pick the first, non-null element to initiate searching
    let first_element = (input_element) ? input_element : graph.filter(eles => eles.length > 0)[0][0]
    // Pointer for currently iterating element in the later loop
    let current_element

    // Initiate two arrays to register undiscovered nodes and processed node's parent
    let undiscovered = (input_undiscovered) ? input_undiscovered : Array(graph.length).fill(false)
    let parent = (input_parent) ? input_parent : Array(graph.length).fill(null) 
    // Create a queue
    let queue = new Array()

    // Mark seed element as "discovered", i.e true
    undiscovered[first_element] = true
    // Push the seed element onto the queue
    queue.push(first_element)

    // Iterate until the queue is exhausted
    while (queue.length > 0) {
        // Dequeue to get the current element
        current_element = queue.shift()
        // Iterate over its adjacent nodes
        for (let adjacent_vertex of graph[current_element]) {
            // For undiscovered adjacent nodes
            if (!undiscovered[adjacent_vertex]) {
                // Mark them as "discovered", i.e true
                undiscovered[adjacent_vertex] = true
                // Mark their parent as the currently iterating element
                parent[adjacent_vertex] = current_element
                // Enqueue the element to further search
                queue.push(adjacent_vertex)
            }
        }
    }
    // Return
    return { parent, undiscovered }
}

// Finding shortest path between two nodes
function finding_path(start, end, parent) {
    // Assign the destination node as currently iterating element  
    let current = end
    // Create an array to store traversed nodes
    let passing_nodes = new Array()
    // Iterate until find the initiating node
    while (current !== start) {
        // Add the currently iterating element to list of traversed nodes
        passing_nodes.push(current)
        // Find its parent
        current = parent[current]
    }
    passing_nodes.push(start)
    // Return
    return passing_nodes.reverse().join('->')
}
