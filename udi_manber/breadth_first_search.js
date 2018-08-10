const Graph = require(`${__dirname}/graph.js`)

let graph = new Graph(`${__dirname}/graph.txt`).getAdjacencyList()

function breadth_first_search(graph, input_element, input_parent, input_undiscovered) {
    let first_element = (input_element) ? input_element : graph.filter(eles => eles.length > 0)[0][0]
    let current_element

    let undiscovered = (input_undiscovered) ? input_undiscovered : Array(graph.length).fill(false)
    let parent = (input_parent) ? input_parent : Array(graph.length).fill(null) 
    let queue = new Array()

    undiscovered[first_element] = true
    queue.push(first_element)

    while (queue.length > 0) {
        current_element = queue.shift()
        console.log(`current_element=${current_element}`)
        for (let adjacent_vertex of graph[current_element]) {
            if (!undiscovered[adjacent_vertex]) {
                undiscovered[adjacent_vertex] = true
                parent[adjacent_vertex] = current_element
                queue.push(adjacent_vertex)
            }
        }
    }
    return { parent, undiscovered }
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

function connected_components(graph) {
    console.log(`graph.length=${graph[6]}`)
    let parent = Array(graph.length).fill(null)
    let undiscovered = Array(graph.length).fill(false)
    let undiscovered_indices = [...Array(graph.length).keys()].splice(1)
    console.log(`undiscovered_indices=${undiscovered_indices}`)
    console.log(`undiscored=${undiscovered}`)
    let components = 0
    for (let index of undiscovered_indices) {
        if (!undiscovered[index]) {
            console.log(undiscovered)
            components += 1;
            ({parent, undiscovered} = breadth_first_search(graph, index, parent, undiscovered));
        }
    }
    return components
}

console.log(`Connected components of graph is ${connected_components(graph)}`)