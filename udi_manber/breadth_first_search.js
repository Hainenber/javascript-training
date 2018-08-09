const Graph = require(`${__dirname}/graph.js`)

let graph = new Graph(`${__dirname}/graph.txt`).getAdjacencyList()

function breadth_first_search(graph) {
    let first_element = graph.filter(eles => eles.length > 0)[0][0]
    let current_element

    let undiscovered = Array(graph.length).fill(false)
    let parent = Array(graph.length).fill(null) 
    let queue = new Array()

    undiscovered[first_element] = true
    queue.push(first_element)

    while (queue.length > 0) {
        current_element = queue.shift()
        console.log(current_element)
        for (let adjacent_vertex of graph[current_element]) {
            if (!undiscovered[adjacent_vertex]) {
                undiscovered[adjacent_vertex] = true
                parent[adjacent_vertex] = current_element
                queue.push(adjacent_vertex)
            }
        }
    }
    return parent 
}

function finding_path(start, end, parent) {
    let current = end
    let passing_nodes = new Array()
    while (current !== start) {
        passing_nodes.push(current)
        current = parent[current]
    }
    passing_nodes.push(start)
    return passing_nodes.reverse().join('->')
}

let parent = breadth_first_search(graph)