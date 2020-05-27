
// constructor functions

function LinkedList() {
    this.head = null // we set these to null because when we initial create a linked list, there won't be any nodes in it
    this.tail = null
}

function Node(value, next, prev) {
    this.value = value
    this.next = next
    this.prev = prev
}

LinkedList.prototype.addToHead = function (value) {
    let newNode = new Node(value, this.head, null)

    if (this.head) { // this is accessing the LL contructor
        this.head.prev = newNode
    }

    if (!this.head) { // if LL is empty, the new node will be the head and the tail
        this.tail = newNode
    }

    this.head = newNode
}

LinkedList.prototype.addToTail = function (value) {
    let newNode = new Node(value, null, this.tail)

    if (this.tail) {
        this.tail.next = newNode
    }

    if (!this.tail) {
        this.head = newNode
    }

    this.tail = newNode
}

LinkedList.prototype.removeHead = function () {
    if (!this.head) {
        return null
    }

    if (this.head) {
        let val = this.head.value
        this.head = this.head.next
        if (this.head) {
            this.head.prev = null
        }

        if (!this.head) {
            this.tail = null
        }

        return val
    }
}

LinkedList.prototype.removeTail = function () {
    if (!this.tail) {
        return null
    }

    if (this.tail) {
        let val = this.tail.value
        this.tail = this.tail.prev

        if (this.tail) {
            this.tail.next = null
        }

        if (!this.tail) {
            this.head = null
        }
        return val
    }
}

LinkedList.prototype.search = function (searchValue) {
    let currentNode = this.head

    while (currentNode) {
        if (currentNode.value === searchValue) {
            return currentNode.value
        }

        currentNode = currentNode.next
    }

    return null
}

LinkedList.prototype.indexOf = function (value) {
    let currentNode = this.head
    let currentIndex = 0
    let indexes = []

    while (currentNode) {
        if (currentNode.value === value) {
            indexes.push(currentIndex)
        }

        currentNode = currentNode.next // it is helpful to talk through and code statements to progress through the loop first, i.e incrementing the conditions
        currentIndex++
    }

    return indexes
}

const ll = new LinkedList()
ll.addToTail(30)
ll.addToTail(3)
ll.addToTail(5)
ll.addToTail(3)
ll.addToTail(8)
ll.addToTail(80)
ll.addToTail(3)

const indexes = ll.indexOf(3)

console.log(indexes)

// circular means these two nodes are referencing each other in a ciruclar pattern
// for example (head, tail)
// the head node's prev property is referencing the node behind it (tail)
// the tail node's next property is referencing the node in front of it (head)