// Import Graph module
const Graph = require(`${__dirname}/graph.js`)

// Make an adjacency list from a graph file
let graph = new Graph(`${__dirname}/graph.txt`).getAdjacencyList()

// Breadth-first-search
function breadth_first_search(graph,
        input_element, input_parent, input_undiscovered, input_processed,
        process_vertex_early, process_edge, process_vertex_late) {
    // Pick the first, non-null element to initiate searching
    let first_element = (input_element) ? input_element : graph.filter(eles => eles.length > 0)[0][0]
    // Pointer for currently iterating element in the later loop
    let current_element

    // Initiate two arrays to register undiscovered nodes and processed node's parent
    let undiscovered = (input_undiscovered) ? input_undiscovered : Array(graph.length).fill(false)
    let parent = (input_parent) ? input_parent : Array(graph.length).fill(null) 
    let processed = (input_processed) ? input_processed : Array(graph.length).fill(false)
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
        // Process the node first time seeing it
        process_vertex_early(current_element)
        processed[current_element] = true
        // Iterate over its adjacent nodes
        for (let adjacent_vertex of graph[current_element]) {
            // For nodes that are enqueued already but not yet to fully discover their adjacent nodes
            if (!processed[adjacent_vertex]) {
                process_edge(current_element, adjacent_vertex)
            }
            // For undiscovered adjacent nodes
            if (!undiscovered[adjacent_vertex]) {
                // Mark them as "discovered", i.e true
                undiscovered[adjacent_vertex] = true
                // Mark their parent as the currently iterating element
                parent[adjacent_vertex] = current_element
                // Enqueue the element to further search
                queue.push(adjacent_vertex)
            }
            // Process the currently iterating element when all of its adjacent nodes have already enqueued 
            process_vertex_late(current_element)
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

function connected_components(graph) {
    let parent = Array(graph.length).fill(null)
    let undiscovered = Array(graph.length).fill(false)
    let undiscovered_indices = [...Array(graph.length).keys()].splice(1)
    let components = 0

    for (let index of undiscovered_indices) {
        if (!undiscovered[index]) {
            components += 1;
            ({parent, undiscovered} = breadth_first_search(graph, index, parent, undiscovered));
        }
    }

    return components
}