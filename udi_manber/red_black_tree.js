let util = require('util')

class RedBlackNode {
    constructor(key, color = "red") {
        this.key = key
        this.color = color
        this.parent = null
        this.left = null
        this.right = null
    }
}

class RedBlackTree {
    // A Red-Black tree is a binary search tree that satisfy the following red-black properties
    // - Every node is either black or red
    // - The root is black
    // - Every leaf (null) is black
    // - If a node is red, then both its children are black
    // - Every simple path from a node to a descendant leaf contains the same number of black nodes
    constructor(tree, isTree = true) {
        if (isTree) {
            this.tree = tree
        } else {
            this.tree = new RedBlackNode(tree[0], "black")
            for (let ele of tree.splice(1)) {
                this.insert(ele)
            }
        }
    }

    insert(x) {
        // Traverse the tree to find approriate position for new node insertion
        let parent_node = null
        let node = this.tree
        while (node !== null) {
            parent_node = node
            if (x < node.key) {
                node = node.left               
            } else {
                node = node.right
            }
        }

        // Create a new node
        let newNode = new RedBlackNode(x)
        newNode.parent = parent_node

        // Assign the new node to root if the tree does not exist yet, else
        // Assign the new node to left or right of the parental node depending on its magnitude against the parent node's key
        if (parent_node === null) {
            this.tree = newNode
        } else if (newNode.key < parent_node.key) {
            parent_node.left = newNode
        } else {
            parent_node.right = newNode
        }

        // Color the new node red
        newNode.color = "red"

        // Balance the tree
        this.balance(newNode)
    }

    balance(node) {
        // Loop until there are no red nodes in a row
        while (node.parent !== null && node.parent.color === "red") {
            // console.log(`loop of node ${node.key}`)
            // If the parent node is left-positioned of the node's grandparent
            if (node.parent === node.parent.parent.left) {
                // Set up the uncle node, i.e the grandparent's right node
                let uncle_node = node.parent.parent.right
                // Case 1 : Uncle node is red
                if (uncle_node !== null && uncle_node.color === "red") {
                    // Change the parental node's color to black
                    node.parent.color = "black"
                    // Change the uncle node's color to black
                    uncle_node.color = "black"
                    // Change the grandparent node's color to red
                    node.parent.parent.color = "red"
                    // New node is the grandparent node
                    node = node.parent.parent
                    // Continue to the next iteration
                    // console.log(`the tree is ${util.inspect(this.tree)}`)
                    continue
                } else if (node === node.parent.right) {
                    // Case 2 : Uncle node is black and the node is a right child
                    // Node is now its parental node
                    node = node.parent
                    // Conduct a left rotation on the node to lead to case 3
                    this.rotateLeft(node)
                }
                // Case 3 : Uncle node is black and the node is a left child
                // Change the parental node's color to black
                node.parent.color = "black"
                // Change the grandparent's color to red
                node.parent.parent.color = "red"
                // Conduct a right rotation on the grandparent's node
                this.rotateRight(node.parent.parent)
            } else { // If the parental node is right-positioned of the grandparent node
                // Uncle node is parental node's sibling, i.e grandparent node's left subtree
                let uncle_node = node.parent.parent.left
                // Case 1 : Uncle node is red
                if (uncle_node !== null && uncle_node === "red") {
                    // Change parental node's color to black
                    node.parent.color = "black"
                    // Change the uncle node's color to black
                    uncle_node.color = "black"
                    // Change the grandparent node to red
                    node.parent.parent = "red"
                    // New node is the grandparent node
                    node = node.parent.parent
                    // Go to the next iteration
                    continue
                } else if (node === node.parent.left) {
                    // Case 2 : Uncle node is null or black and the node is left-positioned
                    // The node is now its parent
                    node = node.parent
                    // Rotate right to proceeed to case 3
                    this.rotateRight(node)
                }
                // Case 3: Uncle node is null or black and the node is right-positioned
                // Change the color of the parental node to black
                node.parent.color = "black"
                // Change the color of the grandparent node to red
                node.parent.parent.color = "red"
                // Rotate left to balance it out
                this.rotateLeft(node.parent.parent)
            }
        }
        // Set the root's color to be black
        // In order to fix any property 2 violation
        this.tree.color = "black"
    }

