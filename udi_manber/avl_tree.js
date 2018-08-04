let util = require('util')

class AVL_Node {
    constructor(key) {
        this.key = key
        this.parent = null
        this.height = null
        this.balanceFactor = null
        this.left = null
        this.right = null
    }

    setLeft(node) {
        // Reset the parent for the left node since it's going to be detached
        if (this.left !== null) {
            this.left.parent = null
        }

        // Attach new node to be the parent for the new left one
        this.left = node

        // Make the current node to be the parent for the new left one
        if (this.left !== null) {
            this.left.parent = this
        }
    }

    setRight(node) {
        // Reset the parent for the right node since it's going to be detached
        if (this.right !== null) {
            this.right.parent = null
        }

        // Attach new node to be the parent for the new right one
        this.right = node

        // Make the current node to be the parent for the new right one
        if (this.right !== null) {
            this.right.parent = this
        }
    }
}

class AVL_Tree {
    // An AVL tree is a binary search tree such that, for every node, the difference between the heights of its left and right subtrees is at most 1 (Udi Manber, 1989)
    constructor(tree, isTree = true) {
        if (isTree) {
            this.tree = tree
            this.registerHeight(this.tree)
        }
    }
    
    search(x) {
        function helper_search(tree, query) {
            let node = tree
            // Search a node
            while (node !== null) {
                let current_key = node["key"]
                if (current_key === x) {
                    return node
                } else if (x > current_key) {
                    node = node["right"]
                } else {
                    node = node["left"]
                }
            }

            return null
        }

        return helper_search(this.tree, x)
    }

    insert(x) {
        function helper_insert(tree, query) {
            if (tree === null) {
                tree = AVL_Node(query)
            }
            let node = tree
            let parent = tree
            while (node !== null) {
                parent = node
                if (query === node["key"]) {
                    console.log(`${query} already in the tree`)
                    return 
                }
                if (query > node["key"]) {
                    node = node["right"]
                } else {
                    node = node["left"]
                }
            }

            let insertedNode = new AVL_Node(query)
            
            if (query > parent["key"]) {
                insertedNode["parent"] = parent
                parent["right"] = insertedNode
            } else {
                insertedNode["parent"] = parent
                parent["left"] = insertedNode
            }

            return insertedNode
        }

        // Perform a normal BST insert
        let node = helper_insert(this.tree, x)["parent"]

        // Update height and balance factors of all nodes from the newly inserted node
        this.registerHeightBubbleUp(node)

        // Attempt to rotate nodes if any of them violate AVL property
        while (node !== null) {
            this.balance(node)
            node = node["parent"]
        }

        // Re-update heights and balance factors
        this.registerHeight(this.tree)

    }

    balance(node) {
        if (node["balanceFactor"] > 1) {
            if (node["left"]["balanceFactor"] > 0) {
                this.rotateRight(node)
            } else if (node["left"]["balanceFactor"] < 0) {
                this.rotateRightLeft(node)
            }
        } else if (node["balanceFactor"] < -1) {
            if (node["right"]["balanceFactor"] < 0) {
                this.rotateLeft(node)
            } else if (node["right"]["balanceFactor"] > 0) {
                this.rotateLeftRight(node)
            }
        }
    }

    rotateRight(node) {
        let leftChild = node["left"]
        node.setLeft(null)

        if (node["parent"] !== null) {
            node["parent"].setLeft(leftChild)
        } else if (node === this.tree) {
            this.tree = leftChild
        }

        if (leftChild["right"] !== null) {
            node.setLeft(leftChild["right"])
        }

        leftChild.setRight(node)
    }

    rotateRightLeft(node) {
        let leftChild = node["left"]
        node.setLeft(null)

        let leftChildsRightDescendant = leftChild["right"]
        leftChild.setRight(null)

        if (leftChildsRightDescendant["left"] !== null) {
            leftChild.setRight(leftChildsRightDescendant["left"])
            leftChildsRightDescendant.setLeft(null)
        }

        node.setLeft(leftChildsRightDescendant)
        leftChildsRightDescendant.setLeft(leftChild)

        this.rotateLeft(node)
    }

    rotateLeft(node) {
        let rightNode = node["right"]
        node.setRight(null)

        if (node["parent"] !== null) {
            node["parent"].setRight(node)
        } else if (node === this.tree) {
            this.tree = rightNode
        }

        if (rightNode["left"] !== null) {
            node.setRight(rightNode["left"])
        }

        rightNode.setLeft(node)

    }

    rotateLeftRight(node) {
        let rightNode = node["right"]
        node.setRight(null)

        let rightNodeLeftDescendant = rightNode["left"]
        rightNode.setLeft(null)

        if (rightNodeLeftDescendant["right"] !== null) {
            rightNode.setLeft(rightNodeLeftDescendant["right"])
        }

        node.setRight(rightNodeLeftDescendant)
        rightNodeLeftDescendant.setRight(rightNode)

        this.rotateRight(node)
    }

    inOrderTraversal(func) {
        function helper_in_order_traversal(node) {
            if (node === null) {
                return 
            } else {
                helper_in_order_traversal(node["left"])
                func(node["key"])
                helper_in_order_traversal(node["right"])
            }
        }
        
        return helper_in_order_traversal(this.tree)
    }

