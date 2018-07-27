class Node {
    constructor(ele) {
        this.value = ele
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor(input, isTree = false) {
        if (isTree) {
            this.tree = input
        }
    }

    helper_search(root, x) {
        // If the tree is nonexistent, i.e null or searching value is already the root
        // Return the pointer to tree's root
        if (root === null || x === root["value"]) {
            return root
        } else if (x < root["value"]) {
            // Recurse to the left nodes since searching value is smaller than value deposited in the current node
            return this.helper_search(root["left"], x)
        } else {
            // Recurse to the right nodes since searching value is larger than value deposited in the current node
            return this.helper_search(root["right"], x)
        }
    }

    search(x) {
        // Invoke the `helper_search` method with the contained tree and searching value
        return this.helper_search(this.tree, x)
    }

    helper_insert(root, x) {
        // If the tree's pointer is nonexistent, i.e null
        // Assign it a Node 
        if (root === null) {
            root = new Node(x)
        } else {
            // f
            let node = root
            let child = root
            let parent = root
            
            while (node !== null && child !== null) {
                if (node["value"] === x) {
                    child = null
                } else {
                    parent = node
                    if (x < node["value"]) {
                        node = node["left"]
                    } else {
                        node = node["right"]
                    }
                }
            }

            if (child !== null) {
                let newNode = new Node(x)
                if (x < parent["value"]) {
                    parent["left"] = newNode
                } else {
                    parent["right"] = newNode
                }
            }
        }
        
    }

    insert(x) {
        this.helper_insert(this.tree, x)
    }

    helper_delete(root, x) {
        let node = root
        let parent = node
        // Traverse the tree iteratively
        // Stops at leaves or node having value equals to one to be deleted
        // What retains post-loop would be:
        // `parent`: the node before the node that actually end the loop
        // `node`: the node that actually end the loop
        while (node !== null && node["value"] !== x) {
            parent = node
            if (x < node["value"]) {
                node = node["left"]
            } else {
                node = node["right"]
            }
        }

        // If the above loop stops due to encountering leaves
        // Return and inform that the value to be deleted is not in the tree
        if (node === null) {
            console.log(`${x} is not in the tree`)
            return
        }

        // The node that ends above loop is internal
        if (node !== root) {
            // If either left or right node's is missing then the node of interest is parental to a leaf node, so we can link the leaf to its grandparent node to perform a deletion
            // Left node of the intenal one is missing
            if (node["left"] == null) {
                if (x <= parent["value"]) {
                    parent["left"] = node["right"]
                } else {
                    parent["right"] = node["right"]
                }
            } else if (node["right"] === null) {
                // Right node of the internal one is missing
                if (x <= parent["value"]) {
                    parent["left"] = node["left"]
                } else {
                    parent["right"] = node["left"]
                }
            } else {
                // Both node of internal node are present
                let node1 = node["left"]
                let parent1 = node
                // Finding the predecessor node of the concerned node
                // Move towards the largest node of the internal node's subtree
                while (node1["right"] !== null) {
                    parent1 = node1
                    node1 = node1["right"]
                }
                // Actual deletion of desired node
                parent1["right"] = node1["left"]
                node["value"] = node1["value"]
            }
        }
    }

    delete(x) {
        return this.helper_delete(this.tree, x)
    }
}

let nodes = new Node(2)
nodes["left"] = new Node(1)
nodes["right"] = new Node(3)

let bst = new BinarySearchTree(nodes, isTree = true)
bst.insert(4)
bst.insert(0)
console.log(JSON.stringify(bst.tree))
bst.delete(0)
console.log(JSON.stringify(bst.tree))