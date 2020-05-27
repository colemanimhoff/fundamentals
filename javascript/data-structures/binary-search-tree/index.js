
function BST(value) { // constructor, initially a node because it doesn't have a left or right value
    this.value = value
    this.left = null
    this.right = null
}

BST.prototype.insert = function (value) {
    if (value <= this.value) {
        if (!this.left) { // if child doesn't exist
            return this.left = new BST(value)
        }

        if (this.left) { // if child exists
            return this.left.insert(value)
        }
    }

    if (value > this.value) {
        if (!this.right) {
            return this.right = new BST(value)
        }

        if (this.right) {
            return this.right.insert(value)
        }
    }
}

BST.prototype.contains = function (value) {
    if (value === this.value) {
        return true
    }

    if (value < this.value) { // lesser values stored to the left
        if (!this.left) {
            return false
        }

        if (this.left) {
            return this.left.contains(value)
        }
    }

    if (value > this.value) { // greater values stored to the right
        if (!this.right) {
            return false
        }

        if (this.right) {
            return this.right.contains(value)
        }
    }
}

BST.prototype.depthFirstTraversal = function (interatorFunc, order) { // every branch all the way down to the bottom and calling the iterator func before moving onto next branch
    if (order === 'pre-order') {
        interatorFunc(this)
    }

    if (this.left) {
        this.left.depthFirstTraversal(interatorFunc, order)
    }

    if (order === 'in-order') {
        interatorFunc(this)
    }

    if (this.right) {
        this.right.depthFirstTraversal(interatorFunc, order)
    }

    if (order === 'post-order') {
        interatorFunc(this)
    }
}

BST.prototype.breadthFirstTraversal = function (interatorFunc) {
    let queue = [this] // first in, first out

    while (queue.length) { // not empty
        let treeNode = queue.shift()
        interatorFunc(treeNode)

        if (treeNode.left) {
            queue.push(treeNode.left)
        }

        if (treeNode.right) {
            queue.push(treeNode.right)
        }
    }
}

BST.prototype.getMinVal = function () {
    if (this.left) {
        return this.left.getMinVal()
    }

    return this.value
}

BST.prototype.getMaxVal = function () {
    if (this.right) {
        return this.right.getMaxVal()
    }

    return this.value
}

const bst = new BST(50) // root node
bst.insert(30)
bst.insert(70)
bst.insert(100)
bst.insert(60)
bst.insert(59)
bst.insert(20)
bst.insert(45)
bst.insert(35)
bst.insert(85)
bst.insert(105)
bst.insert(10)

console.log('-depth-first-traversal-')
console.log('-in-order-')
bst.depthFirstTraversal(logValue, 'in-order')
console.log('-pre-order-')
bst.depthFirstTraversal(logValue, 'pre-order')
console.log('-post-order-')
bst.depthFirstTraversal(logValue, 'post-order')
console.log('-depth-first-traversal-')
bst.breadthFirstTraversal(logValue)
console.log('-get-min-value-')
console.log(bst.getMinVal())
console.log('-get-max-value-')
console.log(bst.getMaxVal())

function logValue(node) {
    console.log(node.value)
}

// depth-first traversal

// in-order is good for sorting
// pre-order is handy for making a copy of the tree
// post-order is useful to safely delete nodes from a binary search tree because it starts at the lowest level and works it's way up

// breadth-first-traversal

// useful for defining a heirachy or level of command
// for example, storing employees of a company in a search tree
// top level - executive, next level - those who work under them, and so on...