    rotateLeft(node) {
        // Detach the right node
        let rightNode = node.right
        // Preserve the node's right subtree and attach it to the right node's left position
        node.right = rightNode.left

        // Set the parental node of the right node's left subtree to be of the node
        if (rightNode.left !== null) {
            rightNode.left.parent = node
        }

        // Link the node's parent to the right node's
        rightNode.parent = node.parent

        // If the node's parent is null, i.e the node is root, the right node is now root
        if (node.parent === null) {
            this.tree = rightNode
        } else if (node === node.parent.left) { 
            // Else, the node is left positioned, then the right node is assigned correspondingly
            node.parent.left = rightNode
        } else {
            // Similar case to right-positioned node
            node.parent.right = rightNode
        }

        // Attach the node to the right node's left
        rightNode.left = node
        // The node's parent is now of right node
        node.parent = rightNode
    }

    rotateRight(node) {
        // Detach the left node
        let leftNode = node.left
        // Transfer the node's left node to the left node's right position
        node.left = leftNode.right

        // Set the parental node of the left node's right subtree to be of the node
        if (leftNode.right !== null) {
            leftNode.right.parent = node
        }

        // Link the node's parent to the left node's
        leftNode.parent = node.parent

        // If the node is root then the right node is now the new node
        if (node.parent === null) {
            this.tree = leftNode
        } else if (node === node.parent.left) {
            // Else, the parental node of the node's left positioned is now occupied by the left node
            node.parent.left = leftNode
        } else {
            // Similar case with right-positioned node
            node.parent.right = leftNode
        }

        // Attach the node to the left node's right position
        leftNode.right = node
        // The node's parent is now of left node
        node.parent = leftNode
    }

    transplant(node1, node2) {
        // If the parental node of node1 is null, i.e node1 is root
        // then node2 is the new root
        if (node1.parent === null) {
            this.tree = node2
        } else if (node1 === node1.parent.left) { // If node1 is left-positioned of its parental node
            // Place node2 to node1's parental's left position
            node1.parent.left = node2
        } else {
            // Place node2 to node1's parental's right position
            node1.parent.left = node2
        }
        // Transfer the parent of node1 to node2
        node2.parent = node1.parent
    }

    delete(node) {
        let node_copy = node
        let node_copy_original_color = node.color
        let transplant_node

        // If the left node of deleted node is null
        if (node.left === null) {
            // The transplanted node is now the deleted node's right one
            transplant_node = node.right
            // Replace the deleted node with its right child
            this.transplant(node, node.right)
        } else if (node.right === null) { // If the right node of deleted node is null
            // The transplanted node is now the deleted node's left one
            transplant_node = node.left
            // Replace the deleted node with its left child
            this.transplant(node, node.left)
        } else { // The deleted node have both of its children nodes present
            // Find the deleted node's succcessor
            node_copy = this.minimum(node.right)
            // Remember the successor's color before any transplantation
            node_copy_original_color = node_copy.color
            // The transplant node is now the successor's right child node
            transplant_node = node_copy.right
            // If the succcessor node is sired directly by the deleted node
            if (node_copy.parent === node) {
                // The transplant node's parent is now the successor node
                transplant_node.parent = node_copy
            } else { // The successor node is sired by children of the deleted node
                // Swap the successor node with its right subtree
                this.transplant(node_copy, node_copy.right)
                // Right subtree of successor node is now the deleted node's right one
                node_copy.right = node.right
                // Right subtree's parent of successor node is now the successor
                node_copy.right.parent = node_copy
            }
            // Swap the deleted node and its successor node
            this.transplant(node, node_copy)
            // Left subtree of successor node is now the deleted node's left
            node_copy.left = node.left
            // Left subtree of successor node's parent is now the delete node
            node_copy.left.parent = node
            // T
            node_copy.color = node.color
        }
        
        if (node_copy_original_color.color === "black") {
            this.balancedDelete(transplant_node)
        }
    }

    minimum(node) {
        let node_copy = node
        while (node_copy["left"] !== null) {
            node_copy = node_copy["left"]
        }
        return node_copy
    }

    balancedDelete(node) {
        
    }

}

let red_black = new RedBlackTree([-2, 2, 0, -1, -3], isTree = false)
console.log(util.inspect(red_black.tree))