    bfs() {
        let stack = new Array(this.tree)

        while (stack.length > 0) {
            let node = stack.pop()
            console.log(node["key"])
            if (node["right"] !== null) {
                stack.push(node["right"])
            }
            if (node["left"] !== null) {
                stack.push(node["left"])
            }
        }
    }

    registerHeight(node) {
        if (node === null) {
            return -1
        } else {
            let leftHeight = this.registerHeight(node["left"])
            let rightHeight = this.registerHeight(node["right"])
            node["height"] = Math.max(leftHeight, rightHeight) + 1
            node["balanceFactor"] = leftHeight - rightHeight
            return node["height"]
        }
    }

    registerHeightBubbleUp(node) {
        while (node !== null) {
            let leftHeight = (node["left"] === null) ? -1 : node["left"]["height"]
            let rightHeight = (node["right"] === null) ? -1 : node["right"]["height"]
            node["height"] = Math.max(leftHeight, rightHeight) + 1
            node["balanceFactor"] = leftHeight - rightHeight
            node = node["parent"]
        }
    }

    delete(x) {
        function helper_delete(tree, key) {
            let node = tree
            let parent = node
            while (node !== null || node["key"] !== key) {
                parent = node
                let current_key = node["key"]
                if (key < current_key) {
                    node = node["left"]
                } else if (key > current_key) {
                    node = node["right"]
                } else {
                    break
                }
            }

            // We have reached leaves
            if (node === null) {
                console.log(`${x} is not in the tree to be deleted`)
            }

            console.log(`current node is ${node["key"]}`)
            // We have reached internal nodes
            if (node !== tree) {
                if (node["left"] === null) {
                    if (x <= parent["key"]) {
                        parent.setLeft(node["right"])
                    } else {
                        parent.setRight(node["right"])
                    }
                    return parent
                } else if (node["right"] === null) {
                    if (x <= parent["key"]) {
                        parent.setRight(node["left"])
                    } else {
                        parent.setLeft(node["left"])
                    }
                    return parent
                } else {
                    let node1 = node["left"]
                    let old_node = node
                    let parent1 = node1
                    while (node1["right"] !== null) {
                        parent1 = node1
                        node1 = node1["right"]
                    }

                    // Actual deletion
                    parent1.setRight(node1["left"])
                    node["key"] = node1["key"]
                    node.setLeft(old_node["left"])

                    return parent1
                }
            }
        }
            let ancestor_node = helper_delete(this.tree, x)

            this.registerHeightBubbleUp(ancestor_node)

            while (ancestor_node !== null) {
                this.balance(ancestor_node)
                ancestor_node = ancestor_node["parent"]
            }

            this.registerHeight(this.tree)
    }

    mininum(node) {
        let node_pointer = node
        while (node_pointer["left"] !== null) {
            node_pointer = node_pointer["left"]
        }
        return node_pointer["key"]
    }

    maximum(node) {
        let node_pointer = node
        while (node_pointer["right"] !== null) {
            node_pointer = node_pointer["right"]
        }
        return node_pointer["key"]
    }

    successor(node) {
        let node_pointer = node
        if (node_pointer["right"] !== null) {
            return this.mininum(node_pointer["right"])
        }

        let parent = node_pointer["parent"]

        while (parent !== null && node_pointer === parent["right"]) {
            node_pointer = parent
            parent = parent["parent"]
        }

        return parent
    }

    predecessor(node) {
        let node_pointer = node
        if (node_pointer["left"] !== null) {
            return this.maximum(node["left"])
        }

        let parent = node["parent"]

        while (parent !== null && node === parent["left"]) {
            node = parent
            parent = parent["parent"]
        }

        return parent
    }

}

let nodes = new AVL_Node(0)

let bst = new AVL_Tree(nodes)
console.log(`Insert 0 ----\n${util.inspect(bst.tree)}`)
bst.insert(1)
console.log(`Insert 1 ----\n${util.inspect(bst.tree)}`)
bst.insert(3)
console.log(`Insert 3 ----\n${util.inspect(bst.tree)}`)
bst.insert(-1)
console.log(`Insert -1 ----\n${util.inspect(bst.tree)}`)
bst.insert(0.3)
console.log(`Insert 0.3 ----\n${util.inspect(bst.tree)}`)
bst.insert(4)
console.log(`Insert 4 ----\n${util.inspect(bst.tree)}`)
bst.insert(0.2)
console.log(`Insert 0.2 ----\n${util.inspect(bst.tree)}`)
bst.delete(0)
console.log(`Delete 0 ----\n${util.inspect(bst.tree)}`)
// bst.insert(4)
// bst.insert(2.9)
// bst.insert(0)
// bst.insert(1.6)
// bst.insert(1.5)
// bst.insert(1.7)
// bst.insert(1.69)
// bst.insert(1.68)
// console.log(util.inspect(bst.tree))
// bst.registerHeight()
// console.log(`bst.tree height is ${util.inspect(bst.tree)}`)