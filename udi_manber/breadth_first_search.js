// Import Graph module
const Graph = require(`${__dirname}/graph.js`)

// Make an adjacency list from a graph file
let graph = new Graph(`${__dirname}/graph.txt`).getAdjacencyList()

// Create necesssary arrays for breadth-first search graph traversal
function initialize_search(graph_length) {
    // Array for state of node's discovery
    let undiscovered = new Array(graph_length).fill(false)
    // The node's indices (starting from 1)
    let undiscovered_indices = [...Array(graph_length).keys()].splice(1)

    // Array for node's state of processed
    let processed = new Array(graph_length).fill(false)
    // Array for each node's parent
    let parent = new Array(graph_length).fill(false)

    // Object that house functions that process the nodes at particular occasion during the traversal
    // All of them are empty functions at first
    let process_funcs = Object.create(null)
    process_funcs.process_vertex_early= function() {}
    process_funcs.process_edge = function() {}
    process_funcs.process_vertex_late = function() {}

    // Return
    return {
        undiscovered,
        undiscovered_indices,
        processed,
        parent,
        process_funcs
    }
}

// Breadth-first-search
function breadth_first_search(graph,
        input_element, input_parent, input_undiscovered, input_processed,
        process_funcs) {
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
        process_funcs.process_vertex_early(current_element)
        processed[current_element] = true
        // Iterate over its adjacent nodes
        for (let adjacent_vertex of graph[current_element]) {
            // For nodes that are enqueued already but not yet to fully discover their adjacent nodes
            if (!processed[adjacent_vertex]) {
                process_funcs.process_edge(current_element, adjacent_vertex)
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
            process_funcs.process_vertex_late(current_element)
        }
    }
    // Return
    return { parent, undiscovered, processed }
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
    // Initiate arrays for storage relevant data
    let {parent, undiscovered, undiscovered_indices, processed, process_funcs} = initialize_search(graph.length)
    // Number of connected components
    let components = 0

    // Iterate over each vertex
    for (let index of undiscovered_indices) {
        // If the node is undiscovered
        if (!undiscovered[index]) {
            // Connected components increased by 1
            components += 1;
            // Mutate the arrays
            ({parent, undiscovered, processed} = breadth_first_search(graph, index, parent, undiscovered, processed, process_funcs));
        }
    }

    // Returns
    return components
}

function bipartite_matching(graph) {
    // Function to check color of a pair of vertices
    function check_vertex_colors(vertex1, vertex2) {
        // This function is called if the second vertex has not been processed yet, i.e nodes waiting in the queue 
        // If the color of both vertices is the same
        if (color[vertex1] === color[vertex2]) {
            // The graph is not bipartite
            bipartite = false
        } else {
            // The color of both vertices is not the same
            // Second vertex's color is the opposite of first vertex's
            color[vertex2] = complement_color(color[vertex1])
        }
    }

    // Function to return the opposite color of input vertex
    function complement_color(vertex) {
        // If the vertex's color is defined
        if (color[vertex] !== null) {
            // Return 'b'(black) if the vertex's color is 'r'(red) and vice versa
            if (color[vertex] === 'r') {
                return 'b'
            } else {
                return 'r'
            }
        } else {
            // The vertex color is not yet defined
            // Leave it alone
            return null
        }
    }

    // Initiate array to store each vertex's color
    let color = Array(graph.length).fill(null)
    // Flag for the graph's bipartiteness is set to 'true' initially
    let bipartite = true
    // Initiate array to store the vertices' relevant state
    let {parent, undiscovered, undiscovered_indices, processed, process_funcs} = initialize_search(graph.length)
    // The function used to process adjacent vertices waiting in the queue is set
    process_funcs.process_edge = check_vertex_colors

    // Iterate over the vertices
    for (let index of undiscovered_indices) {
        // If a vertex is undiscovered
        if (!undiscovered[index]) {
            // Set its color to be red ('r')
            color[index] = 'r';
            // Mutate the state arrays
            ({parent, undiscovered, processed} = breadth_first_search(graph, index,
                parent, undiscovered, processed,
                process_funcs));
        }
    }

    // Returns
    return bipartite
}

console.log(`Graph is bipartite? ${bipartite_matching(graph)}`)