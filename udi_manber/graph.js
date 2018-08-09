const fs = require('fs')

module.exports = class Graph {
    constructor(path, directed = false) {
        this.path = path
        this.directed = directed
        this.buildGraph()
    }

    getAdjacencyMatrix() {
        return this.adjacency_matrix
    }

    getAdjacencyList() {
        return this.adjacency_list
    }

    buildGraph() {
        const file = fs.readFileSync('./graph.txt', {encoding: 'utf-8'}).split("\n")
        let adjacency_matrix
        let adjacency_list
        let vertices
        let edges
        let count = 0

        for (let line of file) {
            // First line in the format of '{V} {E}' where V denotes number of vertices
            // and E denotes number of edges
            if (count === 0) {
                // Split the first line and then cast the split products before assignment
                [vertices, edges] = line.split(" ").map(i => Math.trunc(i))
                adjacency_matrix = [...Array(vertices + 1).keys()].reduce((a, b) => {
                    a[b] = []
                    return a
                }, [])
                adjacency_list = [...Array(vertices + 1).keys()].reduce((a, b) => {
                    a[b] = []
                    return a
                }, [])
            } else {
                let [start_node, end_node] = line.split(" ").map(i => Math.trunc(i))
                // Populate the adjacency matrix and list in two cases of undirected and directed
                if (!this.directed) {
                    adjacency_matrix[start_node][end_node] = 1
                    adjacency_list[end_node].push(start_node)
                }
                adjacency_matrix[end_node][start_node] = 1
                adjacency_list[start_node].push(end_node)
            }
            count++
        }
        
        adjacency_matrix.map(column => {
            for (let cell_index = 0; cell_index < vertices; cell_index++) {
                let cell = column[cell_index]
                if (cell === undefined) {
                    column[cell_index] = 0
                }
            }
        })

        this.adjacency_list = adjacency_list
        this.adjacency_matrix = adjacency_matrix
    }
}